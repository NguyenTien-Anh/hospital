
import nodemailer from 'nodemailer';
require('dotenv').config()

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"Nguyen_Tien_Anh 👻" <nguyentienanh13072003@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
            <h3>Hi, ${dataSend.patientName}</h3>
            <p>You received this email because you registered to schedule a medical examination on Nguyen_Tien_Anh.hospital</p>
            <p>Information on scheduling medical examinations:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the above information is correct, please click on the link below to 
            confirm and complete the medical appointment booking procedure.
            </p>
            <div><a href=${dataSend.redirectLink} target='_blank'>Click here</a></div>
            <div>Sincerely thank!</div>
        `, // html body
    });
}

module.exports = {
    sendSimpleEmail
}