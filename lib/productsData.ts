import products from '../content/products.json';

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

export function getProductsData(): Product[] {
  return products as Product[];
}
