
import { getHeroFromDirectus } from './directus';

export async function getHeroData() {
  return await getHeroFromDirectus();
}
