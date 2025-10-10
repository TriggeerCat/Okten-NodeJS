export interface User {
    _id: number,
    name: string,
    funFact: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserDTO = Pick<User, 'name' | 'funFact'>