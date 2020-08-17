require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, it"s working');
})

app.post('/api/form', (req, res) => {
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Something went wrong, mail not sent. Error: ", err);
        } else {
            console.log("Email Sent", data);
        }
    })
});


const PORT = process.env.PORT || 3001;



app.listen(PORT, (req, res) => {
    console.log('Running on local server!!');
});