import { Request, Response } from 'express';
import { JSONCartModel } from '../models/JSONCartModel';
import { JSONProductModel } from '../models/JSONProductModel';

const formatPoints = (value: number): string =>
  new Intl.NumberFormat('es-AR').format(value);

const buildCartViewItems = async () => {
  const cartModel = new JSONCartModel();
  const productModel = new JSONProductModel();
  const cart = await cartModel.getCart();

  if (!cart) {
    return [];
  }

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

  return items.filter((item): item is NonNullable<typeof item> => item !== null);
};

export const getCart = async (_req: Request, res: Response) => {
  const cartItems = await buildCartViewItems();
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

export const postCart = async (req: Request, res: Response) => {
  const productId = typeof req.params?.id === 'string' ? req.params.id : null;
  const bodyItems = Array.isArray(req.body?.items)
    ? req.body.items.filter(
        (item: { productId?: string; quantity?: number }) =>
          typeof item?.productId === 'string' && Number(item.quantity) > 0,
      )
    : [];

  if (productId) {
    const cartModel = new JSONCartModel();
    const cart: {
      userId: string;
      cartItems: { productId: string; quantity: number }[];
    } =
      (await cartModel.getCart()) ?? {
        userId: req.body?.userId ?? 'default-user',
        cartItems: [],
      };

    const existingItem = cart.cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.cartItems.push({ productId, quantity: 1 });
    }

    await cartModel.saveCart(cart);
    return res.redirect('/cart');
  }

  const cartModel = new JSONCartModel();
  const cartItems = bodyItems.map((item: { productId: string; quantity: number }) => ({
    productId: item.productId,
    quantity: Number(item.quantity),
  }));

  await cartModel.saveCart({
    userId: req.body?.userId ?? 'default-user',
    cartItems,
  });

  if (bodyItems.length) {
    return res.status(200).json({ success: true, items: cartItems });
  }

  return res.redirect('/cart');
};
