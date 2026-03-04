import { UserDTO } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserService {
    public getAll() {
        return UserModel.find();
    }

    public getById(id: string) {
        return UserModel.findById(id);
    }

    public create(user: UserDTO) {
        return UserModel.create(user);
    }

    public update(id: string, user: UserDTO) {
        return UserModel.findByIdAndUpdate(id, user);
    }

    public delete(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}

export const userService = new UserService();
