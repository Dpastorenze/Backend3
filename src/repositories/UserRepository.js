import UserService from '../services/UserSevice.js';

class UserRepository {
    constructor() {
        this.userService = UserService;
    }

    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    async getUser(id) {
        return await this.userService.getUser(id);
    }

    async createUser(userData) {
        return await this.userService.createUser(userData);
    }

    async updateUser(id, userData) {
        return await this.userService.updateUser(id, userData);
    }

    async deleteUser(id) {
        return await this.userService.deleteUser(id);
    }
}

export default new UserRepository();
