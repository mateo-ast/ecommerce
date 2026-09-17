import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Cart, CartItem, CartModel } from './cartModel';

export class JSONCartModel implements CartModel {
  private readonly filePath = resolve('src/data/cart.json');
  private readonly defaultUserId = 'default-user';

  private normalizeCart(cart: Partial<Cart>): Cart {
    const cartItems = Array.isArray(cart.cartItems)
      ? cart.cartItems.filter(
          (item): item is CartItem =>
            Boolean(item?.productId) && Number(item?.quantity) > 0,
        )
      : [];

    return {
      userId: cart.userId ?? this.defaultUserId,
      cartItems,
    };
  }

  private async loadCart(): Promise<Cart> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data) as Partial<Cart>;
      return this.normalizeCart(parsed);
    } catch {
      return {
        userId: this.defaultUserId,
        cartItems: [],
      };
    }
  }

  async getCart(): Promise<Cart> {
    return this.loadCart();
  }

  async getAll(): Promise<CartItem[]> {
    const cart = await this.loadCart();
    return cart.cartItems;
  }

  async getByProductId(productId: string): Promise<CartItem | null> {
    const cart = await this.loadCart();
    return cart.cartItems.find((item) => item.productId === productId) || null;
  }

  async saveCart(cart: Cart): Promise<void> {
    const normalizedCart = this.normalizeCart(cart);
    await writeFile(this.filePath, JSON.stringify(normalizedCart, null, 2));
  }
}
