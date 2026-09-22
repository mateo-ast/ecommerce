import { Router } from 'express';
import { getProducts } from '../controllers/productController';

const productRouter = Router();

productRouter.get(['/:id', '/:id'], getProducts);

export { productRouter };
