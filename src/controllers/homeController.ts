import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';

export const getHome = async (_req: Request, res: Response) => {
  const productModel = new JSONProductModel();
  const products = await productModel.getAll();
  res.render('pages/index', { title: 'Home', products });
};
