import useSWR from 'swr';
import type { Menu } from '@/lib/directus/types';


export function useMenu() {
  const { data, error } = useSWR<Menu[]>('/api/menu', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    menu: data,
    loading: !data && !error,
    error,
  };
}
