export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categories: string[];
}

export interface ProductModel {
  getAll(): Promise<Product[]>;
  getFeatured(categories?: string[]): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}
