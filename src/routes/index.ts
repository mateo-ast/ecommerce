import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { loginRouter } from './login';
import { registerRouter } from './register';
import { checkoutRouter } from './checkout';

const router = Router();

router.get('/', homeController);
router.use(loginRouter);
router.use(registerRouter);
router.use(checkoutRouter);

export { router };
