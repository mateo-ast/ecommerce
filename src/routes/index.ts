import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { loginRouter } from './login';
import { checkoutRouter } from './checkout';

const router = Router();

router.get('/', homeController);
router.use('/login', loginRouter);
router.use('/checkout', checkoutRouter);

export { router };
