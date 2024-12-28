import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Cart from '../models/cartModel.js';

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
        req.cartId=decoded.cartId;
        // req.cartId=user.cart._id;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
};

export default currentUser;
