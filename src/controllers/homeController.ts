import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';
import { ProductModel } from '../models/productsModel';

// TODO Move to productService
async function getMostOrderedProducts(productModel: ProductModel) {
  return (await productModel.getAll()).splice(20, 10);
}

export const getHome = async (_req: Request, res: Response) => {
  const productModel = new JSONProductModel();
  // TODO pagination
  const products = await productModel.getAll();
  const mostOrderedProducts = await getMostOrderedProducts(productModel);

  res.render('pages/index', {
    title: 'Home',
    products,
    mostOrderedProducts,
  });
};
