
import Filters from '../components/Filters'
import DisplayProducts from '../components/DisplayProducts'
import Colaps from '../components/Colaps'
import prisma from '../lib/prisma'
import { Color, Size } from '@prisma/client'
import { Product } from '../../../types'
import { getAllProducts } from '../lib/product'

const Shoes = async ({searchParams}:{searchParams: {sizes: string, colors: string}}) => {

  let where = {}

  if(searchParams.sizes && searchParams.sizes.length > 0){
    where = {...where,
      productSizeQuantity: {
        some: {
          Size: {
            name: {
              in: searchParams.sizes?.split(' ').map(size => size)
            }
          }
        }
      }
    }
  }

  if(searchParams.colors && searchParams.colors.length > 0){
    where = {...where,
      productColors: {
        some: {
          Color: {
            name: {
              in: searchParams.colors?.split(' ').map(size => size)
            }
          }
        }
      }
    }
  }

  const colorsData = await prisma.color.findMany({orderBy: { name:'asc'}})
  const sizesData = await prisma.size.findMany({orderBy: { name:'asc'}})
  const productsData = await getAllProducts(where)

  const [colors, sizes, products]: [colors: Color[], sizes: Size[], products: Product[]] = await Promise.all([colorsData, sizesData, productsData])
      
  return (
    <main className='md:flex flex-row'>
      <Colaps title='Filters'>
        <Filters data={sizes} valueKey='sizes' name='sizes' />
        <Filters data={colors} valueKey='colors' name='colors' />
      </Colaps>
      <section className='p-5'>
        <DisplayProducts products={products}/>
      </section>
    </main>
  )
}

export default Shoes