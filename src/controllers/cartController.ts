import { Request, Response } from 'express';
import { JSONCartModel } from '../models/JSONCartModel';
import { JSONProductModel } from '../models/JSONProductModel';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const formatPoints = (value: number): string =>
  new Intl.NumberFormat('es-AR').format(value);

export const getCartItems = async (): Promise<CartItem[]> => {
  const cartModel = new JSONCartModel();
  const productModel = new JSONProductModel();
  const cart = await cartModel.getCart();

  const items = await Promise.all(
    cart.cartItems.map(async (cartItem) => {
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

  return items.filter((item): item is CartItem => item !== null);
};

export const updateCartController = async (req: Request, res: Response) => {
  const cartItems = Array.isArray(req.body?.items)
    ? req.body.items
        .filter(
          (item: { productId?: string; quantity?: number }) =>
            typeof item?.productId === 'string' && Number(item.quantity) > 0,
        )
        .map((item: { productId: string; quantity: number }) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        }))
    : [];

  const cartModel = new JSONCartModel();
  await cartModel.saveCart({
    userId: 'default-user',
    cartItems,
  });

  res.status(200).json({ success: true, items: cartItems });
};

export const cartController = async (_req: Request, res: Response) => {
  const cartItems = await getCartItems();
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
