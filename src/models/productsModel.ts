export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductModel {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}
