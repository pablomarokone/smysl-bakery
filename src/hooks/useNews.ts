import useSWR from 'swr';
import type { News } from '@/lib/directus/types';

export function useNews() {
  const { data, error } = useSWR<News[]>('/api/news', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    news: data,
    loading: !data && !error,
    error,
  };
}
