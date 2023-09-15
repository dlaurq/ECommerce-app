import ImagesSlider from "@/app/components/ImagesSlider"
import ProductForm from "../../components/ProductForm"
import Image from "next/image"
import { getProductById } from "@/app/lib/product"
import { Size } from "@prisma/client"

export default async function Page({params}: {params: { id: string}}) {

  const product = await getProductById(params.id)
  

  const sizes = product!.productSizeQuantity.map(item => item.Size) as Size[]

  return (
    <main className="p-5 md:flex md:flex-row md:items-center justify-center ">
    
      <ImagesSlider images={product?.images} />

       <section className="md:flex flex-col gap-2 hidden">
          {product?.images.map((image) => 
            <Image 
              key={image.id}
              className='aspect-square object-contain'
              src={'/'+image.url} 
              alt='shoes image'
              width={500}
              height={500}
              sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
            />)}
       </section>
       
      <div className="p-2 md:p-10"></div>
      
      <section className="md:sticky md:self-start md:top-1/2">
        <h3 className="text-2xl">
          {product?.name}
        </h3>

        <ProductForm sizes={sizes} productId={params.id}/>

      </section>
      
    </main>
  )
}
