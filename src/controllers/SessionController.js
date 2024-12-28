import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class SessionController {
    register = async (req, res) => {
        const { first_name, last_name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        console.log('Email recibido:', email);
        const user = await User.findOne({ email })
        if (!user){ console.log('Usuario no encontrado');
            return null;
        } 
        console.log(`Contraseña proporcionada: ${password}`);
        console.log(`Contraseña almacenada (hash): ${user.password}`);
        if (!password || !user.password) {  
            console.log('Password o user.password son undefined');
                return null; 
            }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch){
            console.log('Contraseña incorrecta');
            return null;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
        console.log('Token generated:', token);
        res.cookie('jwt', token, { httpOnly: true });
        req.session.user=user
        res.redirect('/products');
    }

    current = (req, res) => {
        if (req.user) {
            res.json(req.user);
        } else {
            res.status(401).json({ message: 'No autorizado' });
        }
    }

    logout = (req, res) => {
            req.session.destroy((err)=>{
        if(err){
            return res.status(500).send('internal server error')
        }
    })
        res.clearCookie('jwt');
        return res.redirect('/login');
    }
}

export default new SessionController();


