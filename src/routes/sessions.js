import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; 
import { passportCall } from '../middlewares/passportCall.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'El email ya está en uso' });
    }

    const newUser = new User({ first_name, last_name, email, age, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id }, 'thesecret', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login exitoso', token });
});


router.get('/current', passportCall('jwt'), (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'No autorizado' });
    }
});
export default router;