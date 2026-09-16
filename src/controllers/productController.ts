import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';

export const getProducts = async (req: Request, res: Response) => {
  const productModel = new JSONProductModel();
  const productId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;
  const product = await productModel.getById(productId);

  if (!product) {
    return res.status(404).render('pages/product', {
      title: 'Producto no encontrado',
      product: null,
      suggestedProducts: await productModel.getFeatured(),
    });
  }

  const relatedProducts = (await productModel.getFeatured())
    .filter((relatedProduct) => relatedProduct.id !== product.id);

  return res.render('pages/product', {
    title: product.name,
    product,
    relatedProducts,
    action: '/product',
    submitLabel: 'Agregar al carrito',
    backHref: '/',
    backLabel: 'Volver al inicio',
  });
};

export const postProducts = async (_req: Request, res: Response) => {
  res.redirect('/cart');
};
