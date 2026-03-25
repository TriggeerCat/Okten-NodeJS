import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { User, UserCreateDTO } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserService {
    public getAll() {
        return UserModel.find();
    }

    public async getById(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        return user;
    }

    public getByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    public create(user: UserCreateDTO) {
        return UserModel.create(user);
    }

    public async updateById(id: string, newUser: Partial<User>) {
        const user = await UserModel.findByIdAndUpdate(id, newUser);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        return user;
    }

    public async delete(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new ApiError("User not found", STATUS_CODE.NOT_FOUND);
        await UserModel.findByIdAndDelete(id);
    }

    public async isEmailUnique(email: string) {
        const user = await this.getByEmail(email);
        if (user) throw new ApiError("This email already exists", STATUS_CODE.FORBIDDEN);
    }
}

export const userService = new UserService();
