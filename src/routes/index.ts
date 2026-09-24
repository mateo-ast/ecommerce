import { Router } from 'express';
import { homeRouter } from './home';
import { loginRouter } from './login';
import { registerRouter } from './register';
import { productRouter } from './product';
import { cartRouter } from './cart';
import { checkoutRouter } from './checkout';
import { JSONProductModel } from '../models/JSONProductModel';
import { errorHandler } from '../middleware/errors';

const router = Router();

router.use('/', homeRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use(['/products', '/product'], productRouter);
router.use('/cart', cartRouter);
router.use('/checkout', checkoutRouter);

router.use(async (_req, res) => {
  const productModel = new JSONProductModel();
  const products = await productModel.getAll();

  res.status(404).render('pages/error404', {
    title: 'Página no encontrada',
    products: products.slice(0, 3),
  });
});

router.use(errorHandler);

export { router };
