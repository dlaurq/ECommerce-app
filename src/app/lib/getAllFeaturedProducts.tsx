
export default async function getAllFeaturedProducts() {

    const res = await fetch(process.env.API_URL + '/api/products?filters[featured][$eq]=true&populate=*')

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
