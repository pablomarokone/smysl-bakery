import useSWR from 'swr';
import type { Footer } from '@/lib/directus/types';


export function useFooter() {
  const { data, error } = useSWR<Footer>('/api/footer', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    footer: data,
    loading: !data && !error,
    error,
  };
}
