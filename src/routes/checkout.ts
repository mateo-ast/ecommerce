import { Router } from 'express';

const checkoutRouter = Router();

checkoutRouter.get('/checkout', (_req, res) => {
    res.render('pages/checkout', {
        title: 'Checkout',
        brand: 'Ecommerce',
        heading: 'Checkout',
        headingId: 'checkout-title',
        intro: 'Completá tus datos para finalizar la compra.',
        action: '/checkout',
        submitLabel: 'Finalizar Compra',
        backHref: '/',
        backLabel: 'Volver al inicio',
        order: {
            name: 'Auriculares inalámbricos Lite Pro',
            description: 'Audio envolvente, cancelación de ruido y batería de larga duración.',
            price: 249.99,
            quantity: 1,
            shipping: 15,
            total: 264.99,
        },
    });
});

checkoutRouter.post('/checkout', (_req, res) => {
    res.redirect('/');
});

export { checkoutRouter };