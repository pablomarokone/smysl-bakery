
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { collection: string } }) {
  const { collection } = params;
  const url = `${process.env.DIRECTUS_URL}/items/${collection}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
    }
    const json = await res.json();
    // Если коллекция пуста — возвращаем заглушку
    if (!json.data || json.data.length === 0) {
      return NextResponse.json([
        {
          title: 'Заглушка',
          image: '/img/placeholder.jpg',
          description: 'Нет данных',
        },
      ]);
    }
    return NextResponse.json(json.data);
  } catch (e) {
    console.error(`API error in /api/${collection}`, e);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
