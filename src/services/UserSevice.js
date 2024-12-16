// services/UserService.js
import UserDaoMongo from "../dao/UserDaoMongo.js";

class UserService {
    constructor() {
        this.userDao = new UserDaoMongo();
    }

    async getAllUsers() {
        return await this.userDao.getProducts();
    }

    async getUser(filter) {
        return await this.userDao.getProduct(filter);
    }

    async createUser(newUser) {
        // Aquí puedes agregar validaciones, como verificar si el email ya existe
        return await this.userDao.createProduct(newUser);
    }

    async updateUser(pid, userToUpdate) {
        return await this.userDao.updateProduct(pid, userToUpdate);
    }

    async deleteUser(pid) {
        return await this.userDao.deleteProduct(pid);
    }
}

export default UserService;