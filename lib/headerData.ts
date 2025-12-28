
import { getCollectionFromDirectus } from './directus';

export type HeaderMenuItem = {
  label: string;
  href: string;
};

export type HeaderData = {
  logo: string;
  menu: HeaderMenuItem[];
  phone: string;
  address: string;
};

export async function getHeaderData(): Promise<HeaderData> {
  const data = await getCollectionFromDirectus('header');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as HeaderData;
  }
  return data as HeaderData;
}
