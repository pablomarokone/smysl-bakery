import useSWR from 'swr';
import type { Header } from '@/lib/directus/types';

export function useHeader() {
  const { data, error } = useSWR<Header>('/api/header', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    header: data,
    loading: !data && !error,
    error,
  };
}
