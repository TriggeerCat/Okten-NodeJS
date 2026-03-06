import { STATUS_CODE } from "../enums/status.code.enum";
import { ApiError } from "../errors/api.error";
import { Auth } from "../interfaces/auth.interface";
import { UserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(user: UserCreateDTO) {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({ userId: newUser._id, role: newUser.role });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });

        return { user: newUser, tokens };
    }

    public async signIn(dto: Auth) {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        const isPasswordValid = await passwordService.comparePassword(dto.password, user.password);
        if (!isPasswordValid) throw new ApiError("Email or password is not valid", STATUS_CODE.UNAUTHORIZED);
        const tokens = tokenService.generateTokens({ userId: user._id, role: user.role });
        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }
}

export const authService = new AuthService();
