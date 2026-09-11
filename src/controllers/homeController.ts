import { Request, Response } from 'express';

// TODO move to model
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Auriculares Bluetooth',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Auriculares inalámbricos con cancelación de ruido'
  },
  {
    id: 2,
    name: 'Reloj Inteligente',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Smartwatch con monitor de salud y GPS'
  },
  {
    id: 3,
    name: 'Cámara Fotográfica',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    description: 'Cámara digital de alta resolución'
  },
  {
    id: 4,
    name: 'Altavoz Portátil',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    description: 'Altavoz resistente al agua con gran sonido'
  },
  {
    id: 5,
    name: 'Tablet 10"',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    description: 'Tablet con pantalla Full HD y gran rendimiento'
  },
  {
    id: 6,
    name: 'Teclado Mecánico',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
    description: 'Teclado mecánico RGB para gaming'
  }
];

const getProducts = (): Product[] => products;

export const homeController = (_req: Request, res: Response) => {
  res.render('pages/index', { title: 'Home', products: getProducts() });
};