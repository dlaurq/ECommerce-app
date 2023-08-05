
import Filters from '../components/Filters'
import getAllSizes from '../lib/getAllSizes'
import getAllColors from '../lib/getAllColors'
import getAllProducts from '../lib/getAllProducts'
import DisplayProducts from '../components/DisplayProducts'
import getFilteredProducts from '../lib/getFilteredProducts'
import Colaps from '../components/Colaps'

const Shoes = async ({searchParams}:{searchParams: {sizes: string, colors: string}}) => {
      const colorsData = getAllColors()
      const sizesData = getAllSizes()
      const productsData = getFilteredProducts(searchParams)

      const [colors, sizes, products] = await Promise.all([colorsData, sizesData, productsData])

      

  return (
    <main className='md:flex flex-row'>
      <Colaps title='Filters'>
        <Filters data={sizes.data} valueKey='sizes' name='sizes' />
        <Filters data={colors.data} valueKey='colors' name='colors' />
      </Colaps>
      <section className='p-5'>
        <DisplayProducts products={products.data}/>
      </section>
    </main>
  )
}

export default Shoes