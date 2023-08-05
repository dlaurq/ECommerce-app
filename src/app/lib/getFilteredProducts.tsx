
export default async function getFilteredProducts({colors, sizes}:{colors: string, sizes: string}) {

    const colorsQ = colors ? colors.split(' ').map(i => `&filters[colors][name][$eq]=${i}`).join('') : ''
    const sizesQ = sizes ? sizes.split(' ').map(i => `&filters[sizes][name][$eq]=${i}`).join('') : ''

    console.log('c')
    console.log(colorsQ)
    console.log('s')
    console.log(sizesQ)

    const res = await fetch(process.env.API_URL + '/api/products?populate=*' + sizesQ + colorsQ)

    console.log(process.env.API_URL + '/api/products?populate=*' + sizesQ + colorsQ)

    if(!res.ok) throw new Error('failed to fetch data')

    return res.json()
}
