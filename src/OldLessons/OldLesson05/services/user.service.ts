import { STATUS_CODE } from "../enums/status.code.enum";
import { ApiError } from "../errors/api.error";
import { UserCreateDTO, UserUpdateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll() {
        return await userRepository.getAll();
    }

    public async getById(userId: string) {
        const user = await userRepository.getById(userId);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        else return user;
    }

    public async create(user: UserCreateDTO) {
        return await userRepository.create(user);
    }

    public async updateById(userId: string, newUser: UserUpdateDTO) {
        const user = await userRepository.getById(userId);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        else return await userRepository.updateById(userId, newUser);
    }

    public async deleteById(userId: string) {
        const user = await userRepository.getById(userId);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        else await userRepository.deleteById(userId);
    }

    public async isEmailUnique(email: string) {
        const user = await userRepository.getByEmail(email);
        if (user) throw new ApiError("User already exists", STATUS_CODE.BAD_REQUEST);
    }
}

export const userService = new UserService();
