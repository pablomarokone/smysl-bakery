import useSWR from 'swr';
import type { Site } from '@/lib/directus/types';

export function useSite() {
  const { data, error } = useSWR<Site>('/api/site', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    site: data,
    loading: !data && !error,
    error,
  };
}
