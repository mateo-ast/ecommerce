export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  cartItems: CartItem[];
}

export interface CartModel {
  getCart(): Promise<Cart | null>;
  getAll(): Promise<CartItem[]>;
  getCartItems(): Promise<CartItem[]>;
  getByProductId(productId: string): Promise<CartItem | null>;
  saveCart(cart: Cart): Promise<void>;
}
