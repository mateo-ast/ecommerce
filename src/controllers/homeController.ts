import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';

const productModel = new JSONProductModel();

export const homeController = async (_req: Request, res: Response) => {
  const products = await productModel.getAll();
  res.render('pages/index', { title: 'Home', products });
};