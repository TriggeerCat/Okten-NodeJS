const {userRepository} = require('../repositories/user.repository.js');
const {read, write} = require("./fs.service");

class UserService {
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async getOneUserById(id) {
        return await userRepository.getOneUserById(id);
    }

    async createUser(user) {
        return await userRepository.createUser(user);
    }

    async updateUser(id, newData){
        return await userRepository.updateUser(id, newData);
    }

    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    }
}

const userService = new UserService();

module.exports = {
    userService
}