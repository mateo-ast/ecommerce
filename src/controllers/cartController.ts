import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';
import { CartItem } from '../models/cartModel';

const formatPoints = (value: number): string =>
  new Intl.NumberFormat('es-AR').format(value);

const buildCartViewItems = async (cart: CartItem[]) => {
  const productModel = new JSONProductModel();

  const items = await Promise.all(
    cart.map(async (cartItem) => {
      const product = await productModel.getById(cartItem.productId);
      if (!product) {
        return null;
      }

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.image,
      };
    }),
  );

  return items.filter((item): item is NonNullable<typeof item> => item !== null);
};

export const getCart = async (_req: Request, res: Response) => {
  const cartItems = await buildCartViewItems(_req.session.cart || []);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const total = subtotal - discount;

  res.render('pages/cart', {
    title: 'Carrito',
    items: cartItems,
    subtotal: formatPoints(subtotal),
    discount: formatPoints(discount),
    total: formatPoints(total),
    couponCode: '',
  });
};

export const updateCartItem = async (req: Request, res: Response) => {
  const productId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const action = req.body?.action === 'decrement' ? 'decrement' : 'increment';
  const cart = req.session.cart || [];
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += action === 'increment' ? 1 : -1;
    req.session.cart = cart.filter((cartItem) => cartItem.quantity > 0);
  } else if (action === 'increment') {
    req.session.cart = [...cart, { productId, quantity: 1 }];
  }

  if (req.accepts('html')) {
    return res.redirect('/cart');
  }

  return res.json({ success: true, cart: req.session.cart });
};

export const clearCart = (req: Request, res: Response) => {
  req.session.cart = [];
  return res.redirect('/cart');
};
