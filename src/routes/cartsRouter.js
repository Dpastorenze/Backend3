import { Router } from 'express';
import Cart from '../models/cartModel.js';
const router = Router();


router.post('/', async (req, res) => {
    const newCart = new Cart();
    await newCart.save();
    res.status(201).json({ status: 'success', payload: newCart });
});

router.get('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
});


router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    
    const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid });
    }
    
    await cart.save();
    res.json({ status: 'success', payload: cart });
});


router.delete('/:cid/products/:pid', async (req, res) => {
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

export default router;