import ImagesSlider from "@/app/components/ImagesSlider"
import getProduct from "@/app/lib/getProduct"
import ProductForm from "../../components/ProductForm"
import Image from "next/image"

export default async function Page({params}: {params: { id: string}}) {

  const productData = getProduct(params.id)
  const product:{data:Product} = await productData

  return (
    <main className="p-5 md:flex md:flex-row md:items-center justify-center ">
    
      <ImagesSlider images={product.data.attributes.images.data} />

       <section className="md:flex flex-col gap-2 hidden">
          {product.data.attributes.images.data.map((image: any) => 
            <Image 
              key={image.id}
              className='aspect-square object-contain'
              src={process.env.NEXT_PUBLIC_API_URL + image.attributes.url} 
              alt='shoes image'
              width={500}
              height={500}
              sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
            />)}
       </section>
       
      <div className="p-2 md:p-10"></div>
      
      <section className="md:sticky md:self-start md:top-1/2">
        <h3 className="text-2xl">
          {product.data.attributes.name}
        </h3>
        <ProductForm sizes={product.data.attributes.sizes.data}/>
      </section>
      
    </main>
  )
}
