import bcrypt from "bcrypt";

class PasswordService {
    public hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    public comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }
}

export const passwordService = new PasswordService();
