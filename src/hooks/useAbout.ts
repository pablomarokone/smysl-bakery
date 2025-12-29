import useSWR from 'swr';
import type { About } from '@/lib/directus/types';


export function useAbout() {
  const { data, error } = useSWR<About>('/api/about', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    about: data,
    loading: !data && !error,
    error,
  };
}
