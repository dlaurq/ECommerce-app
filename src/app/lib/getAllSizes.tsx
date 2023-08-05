export default async function getAllSizes() {

    const res = await fetch(process.env.API_URL + '/api/sizes')

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
