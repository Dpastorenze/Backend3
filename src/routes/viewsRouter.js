import { Router } from 'express';
import Product from '../models/productModel.js';


const router = Router();

router.get('/', async (req, res) => {
    try {
        const productsFromDB = await Product.find(); 
        const products = productsFromDB.map(product => ({
            title: product.title,
            price: product.price,
            category:product.category,
        }));
        res.render('home', { products }); 
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});


router.get('/realtimeproducts', async (req, res) => {
    try {
        const productsFromDB = await Product.find();
        const products = productsFromDB.map(product => ({
            title: product.title,
            price: product.price,
        }));
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
});

export default router;