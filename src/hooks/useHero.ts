import useSWR from 'swr';
import type { Hero } from '@/lib/directus/types';

export function useHero() {
  const { data, error } = useSWR<Hero[]>('/api/hero', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    hero: data,
    loading: !data && !error,
    error,
  };
}
