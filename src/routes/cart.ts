import { Router } from 'express';
import { clearCart, getCart, updateCartItem } from '../controllers/cartController';

export const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.post('/clear', clearCart);
cartRouter.post('/:id', updateCartItem);
