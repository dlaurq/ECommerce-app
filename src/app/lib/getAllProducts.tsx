
export default async function getAllProducts() {

    const res = await fetch(process.env.API_URL + '/api/products?populate=*')

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
