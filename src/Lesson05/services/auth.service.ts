import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { UserCreateDTO } from "../interfaces/user.interface";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(user: UserCreateDTO) {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userService.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role
        });
        await tokenService.create({ ...tokens, _userId: newUser._id });
        return { user: newUser, tokens };
    }

    public async signIn(dto: any) {
        const user = await userService.getByEmail(dto.email);
        const isPasswordValid = await passwordService.comparePassword(dto.password, user?.password ?? "");
        if (!isPasswordValid || !user) throw new ApiError("Invalid email or password", StatusCodesEnum.UNAUTHORIZED);
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role
        });
        await tokenService.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }
}

export const authService = new AuthService();
