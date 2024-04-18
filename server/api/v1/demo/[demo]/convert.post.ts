import {supabase} from "~/composables/supabaseServiceRole";

/**
 POST localhost:3000/api/v1/demo/51fcf87a-fed2-4193-b5bb-363b2142f0d7/convert
 {
 "email":"bla@example.com",
 "name": "Hans dieter"
 }
 */

export default defineEventHandler(async event => {

    // hol dir den aktuellen user
    // const {data} = await supabase.auth.getUser()
    // return data

    const {
        data: demoRestaurant,
        error: demoRestaurantError
    } = await supabase.from('restaurants').select().eq('id', event.context.params.demo)
        .eq('is_demo', true) // TODO Uncomment this line
        .single()

    if (!demoRestaurant) {
        return {
            error: demoRestaurantError
        }
    }

    const body = await readBody(event)

    // faile wenn kein email angegeben oder die email bestell-fair enthaelt
    if (!body.email || body.email.includes('bestell-fair')) {
        return {
            error: 'invalid email, must not include bestell-fair and must be a valid email address'
        }
    }

    // get the user that owns the demo restaurant
    const {
        data: demoUser,
        error: demoUserError
    } = await supabase.from('user_owns_restaurant').select('user_id').eq('restaurant_id', demoRestaurant.id).single()

    // get the user  } = await supabase.auth.admin.createUser({
    const {data: user, error: demoUserError2} = await supabase.auth.admin.getUserById(demoUser.user_id)

    // update restaurant to not be a demo restaurant
    const {data: updatedRestaurant, error: updatedRestaurantError} = await supabase.from('restaurants').update({
        is_demo: false
    }).eq('id', demoRestaurant.id).single()

    // now confirm that the restaurant is no longer a demo restaurant
    const {
        data: updatedRestaurantCheck,
        error: updatedRestaurantCheckError
    } = await supabase.from('restaurants').select().eq('id', demoRestaurant.id).single()

    if (updatedRestaurantCheck.is_demo) {
        return {
            error: 'could not update restaurant to not be a demo restaurant'
        }
    }

    // change the users email to the one specified in the body
    const {data: updatedUser, error: updatedUserError} = await supabase.auth.admin.updateUserById(demoUser.user_id, {
        email: body.email,
        user_metadata: {
            name: body.name,
            role: 'partner',
            // p2_person_id
        }
    })

    return {
        updatedUser,
        user,
        demoUser,
        data: demoRestaurant,
    }

})
