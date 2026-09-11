import { Request, Response } from 'express';
import { categories, getProducts } from '../models/productsModel';

export const homeController = (_req: Request, res: Response) => {
  res.render('pages/index', { title: 'Home', products: getProducts(), categories });
};
