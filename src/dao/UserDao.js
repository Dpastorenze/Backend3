import User from '../models/User.js';

class UserDAO {
    async createUser(data) {
        const user = new User(data);
        await user.save();
        return user;
    }

    async findUserByEmail(email) {
        return User.findOne({ email });
    }

    async findUserById(id) {
        return User.findById(id);
    }
}

export default new UserDAO();