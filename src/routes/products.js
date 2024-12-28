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

router.get('/', getProducts);
router.get('/:pid', getProduct);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;
