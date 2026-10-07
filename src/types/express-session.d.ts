import 'express-session';
import { CartItem } from '../models/cartModel';

declare module 'express-session' {
  interface SessionData {
    cart: CartItem[];
  }
}
