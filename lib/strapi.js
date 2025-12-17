const STRAPI_URL = 'http://localhost:1337'

export async function getProducts() {
  console.log('Запрашиваем продукты с URL:', `${STRAPI_URL}/api/products?populate=*`)
  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`)
  console.log('Статус ответа:', res.status)
  const data = await res.json()
  console.log('Данные из API:', data)
  return data.data
}
