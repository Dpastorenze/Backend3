import express from 'express';
import passport from '../config/passport.js';
import SessionController from '../controllers/SessionController.js';

const router = express.Router();

router.post('/register', SessionController.register);
router.post('/login', SessionController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), SessionController.current);
router.post('/logout', SessionController.logout);

export default router;
