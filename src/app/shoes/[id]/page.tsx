import ImagesSlider from "@/app/components/ImagesSlider"
import getProduct from "@/app/lib/getProduct"
import ProductForm from "../../components/ProductForm"

export default async function Page({params}: {params: { id: string}}) {

  const productData = getProduct(params.id)
  const product:{data:Product} = await productData

  console.log(product.data.attributes.sizes?.data)

  return (
    <main className="p-5">
      <ImagesSlider images={product.data.attributes.images.data} />
      <div className="p-2"></div>
      <h3 className="text-2xl">
        {product.data.attributes.name}
      </h3>
      <ProductForm sizes={product.data.attributes.sizes.data}/>
    </main>
  )
}
