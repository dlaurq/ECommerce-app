export default async function getAllColors() {

    const res = await fetch(process.env.API_URL + '/api/colors')

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
