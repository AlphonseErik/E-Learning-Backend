import nodemailer from 'nodemailer';

const Service = (data: any) => {
    const mailer = {
        service: "gmail",
        auth: {
            user: data.EMAIL,
            pass: data.EMAIL_PASSWORD
        }
    };
    return nodemailer.createTransport(mailer);
}

const sendMail = async (mailOptions: any) => {
    let respone = {
        EMAIL: "servermailelearning@gmail.com",
        EMAIL_PASSWORD: "ServerMail.com",
    }
    const transporter = Service(respone);
    return transporter.sendMail({
        from: respone.EMAIL,
        ...mailOptions
    })
}

const sendNotificationOptions = (options: any) => {
    return {
        to: options.email,
        subject: `${options.title}`,
        text: 'Welcome to E-learning',
        html: `<p>${options.content}</p>`
    }
}

export {
    sendMail,
    sendNotificationOptions
}