import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body;
    const password = "gokrntluyiliioka";

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'deepakugin@gmail.com',
            pass: password, // Google App Password
        },
    });

    try {
        const mailOptions = {
            from: 'deepakugin@gmail.com',
            to: 'deepakugin@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        console.error('SMTP Error:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
}
