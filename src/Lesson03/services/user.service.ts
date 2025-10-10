import {UserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public async getAll() {
        return userRepository.getAll();
    }

    public async getById(userId: string) {
        return userRepository.getById(userId);
    }

    public async create(user: UserDTO) {
        return userRepository.create(user);
    }

    public async updateById(userId: string, user: UserDTO) {
        return userRepository.updateById(userId, user);
    }

    public async deleteById(userId: string) {
        return userRepository.deleteById(userId);
    }
}

export const userService = new UserService();