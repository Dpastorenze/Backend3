import { Router } from 'express';
import productController from '../controllers/productController.js';
import { authUser } from '../middlewares/authUser.js';
import  { authorization } from '../middlewares/authorization.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.get('/realTimeProducts', authorization(['admin']), productController.renderRealTimeProducts);
router.post('/',authorization(['admin']), productController.createProduct);
router.put('/:pid',authorization(['admin']), productController.updateProduct);
router.delete('/:pid',authorization(['admin']), productController.deleteProduct);

export default router;
