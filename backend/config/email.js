
const nodemailer=require("nodemailer")

// create a transporter

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_MAIL,
        pass:process.env.GOOGLE_APP_PASSWORD
    }
})

const EmailService=async (email,subject_text,message) => {
    
    const mailoptions={
        from:process.env.GOOGLE_MAIL,
        to:email,
        subject:subject_text,
        text:message
    }

    try {
        const info=await transporter.sendMail(mailoptions)
        console.log(info.messageId)
    } catch (error) {
        console.log("Failed to send mail")
    }
}

module.exports=EmailService