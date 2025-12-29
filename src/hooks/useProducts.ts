import useSWR from 'swr';
import type { Products } from '@/lib/directus/types';

export function useProducts() {
  const { data, error } = useSWR<Products[]>('/api/products', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    products: data,
    loading: !data && !error,
    error,
  };
}
