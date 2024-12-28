import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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

const sendMail = async (to, subject, text, html) => {
    const mailOptions = {
        from:'prueba@example.com',
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export default sendMail;
