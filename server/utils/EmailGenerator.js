require('dotenv').config();
const nodemailer = require('nodemailer');
const Email_Template = require('./EmailTemplate');
const Verification_Email_Template = Email_Template.Verification_Email_Template;

const EmailGenerator = async (emailp, verifCode) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:{
                user: "donotreply.arms.verify@gmail.com",
                pass: "cneg hcpp fodv ntlg"
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: emailp,
            subject: "Verify your email",
            text: "Verify your email",
            html: Verification_Email_Template.replace('{verificationCode}',verifCode)
        });

        return 'Email sent successfully';
    } catch (error){
        
        return error
    }
}

module.exports = EmailGenerator