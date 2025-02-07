import express from 'express';
import UserController from '../controllers/UserController.js';
import { authUser } from '../middlewares/authUser.js';
import { authorization } from '../middlewares/authorization.js';
import { passportCall } from '../middlewares/passportCall.js';
// import currentUser from '../middlewares/currentUser.js';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/',authUser, userController.createUser);
router.put('/:id',authUser, userController.updateUser);
router.delete('/:id',authUser, userController.deleteUser);

export default router;