import { Request, Response } from 'express';
import { JSONProductModel } from '../models/JSONProductModel';

// En products.json las categorías son slugs en minúsculas y sin tildes
// (ej: "tecnologia", "smart-home"). Este mapa da el nombre para mostrar
// cuando el slug por sí solo no alcanza (tildes, ñ, varias palabras).
const CATEGORY_LABELS: Record<string, string> = {
  tecnologia: 'Tecnología',
  fotografia: 'Fotografía',
  diseno: 'Diseño',
  energia: 'Energía',
  iluminacion: 'Iluminación',
  ergonomia: 'Ergonomía',
  automovil: 'Automóvil',
  climatizacion: 'Climatización',
  comunicacion: 'Comunicación',
  educacion: 'Educación',
  impresion: 'Impresión',
  'smart-home': 'Smart home',
  'cine-en-casa': 'Cine en casa',
  'realidad-virtual': 'Realidad virtual',
};

// Normaliza el slug de la URL: minúsculas, sin tildes, espacios/guiones unificados.
// Así /categories/Tecnología y /categories/tecnologia dan el mismo resultado.
const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '-');

const getCategoryLabel = (slug: string): string =>
  CATEGORY_LABELS[slug] ??
  slug.replace(/-/g, ' ').replace(/^./, (char) => char.toUpperCase());

export const getCategories = async (_req: Request, res: Response) => {
  const productModel = new JSONProductModel();
  const allProducts = await productModel.getAll();

  // Cuenta cuántos productos tiene cada categoría.
  const counts = new Map<string, number>();
  allProducts.forEach((product) => {
    product.categories?.forEach((slug: string) => {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    });
  });

  const categories = [...counts.entries()]
    .map(([slug, count]) => ({
      slug,
      name: getCategoryLabel(slug),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return res.render('pages/categoriesIndex', {
    title: 'Categorías',
    categories,
  });
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const rawCategory = Array.isArray(req.params.category)
    ? req.params.category[0]
    : req.params.category;
  const categorySlug = normalize(rawCategory);
  const categoryName = getCategoryLabel(categorySlug);

  const productModel = new JSONProductModel();
  const allProducts = await productModel.getAll();

  const products = allProducts.filter((product) =>
    product.categories?.includes(categorySlug),
  );

  return res.render('pages/categories', {
    title: `Categoría: ${categoryName}`,
    categoryName,
    products,
    suggestedProducts: products.length ? [] : allProducts.slice(0, 3),
  });
};
