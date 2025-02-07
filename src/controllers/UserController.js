import UserRepository from '../repositories/UserRepository.js';

class UserController {
    constructor() {
        this.userRepository = UserRepository;
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userRepository.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getUser = async (req, res) => {
        try {
            const user = await this.userRepository.getUser(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createUser = async (req, res) => {
        try {
            const newUser = await this.userRepository.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const updatedUser = await this.userRepository.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            await this.userRepository.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default UserController;
