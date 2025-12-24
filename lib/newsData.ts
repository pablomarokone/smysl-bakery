import news from '../content/news.json';
import { NewsItem } from '../lib/news';

export function getNewsData(): NewsItem[] {
  return news as NewsItem[];
}
