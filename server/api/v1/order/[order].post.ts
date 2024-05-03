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

<<<<<<< HEAD
        if (!order) {
            return {
                error: orderError
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

        // Setup email data
        const mailOptions = {
            from: '"Bestell Fair!" <noreply@bestell-fair.de>',
            to: 'info@faktorxmensch.com',                  // list of receivers
            subject: '[' + order.status + '] Deine Bestellung bei Bestell Fair!', // Subject line
            html: `
    <h1>Vielen Dank</h1>
    <p>Deine Bestellung ist eingegangen, wir informieren dich per E-Mail, <b>sobald das Restaurant deine Bestellung bestätigt hat</b>.</p>
    <p>Geplante Abholung: ${new Date(order.pickup_at).toLocaleTimeString('de-de', {
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
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
=======
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
>>>>>>> b4759af (methoden vereinen)

})
