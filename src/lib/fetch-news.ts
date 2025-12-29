

export interface NewsItem {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	content: string;
	news_photo: {
		id: string;
		filename_disk: string;
		width?: number;
		height?: number;
	} | null;
}


export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
	const url = `${process.env.DIRECTUS_URL}/items/news?fields=id,slug,title,excerpt,date,content,news_photo.id,news_photo.filename_disk,news_photo.width,news_photo.height&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
		},
		cache: 'no-store',
	});
	if (!res.ok) {
		return null;
	}
	const json = await res.json();
	return json.data?.[0] || null;
}