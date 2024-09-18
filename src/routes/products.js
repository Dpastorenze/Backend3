import { Router } from 'express';
import { readFile, writeFile } from '../utils/fileManager.js';
import * as fs from "fs";
import io from "../app.js";

const router = Router();
const productsFile = './data/products.json';
let products=[];

const generateId = (items) => {
    return items.length > 0 ? String(parseInt(items[items.length - 1].id) + 1) : '1';
};

if (fs.existsSync("./data/products.json")) {
    products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
};
router.get("/", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

router.get('/', async (req, res) => {
    try {
        const products = await readFile(productsFile);
        const limit = parseInt(req.query.limit);
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los productos' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFile);
        const product = products.find(p => p.id === req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los productos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || stock === undefined || !category) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const products = await readFile(productsFile);

        const id = generateId(products);

        const newProduct = {
            id,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || []
        };

        products.push(newProduct);
        await writeFile(productsFile, products);
        fs.writeFileSync("./data/products.json", JSON.stringify(products));
        io.sockets.emit("realtime", { products });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFile);
        const index = products.findIndex(p => p.id === req.params.pid);
        if (index === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const updatedFields = req.body;
        if (updatedFields.id) {
            delete updatedFields.id;
        }

        products[index] = { ...products[index], ...updatedFields };
        await writeFile(productsFile, products);

        res.json(products[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFile);
        const index = products.findIndex(p => p.id === req.params.pid);
        if (index === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const deletedProduct = products.splice(index, 1)[0];
        await writeFile(productsFile, products);
        io.sockets.emit("realtime", { products });
        res.json({ message: 'Producto eliminado', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;