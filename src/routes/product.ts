import { Router } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';

const productRouter = Router();
const productModel = new JSONProductModel();

productRouter.get(['/product/:id', '/products/:id'], async (req, res) => {
    const productId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await productModel.getById(productId);

    if (!product) {
        return res.status(404).render('pages/product', {
            title: 'Producto no encontrado',
            product: null,
            suggestedProducts: await productModel.getAll(),
        });
    }

    const relatedProducts = (await productModel.getAll())
        .filter((relatedProduct) => relatedProduct.id !== product.id)
        .slice(0, 3);

    return res.render('pages/product', {
        title: product.name,
        product,
        relatedProducts,
        action: '/product',
        submitLabel: 'Agregar al carrito',
        backHref: '/',
        backLabel: 'Volver al inicio',
    });
});

productRouter.post('/product', (_req, res) => {
    res.redirect('/cart');
});

export { productRouter };