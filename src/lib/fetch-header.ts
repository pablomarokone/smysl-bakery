

export interface HeaderMenuItem {
	label: string;
	href: string;
}

export interface HeaderLogo {
	id: string;
	filename_disk: string;
	url: string;
}

export interface HeaderData {
	logo: HeaderLogo | null;
	menu: HeaderMenuItem[];
	phone: string;
	email: string;
}


export async function fetchHeaderData(): Promise<HeaderData | null> {
  const url = `${process.env.DIRECTUS_URL}/items/header?fields=logo.id,logo.filename_disk,menu.label,menu.href,phone,email&limit=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = await res.json();
  const item = json.data?.[0];
  if (!item) return null;

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
  const logo = item.logo?.id && item.logo?.filename_disk
    ? {
        id: item.logo.id,
        filename_disk: item.logo.filename_disk,
        url: `${directusUrl}/assets/${item.logo.id}`,
      }
    : null;

  // Обновлённое статичное меню
  const menu = [
    { label: "Наша выпечка и десерты", href: "#products" },
    { label: "О нас", href: "#about" },
    { label: "Новости", href: "#news" },
    { label: "Контакты", href: "#contacts" },
  ];

  return {
    logo,
    menu,
    phone: item.phone || "",
    email: item.email || "",
  };
}