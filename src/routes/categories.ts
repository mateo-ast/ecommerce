import { Router } from 'express';
import {
  getCategories,
  getProductsByCategory,
} from '../controllers/categoriesController';

const categoriesRouter = Router();

// El orden importa: '/' (listado) antes que '/:category' (detalle).
categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:category', getProductsByCategory);

export { categoriesRouter };
