// repositories/UserRepository.js
import UserDAO from '../dao/UserDao.js';
import UserDTO from '../dtos/UserDto.js';

class UserRepository {
    async createUser(data) {
        const user = await UserDAO.createUser(data);
        return new UserDTO(user);
    }

    async findUserByEmail(email) {
        return UserDAO.findUserByEmail(email);
    }

    async findUserById(id) {
        const user = await UserDAO.findUserById(id);
        return new UserDTO(user);
    }
}

export default new UserRepository();