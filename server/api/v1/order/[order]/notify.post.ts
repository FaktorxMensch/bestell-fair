import {createTransport} from 'nodemailer';
import {supabaseServiceRole as supabase} from "~/composables/supabaseServiceRole";
import {config} from 'dotenv'

config()

export default defineEventHandler(async event => {

    return {
        error: 'Not implemented'
    }


})

export async function sendMail(mailOptions) {
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


    // Send mail with defined transport object
    try {
        const info = await transporter.sendMail({
            from: '"Bestell Fair!" <noreply@bestell-fair.de>',
            to: 'info@faktorxmensch.com',                  // list of receivers
            ...mailOptions
        });
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

export async function getOrder(orderId) {
    const {
        data: order,
        error: orderError
    } = await supabase.from('orders').select().eq('id', orderId)
        .single()

    if (!order) {
        return {
            error: orderError
        }
    }

    if (!order.receive_email_updates) {
        return {
            order: null,
            // message: 'User does not want to receive email updates'
        }
    }

    return {
        order
    }
}
