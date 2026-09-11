import { Request, Response } from 'express';
import { formatPoints } from '../models/productsModel';

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
    price: 59.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Reloj Inteligente',
    price: 129.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Altavoz Portátil',
    price: 45.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
  }
];

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
    couponCode: '',
    formatPoints,
  });
};

export const checkoutController = (_req: Request, res: Response) => {
  res.render('pages/checkout', {
    title: 'Pago',
    message: 'Tu compra está lista para ser abonada.'
  });
};
