import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Cart, CartItem, CartModel } from './cartModel';

export class JSONCartModel implements CartModel {
  private readonly filePath = resolve('src/data/cart.json');
  private readonly defaultUserId = 'default-user';

  private async loadCart(): Promise<Cart> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data) as Partial<Cart>;

      return {
        userId: parsed.userId ?? this.defaultUserId,
        cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems : [],
      };
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
}
