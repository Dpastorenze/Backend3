import { Router } from 'express';
import Product from '../models/productModel.js';

const router = Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = query ? { category: query } : {};
    
    const products = await Product.find(filter)
        .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
        .limit(Number(limit))
        .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
        status: 'success',
        payload: products,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page: Number(page),
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `/api/products/?page=${page - 1}` : null,
        nextLink: page < totalPages ? `/api/products/?page=${page + 1}` : null,
    });
});

router.get('/:pid', async (req, res) => {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
});


router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const newProduct = new Product({ title, description, code, price, stock, category, thumbnails });
    await newProduct.save();
    res.status(201).json({ status: 'success', payload: newProduct });
});


router.put('/:pid', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, { title, description, code, price, stock, category, thumbnails }, { new: true });
    if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updatedProduct });
});


router.delete('/:pid', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
});

export default router;