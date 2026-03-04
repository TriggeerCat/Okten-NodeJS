export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDTO = Pick<User, "name" | "email">;
