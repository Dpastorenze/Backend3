import express from 'express';
import { generateUsers, generateProducts } from '../utils/mockData.js';

import User from '../models/User.js';
import Product from '../models/productModel.js';

const router = express.Router();
// Ruta para generar datos de prueba
router.post('/:users/:products', async (req, res) => {
    const { users, products } = req.params;

    try {
        const numUsers = parseInt(users);
        const numProducts = parseInt(products);

        if (isNaN(numUsers) || isNaN(numProducts)) {
            return res.status(400).json({ message: 'Invalid parameters' });
        }

        const generatedUsers = await generateUsers(numUsers);
        const generatedProducts = await generateProducts(numProducts);

        res.status(200).json({ 
            message: `Generated ${numUsers} users and ${numProducts} products`, 
            users: generatedUsers,
            products: generatedProducts 
        });
    } catch (error) {
        console.error('Error generating mock data:', error); // Log detallado del error
        res.status(500).json({ message: 'Error generating mock data', error: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Error getting users', error: error.message });
    }
});

// Ruta para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'Error getting products', error: error.message });
    }
});

export default router;

