const express = require('express');
const router = express.Router();
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: 'b803c444cc901a8b34a3138388ec9556-0a688b4a-3e1191bf' // Your Mailgun API key
});

router.post("/", async (req, res) => {
    try {
        const { to, subject, text, html } = req.body;

        const response = await mg.messages.create('sandbox5440206ac6274a28ac37b04ceb069bbd.mailgun.org', { // Your Mailgun domain
            from: 'Monroe Catalogue Reprensentative <mailgun@sandbox5440206ac6274a28ac37b04ceb069bbd.mailgun.org>', // Sender email
            to, // Recipient email(s)
            subject, // Email subject
            text, // Plain text body
            html // HTML body
        });

        console.log('Email sent:', response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
