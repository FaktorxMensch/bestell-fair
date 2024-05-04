import {createTransport} from 'nodemailer';
import {supabaseServiceRole as supabase} from "~/composables/supabaseServiceRole";
import {config} from 'dotenv'
import {getOrder, sendMail} from "~/server/api/v1/order/[order]/notify.post";
config()

export default defineEventHandler(async event => {

    const {order, error} = await getOrder(event.context.params.order)
    if (error) return {error}

    const dirrentPickup = order.pickup_at_init !== order.pickup_at ? ` - Geänderte Abholzeit!` : '';
    const ifDifferentPickup = order.pickup_at_init !== order.pickup_at ? `<p>Bitte beachte: Die geplante Abholung wurde geändert auf: <b>${new Date(order.pickup_at).toLocaleTimeString('de-DE')} Uhr</b> (ursprünglich  ${new Date(order.pickup_at_init).toLocaleTimeString('de-DE')})</p>` : `<p>Aktuelle Abholung: ${new Date(order.pickup_at).toLocaleTimeString('de-DE')}</p>`;

    const mailOptions = {
        subject: '[' + order.status + dirrentPickup + '] ' + 'Deine Bestellung über Bestell Fair!', // Subject line
        html: `
        <h1>Vielen Dank</h1>
        <p>Deine Bestellung ist eingegangen, wir informieren dich per E-Mail, <b>sobald das Restaurant deine Bestellung bestätigt hat</b>.</p>
        <p>Geplante Abholung: ${new Date(order.pickup_at).toLocaleTimeString('de-DE')}</p>
        <p><a href="https://bestell-fair.de/bestellung/${order.id}">Weitere Informationen zur Bestellung ansehen &rarr;</a></p>
        <p>Vielen Dank für deine Bestellung!</p>
        <p>Dein Bestell Fair! Team</p>`
    };
    await sendMail(mailOptions)

})
