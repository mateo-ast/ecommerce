import { Router } from 'express';
import { getCheckout, postCheckout } from '../controllers/checkoutController';

const checkoutRouter = Router();

checkoutRouter.get('/', getCheckout);

checkoutRouter.post('/', postCheckout);

export { checkoutRouter };
