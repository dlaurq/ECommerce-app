import { Suspense } from 'react'
import ProductCard from './ProductCard'

export default function DisplayProducts({products}:{products:Product[]}) {
  return (
    <Suspense fallback={<section>Loading...</section>}>
        <section className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {products.map(product => 
                <ProductCard 
                    key={product.id} 
                    img={process.env.API_URL + product.attributes.images.data[0].attributes.formats.small.url} 
                    title={product.attributes.name} 
                    price={product.attributes.price} 
                    sale={product.attributes.sale}/>
            )}
        </section>
    </Suspense>
  )
}
