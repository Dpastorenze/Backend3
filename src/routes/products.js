// routes/products.js
import { Router } from 'express';
import { ProductController } from '../../controllers/products.controllers';

const router = Router();
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController();

// Configuración CRUD de productos
router.get('/', getProducts);
router.get('/:pid', getProduct);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;
