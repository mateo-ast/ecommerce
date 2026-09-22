import { Router } from 'express';
import { getCart, postCart } from '../controllers/cartController';

export const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.post('/', postCart);
cartRouter.post('/:id', postCart);
