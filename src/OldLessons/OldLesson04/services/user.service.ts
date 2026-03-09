import { UserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll() {
        return await userRepository.getAll();
    }

    public async getById(userId: string) {
        return await userRepository.getById(userId);
    }

    public async create(user: UserDTO) {
        return await userRepository.create(user);
    }

    public async updateById(userId: string, user: UserDTO) {
        return await userRepository.updateById(userId, user);
    }

    public async deleteById(userId: string) {
        return await userRepository.deleteById(userId);
    }
}

export const userService = new UserService();
