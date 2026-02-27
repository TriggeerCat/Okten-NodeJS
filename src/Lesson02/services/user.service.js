const {read, write} = require("./fs.service");

class UserService {
    async getAll() {
        return read();
    }

    async getById(id){
        const users = await read();
        for (const user of users) {
            if (user.id === id) return user;
        }
    }

    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 0,
            name: user.name,
            email: user.email
        }
        users[users.length] = newUser;
        await write(users);
        return newUser;
    }

    async update(id, user) {
        const users = await read();
        const newUser = {
            id: id,
            name: user.name,
            email: user.email
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) users[i] = newUser;
        }
        await write(users);
        return newUser;
    }

    async delete(id) {
        const users = await read();
        let deletedUser;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) deletedUser = users.splice(i, 1);
        }
        await write(users);
        return deletedUser;
    }
}

const userService = new UserService();

module.exports = {
    userService
}