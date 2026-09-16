import { Product, ProductModel } from './productsModel';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export class JSONProductModel implements ProductModel {
  private readonly filePath = resolve('src/data/products.json');

  private async loadProducts(): Promise<Product[]> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getAll(): Promise<Product[]> {
    return this.loadProducts();
  }

  async getFeatured(): Promise<Product[]> {
    const products = await this.loadProducts();
    return products.slice(0, 3);
  }

  async getById(id: string): Promise<Product | null> {
    const products = await this.loadProducts();
    return products.find((p) => p.id === id) || null;
  }
}
