
import { getCollectionFromDirectus } from './directus';

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  ingredients?: string;
  weight?: string;
  image: string;
  product_photo?: { url: string };
  price: string;
};

export async function getProductsData(): Promise<Product[]> {
  const data = await getCollectionFromDirectus('products');
  return data as Product[];
}
