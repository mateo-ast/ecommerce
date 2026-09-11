import { Router } from 'express';
import { cartController, checkoutController } from '../controllers/cartController';
import { homeController } from '../controllers/homeController';
import { loginRouter } from './login';
import { registerRouter } from './register';
import { checkoutRouter } from './checkout';

const router = Router();

router.get('/', homeController);
router.get('/cart', cartController);
router.get('/checkout', checkoutController);
router.use(loginRouter);
router.use(registerRouter);
router.use(checkoutRouter);

export { router };
