import {UserDTO} from "../interfaces/user.interface";
import {UserModel} from "../models/user.model";

class UserRepository {
    public async getAll() {
        return UserModel.find();
    }

    public async getById(userId: string) {
        return UserModel.findById(userId);
    }

    public async create(user: UserDTO) {
        return UserModel.create(user);
    }

    public async updateById(userId: string, user: UserDTO) {
        return UserModel.findByIdAndUpdate(userId, user);
    }

    public async deleteById(userId: string) {
        return UserModel.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();