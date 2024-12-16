import { Router } from 'express';
import Cart from '../models/cartModel.js';
import Ticket from '../models/Ticket.js';
import Product from '../models/productModel.js';
import { sendPurchaseEmail } from '../services/mailingService.js';
import { authUser } from '../middlewares/authUser.js';
import { authorization } from '../middlewares/authorization.js';



const router = Router();

const getCartItems = async (cartId) => {
    const cart = await Cart.findById(cartId).populate('products'); 
    return cart ? cart.products : [];
};


router.get('/',authUser,authorization (['admin']), async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product'); 
    console.log(cart)
    if (!cart) {
        return res.status(404).send('Carrito no encontrado'); 
    }
    res.render('carts', { cartItems: cart.items || [] });
});

router.post('/', async (req, res) => {
    try {
        const newCart = new Cart();
        await newCart.save();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
    }
});


router.get('/:cid',authUser,authorization (['user', 'admin']),async (req, res) => {
    const cartId = req.params.cid;

    try {
        const cart = await Cart.findById(cartId);
        console.log(cart)
        if (!cart) {
            return res.status(404).send('Carrito no encontrado'); // Manejo del caso en que el carrito no existe
        }

        res.render('carts', { cartItems: cart.items || [] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
});


router.delete('/:cid/products/:pid',authUser,authorization (['user', 'admin']), async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
});


router.put('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    
    cart.products = req.body.products;
    await cart.save();
    res.json({ status: 'success', payload: cart });
});


router.delete('/:cid', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.cid);
    res.json({ status: 'success', message: 'Carrito eliminado' });
});

router.post('/:cid/purchase',authUser,authorization (['user', 'admin']), async (req, res) => {
        const cartId = req.params.cid;
        const userEmail = req.user.email;
        const cartItems = await getCartItems(cartId); 
        console.log(cartItems)
  
    const unavailableProducts = [];
    let totalAmount = 0;

    for (const item of cartItems.products) {
        const product = await Product.findById(item.productId); 
        if (product.stock >= item.quantity) {
            totalAmount += product.price * item.quantity;
            product.stock -= item.quantity; 
            await product.save();
        } else {
            unavailableProducts.push(item.productId);
        }
    }

    const ticket = new Ticket({ amount: totalAmount, purchaser: userEmail });
    await ticket.save();

    await sendPurchaseEmail(userEmail, ticket);

 
    const remainingItems = cartItems.filter(item => !unavailableProducts.includes(item.productId));
    await updateCart(cartId, remainingItems); 

    res.json({ message: 'Compra finalizada', unavailableProducts });
});

router.post('/:cid/products', authUser, authorization(['user', 'admin']), async (req, res) => {
    const { cid } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart || cart.user.toString() !== req.user._id.toString()) {
            return res.status(404).send('Cart not found');
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const productInCart = cart.products.find(p => p.product._id.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.send({ status: 'success', data: cart });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

export default router;
