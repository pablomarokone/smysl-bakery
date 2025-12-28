
import { getCollectionFromDirectus } from './directus';

export async function getAboutData() {
  const data = await getCollectionFromDirectus('about');
  // Если коллекция about содержит только один объект, возвращаем его
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return data;
}
