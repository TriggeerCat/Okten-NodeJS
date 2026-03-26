import fs from "node:fs/promises";
import path from "node:path";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import config from "../configs/config";
import { EmailData } from "../constants/email.constants";

class EmailService {
    private readonly transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    private async _renderTemplate(template: string, context: Record<string, any>) {
        const layoutSource = await fs.readFile(path.join(process.cwd(), "src", "templates", "base.hbs"), "utf-8");
        const layoutTemplate = handlebars.compile(layoutSource);

        const templateSource = await fs.readFile(path.join(process.cwd(), "src", "templates", template), "utf-8");
        const childTemplate = handlebars.compile(templateSource);

        const childHtml = childTemplate(context);

        return layoutTemplate({ ...context, body: childHtml });
    }

    public async sendEmail(to: string, emailData: EmailData, context: Record<string, any>) {
        await this.transporter.sendMail({
            to,
            subject: emailData.subject,
            html: await this._renderTemplate(emailData.template, context)
        });
    }
}

export const emailService = new EmailService();
