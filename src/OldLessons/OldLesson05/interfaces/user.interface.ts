import { Role } from "../enums/role.enum";
import { Base } from "./base.interface";

interface User extends Base {
    _id: string;
    email: string;
    password: string;
    name: string;
    funFact: string;
    role: Role;
    isDeleted: boolean;
    isVerified: boolean;
}

type UserCreateDTO = Pick<User, "name" | "funFact" | "email" | "password">;
type UserUpdateDTO = Pick<User, "name" | "funFact">;

export { User, UserCreateDTO, UserUpdateDTO };
