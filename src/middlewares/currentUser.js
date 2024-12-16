import jwt from 'jsonwebtoken';
import User from '../models/User';
import Cart from '../models/cartModel';

const currentUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await User.findById(decoded.id).populate('cart');
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
};

export default currentUser;
