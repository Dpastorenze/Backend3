// services/mailingService.js
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
        tls: {
        rejectUnauthorized: false
    }
});

export const sendPurchaseEmail = (purchaserEmail, ticket) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: purchaserEmail,
        subject: 'Confirmación de Compra',
        text: `Gracias por tu compra! Aquí están los detalles de tu ticket:\n\nCódigo: ${ticket.code}\nMonto: $${ticket.amount}\nFecha: ${ticket.purchase_datetime}`
    };

    return transporter.sendMail(mailOptions);
};