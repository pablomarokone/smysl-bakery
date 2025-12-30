export async function GET() {
  const res = await fetch(
    "https://smysl-bakery-directus.onrender.com/items/products",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  return Response.json({
    status: res.status,
    data,
  });
}
