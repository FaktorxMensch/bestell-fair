import {createTransport} from 'nodemailer';
import {supabaseServiceRole as supabase} from "~/composables/supabaseServiceRole";
import {config} from 'dotenv'

config()

export default defineEventHandler(async event => {


        const {
            data: order,
            error: orderError
        } = await supabase.from('orders').select().eq('id', event.context.params.order)
            .single()

        if (!order) {
            return {
                error: orderError
            }
        }

        if (!order.receive_email_updates) {
            return {
                success: true,
                message: 'User does not want to receive email updates'
            }
        }

        console.log('order', order)

        // Create reusable transporter object using SMTP transport
        const transporter = createTransport({
            host: process.env.MAIL_SMTP_HOST,
            port: process.env.MAIL_SMTP_PORT,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
                user: process.env.MAIL_SMTP_USER,
                pass: process.env.MAIL_SMTP_PASS
            },
        });


        console.log('transporter', transporter)

    console.log('init pick up', order.pickup_at_init)
    console.log('current pick up', order.pickup_at)

    // didi it change
    console.log('did it change', order.pickup_at_init !== order.pickup_at)

        const ifDifferentPickup = order.pickup_at_init !== order.pickup_at ? `<p>Bitte beachte: Die geplante Abholung wurde geändert auf: <b>${new Date(order.pickup_at).toLocaleString('de-DE')} Uhr</b> (ursprünglich  ${new Date(order.pickup_at_init).toLocaleString('de-DE')})</p>` : `<p>Aktuelle Abholung: ${new Date(order.pickup_at).toLocaleString('de-DE')}</p>`;
        const dirrentPickup = order.pickup_at_init !== order.pickup_at ? `Geänderte Abholzeit - ` : ' ';

        // Setup email data
        const mailOptions = {
            from: '"Bestell Fair!" <noreply@bestell-fair.de>',
            to: 'info@faktorxmensch.com',                  // list of receivers
            subject: '[' + order.status + '] ' + dirrentPickup + 'Deine Bestellung über Bestell Fair!', // Subject line
            html: `
    <h1>Bestellung</h1>
    <p>Deine Bestellung hat den Status <strong>${order.status}</strong></p>
    ${ifDifferentPickup}
    <p><a href="https://bestell-fair.de/bestellung/${order.id}">Weitere Informationen zur Bestellung ansehen &rarr;</a></p>
    <p>Vielen Dank für deine Bestellung!</p>
    <p>Dein Bestell Fair! Team</p>
            `
        };

        // Send mail with defined transport object
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);

            // Email sent successfully
            return {
                success: true,
                message: 'Email sent successfully'
            };
        } catch (error) {
            console.error('Error sending email: ', error);

            // Failed to send email
            return {
                success: false,
                message: 'Failed to send email'
            };

        }
    }
)

