import { Router } from 'express';
import { readFile, writeFile } from '../utils/fileManager.js';

const router = Router();
const cartFile = './src/data/carts.json';

const generateId = (items) => {
    return items.length > 0 ? String(parseInt(items[items.length - 1].id) + 1) : '1';
};

router.post('/', async (req, res) => {
    try {
        const carts = await readFile(cartFile);

        const id = generateId(carts);
        const newCart = {
            id,
            products: []
        };

        carts.push(newCart);
        await writeFile(cartFile, carts);

        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const carts = await readFile(cartFile);
        const cart = carts.find(c => c.id === req.params.cid);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los carritos' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const carts = await readFile(cartFile);
        const products = await readFile('./src/data/products.json');

        const cart = carts.find(c => c.id === cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = products.find(p => p.id === pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const cartProduct = cart.products.find(p => p.product === pid);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await writeFile(cartFile, carts);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router;


