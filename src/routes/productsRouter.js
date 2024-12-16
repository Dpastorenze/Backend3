import { Router } from 'express';
import Product from '../models/productModel.js';
import { authUser } from '../middlewares/authUser.js';
import { authorization } from '../middlewares/authorization.js';


const router = Router();

router.get('/',authUser,authorization (['user', 'admin']), async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = query ? { category: query } : {};
    
    const products = await Product.find(filter)
        .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
        .limit(Number(limit))
        .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    res.render('products', { products, totalPages, page });
});

router.get('/:pid',authUser,authorization (['user', 'admin']),async (req, res) => {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
});


router.post('/',authUser,authorization (['admin']),async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const newProduct = new Product({ title, description, code, price, stock, category, thumbnails });
    await newProduct.save();
    res.redirect('/products');
});


router.put('/:pid',authUser,authorization (['admin']), async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, { title, description, code, price, stock, category, thumbnails }, { new: true });
    if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updatedProduct });
});


router.delete('/:pid',authUser,authorization (['admin']), async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
});

export default router;