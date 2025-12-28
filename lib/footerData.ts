
import { getCollectionFromDirectus } from './directus';

export async function getFooterData() {
  const data = await getCollectionFromDirectus('footer');
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return data;
}
