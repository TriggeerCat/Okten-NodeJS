import { UserDTO } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserRepository {
    public async getAll() {
        return await UserModel.find();
    }

    public async getById(userId: string) {
        return await UserModel.findById(userId);
    }

    public async create(user: UserDTO) {
        return await UserModel.create(user);
    }

    public async updateById(userId: string, user: UserDTO) {
        return await UserModel.findByIdAndUpdate(userId, user);
    }

    public async deleteById(userId: string) {
        return await UserModel.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();
