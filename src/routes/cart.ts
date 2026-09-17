import { Router } from 'express';
import { cartController, updateCartController } from '../controllers/cartController';

export const cartRouter = Router();

cartRouter.get('/', cartController);
cartRouter.post('/', updateCartController);
