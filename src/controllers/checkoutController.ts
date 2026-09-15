import { Request, Response } from 'express';

export const getCheckout = async (_req: Request, res: Response) => {
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
      description:
        'Audio envolvente, cancelación de ruido y batería de larga duración.',
      price: 249.99,
      quantity: 1,
      shipping: 15,
      total: 264.99,
    },
  });
};

export const postCheckout = async (_req: Request, res: Response) => {
  res.redirect('/');
};
