import config from "../configs/config";
import { EMAIL_CONSTANTS } from "../constants/email.constants";
import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { Auth } from "../interfaces/auth.interface";
import { TokenPayload } from "../interfaces/token.interface";
import { UserCreateDTO } from "../interfaces/user.interface";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(user: UserCreateDTO) {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userService.create({ ...user, password });
        const tokenPayload: TokenPayload = { userId: newUser._id, role: newUser.role };
        const tokens = tokenService.generateAuthTokens(tokenPayload);
        await tokenService.create({ ...tokens, _userId: newUser._id });
        const activationToken = tokenService.generateActionToken(tokenPayload, "activation");
        await emailService.sendEmail(config.DEFAULT_EMAIL, EMAIL_CONSTANTS.activation, {
            userEmail: newUser.email,
            activationUrl: `${config.FRONTEND_URL}/auth/activate/${activationToken}`
        });
        return { user: newUser, tokens };
    }

    public async signIn(dto: Auth) {
        const user = await userService.getByEmail(dto.email);
        const isPasswordValid = await passwordService.comparePassword(dto.password, user?.password ?? "");
        if (!isPasswordValid || !user) throw new ApiError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
        if (user?.isActive === false) throw new ApiError("User is not active", STATUS_CODE.FORBIDDEN);
        const tokens = tokenService.generateAuthTokens({
            userId: user._id,
            role: user.role
        });
        await tokenService.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }

    public async activate(activationToken: string) {
        const { userId } = tokenService.verifyToken(activationToken, "activation");
        return await userService.updateById(userId, { isActive: true });
    }

    public async requestRecovery(email: string) {
        const user = await userService.getByEmail(email);
        if (!user) throw new ApiError("Invalid email", STATUS_CODE.UNAUTHORIZED);
        const recoveryToken = tokenService.generateActionToken({ userId: user._id, role: user.role }, "recovery");
        await emailService.sendEmail(config.DEFAULT_EMAIL, EMAIL_CONSTANTS.recovery, {
            recoveryUrl: `${config.FRONTEND_URL}/auth/recover/${recoveryToken}`
        });
        return user;
    }

    public async recover(recoveryToken: string, password: string) {
        const { userId } = tokenService.verifyToken(recoveryToken, "recovery");
        const newPassword = await passwordService.hashPassword(password);
        return await userService.updateById(userId, { password: newPassword });
    }
}

export const authService = new AuthService();
