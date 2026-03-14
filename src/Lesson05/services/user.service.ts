import { StatusCodeEnum } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { UserCreateDTO, UserUpdateDTO } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserService {
    public getAll() {
        return UserModel.find();
    }

    public async getById(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new ApiError("User not found", StatusCodeEnum.NOT_FOUND);
        return user;
    }

    public getByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    public create(user: UserCreateDTO) {
        return UserModel.create(user);
    }

    public async updateUser(id: string, newUser: UserUpdateDTO) {
        const user = await UserModel.findByIdAndUpdate(id, newUser);
        if (!user) throw new ApiError("User not found", StatusCodeEnum.NOT_FOUND);
        return user;
    }

    public async updateActiveStatus(id: string, activity: boolean) {
        const user = await UserModel.findByIdAndUpdate(id, { isActive: activity });
        if (!user) throw new ApiError("User not found", StatusCodeEnum.NOT_FOUND);
        return user;
    }

    public async delete(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new ApiError("User not found", StatusCodeEnum.NOT_FOUND);
        await UserModel.findByIdAndDelete(id);
    }

    public async isEmailUnique(email: string) {
        const user = await this.getByEmail(email);
        if (user) throw new ApiError("This email already exists", StatusCodeEnum.FORBIDDEN);
    }
}

export const userService = new UserService();
