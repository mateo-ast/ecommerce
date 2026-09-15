import { Router } from 'express';
import { getProducts, postProducts } from '../controllers/productController';

const productRouter = Router();

productRouter.get(['/:id', '/:id'], getProducts);

productRouter.post('/', postProducts);

export { productRouter };
