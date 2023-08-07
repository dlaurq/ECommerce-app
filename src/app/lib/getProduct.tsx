
export default async function getProduct(id: string) {

    const res = await fetch(process.env.API_URL + `/api/products/${id}?populate=*`)

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
