import EmailActivationRequest from "../models/EmailActivationRequest";
import nodemailer, {Transporter} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import IMailService from "../interfaces/IMailService";

class MailService implements IMailService {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        } as any)
    }

    async sendActivationLink(model: EmailActivationRequest) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: model.to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке</h1>
                        <div><a href="${model.link}">${model.link}</a></div>
                    </div>
                `
        })
    }
}

export default new MailService();