import { Router } from 'express';
import {
    categories,
    getProductById,
    getRelatedProducts,
    getSuggestedProducts,
    formatPoints,
} from '../models/productsModel';

const productRouter = Router();

productRouter.get(['/product', '/product/:id'], (req, res) => {
    const productId = req.params.id ? Number(req.params.id) : 1;
    const product = Number.isInteger(productId) ? getProductById(productId) : undefined;

    if (!product) {
        return res.status(404).render('pages/product', {
            title: 'Producto no encontrado',
            brand: 'Ecommerce',
            product: undefined,
            categories,
            suggestedProducts: getSuggestedProducts(),
        });
    }

    res.render('pages/product', {
        title: product.name,
        brand: 'Ecommerce',
        product,
        categories,
        relatedProducts: getRelatedProducts(product),
        formatPoints,
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