import headerData from '../app/content/header.json';

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

export function getHeaderData(): HeaderData {
  return headerData as HeaderData;
}
