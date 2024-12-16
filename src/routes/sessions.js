import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { passportCall } from '../middlewares/passportCall.js';
import { jwtPrivateKey } from '../config/config.js';
import UserRepository from '../repositories/UserRepository.js';
import UserDTO from '../dtos/UserDto.js';
import Cart from '../models/cartModel.js';


const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password,role } = req.body;

    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'El email ya está en uso' });
    }

    const newUser = await UserRepository.createUser({ first_name, last_name, email, age, password,role: role || 'user' });
    await newUser.save();

    res.status(201).json(newUser,{ message: 'Usuario registrado exitosamente' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserRepository.findUserByEmail(email);
    if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: user._id }, jwtPrivateKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    let cart = await Cart.findOne({ user: user._id }); 
    if (!cart) { 
    cart = new Cart({ user: user._id, products: [] }); 
    await cart.save(); }
    res.redirect('/products');
});


router.get('/current', passportCall('jwt'), (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login'); 
});
export default router;