import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { loginRouter } from './login';
import { registerRouter } from './register';
import { productRouter } from './product';
import { checkoutRouter } from './checkout';
import { cartController } from '../controllers/cartController';


const router = Router();

router.get('/', homeController);
router.use(loginRouter);
router.use(registerRouter);
router.use(productRouter);
router.use(checkoutRouter);
router.get('/cart', cartController);


export { router };
