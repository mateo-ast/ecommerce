import { Router } from 'express';
import { cartController } from '../controllers/cartController';

export const cartRouter = Router();

cartRouter.get('/', cartController);
