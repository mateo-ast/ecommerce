import { Router } from 'express';
import { homeRouter } from './home';
import { loginRouter } from './login';
import { registerRouter } from './register';
import { productRouter } from './product';
import { cartRouter } from './cart';
import { checkoutRouter } from './checkout';

const router = Router();

router.use('/', homeRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use(['/products', '/product'], productRouter);
router.use('/cart', cartRouter);
router.use('/checkout', checkoutRouter);

export { router };
