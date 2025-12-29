import useSWR from 'swr';
import type { Mission } from '@/lib/directus/types';

export function useMission() {
  const { data, error } = useSWR<Mission>('/api/mission', (url: string) =>
    fetch(url).then((r) => r.json())
  );

  return {
    mission: data,
    loading: !data && !error,
    error,
  };
}
