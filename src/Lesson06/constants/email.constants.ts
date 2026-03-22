export type EmailData = {
    subject: string;
    template: string;
};

export const EMAIL_CONSTANTS: Record<string, EmailData> = {
    activation: {
        subject: "Welcome!",
        template: "welcome.hbs"
    },
    recovery: {
        subject: "Recover your account",
        template: "recover.hbs"
    }
};
