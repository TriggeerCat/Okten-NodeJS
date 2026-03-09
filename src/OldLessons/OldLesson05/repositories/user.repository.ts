import { UserCreateDTO, UserUpdateDTO } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserRepository {
    public async getAll() {
        return await UserModel.find();
    }

    public async getById(userId: string) {
        return await UserModel.findById(userId);
    }

    public async getByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    public async create(user: UserCreateDTO) {
        return await UserModel.create(user);
    }

    public async updateById(userId: string, user: UserUpdateDTO) {
        return await UserModel.findByIdAndUpdate(userId, user);
    }

    public async deleteById(userId: string) {
        return await UserModel.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();
