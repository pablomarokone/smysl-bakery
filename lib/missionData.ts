
import { getCollectionFromDirectus } from './directus';

export async function getMissionData() {
  const data = await getCollectionFromDirectus('mission');
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return data;
}
