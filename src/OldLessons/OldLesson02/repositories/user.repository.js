const {read, write} = require("../services/fs.service");

class UserRepository {
    async getAllUsers() {
        return read();
    }

    async getOneUserById(id) {
        const users = await read();
        const index = users.findIndex(users => users.id === +id);
        return users[index];
    }

    async createUser(user) {
        const users = await read();
        const userWithId = {
            id: users.length ? users[users.length - 1].id + 1 : 0,
            ...user
        }
        users.push(userWithId);
        await write(users);
        return userWithId;
    }

    async updateUser(id, newData){
        const users = await read();
        const index = users.findIndex(users => users.id === +id);
        const userUpdated = {
            id: index,
            ...newData
        };
        users[index] = userUpdated;
        await write(users);
        return userUpdated;
    }

    async deleteUser(id) {
        const users = await read();
        const index = users.findIndex(users => users.id === +id);
        const userDeleted = users[index]
        users.splice(index, 1);
        await write(users);
        return userDeleted;
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}