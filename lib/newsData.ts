
import { getCollectionFromDirectus } from './directus';
import { NewsItem } from '../lib/news';

export async function getNewsData(): Promise<NewsItem[]> {
  const data = await getCollectionFromDirectus('news');
  return data as NewsItem[];
}
