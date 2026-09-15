import { Request, Response } from 'express';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
// no tenemos productos todavía, placeholder
const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Auriculares Bluetooth',
    price: 5990,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Reloj Inteligente',
    price: 12990,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Altavoz Portátil',
    price: 4590,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
  }
];

const formatPoints = (value: number): string => new Intl.NumberFormat('es-AR').format(value);

export const getCartItems = (): CartItem[] => cartItems;

export const cartController = (_req: Request, res: Response) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  res.render('pages/cart', {
    title: 'Carrito',
    items: cartItems,
    subtotal: formatPoints(subtotal),
    discount: formatPoints(discount),
    total: formatPoints(total),
    couponCode: ''
  });
};

export const checkoutController = (_req: Request, res: Response) => {
  res.render('pages/checkout', {
    title: 'Pago',
    message: 'Tu compra está lista para ser abonada.'
  });
};