import { Router } from 'express';
import CartController from '../controllers/CartController.js'
import { authorization } from '../middlewares/authorization.js';

const router = Router();


router.get('/', CartController.getCarts);
router.get('/view', CartController.renderCartView);
router.get('/unique', CartController.getCart);
router.post('/', CartController.createCart);
router.post('/unique',authorization(['user']), CartController.addProductToCart);
router.delete('/unique',authorization(['user']), CartController.deleteProductFromCart);
router.delete('/:cid', CartController.deleteCart);
router.post('/checkout', CartController.checkoutCart);
router.post('/send-email', CartController.sendEmail);


export default router;
