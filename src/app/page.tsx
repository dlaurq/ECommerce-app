import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { Suspense } from "react";
import getAllFeaturedProducts from "./lib/getAllFeaturedProducts";

export default async function Home() {

  const productsData = await fetch(process.env.API_URL + '/api/products?filters[featured][$eq]=true&populate=*').then(res => res.json())
  const products:Product[] = productsData.data

  return (
    <main>

      {/**HERO */}
      <section className="bg-[url('/heroImg.webp')] bg-center bg-cover h-[50vh] flex flex-col justify-evenly">
        <div className="p-2"></div>
        <h2 className="text-xl text-center text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_100%)] font-bold ">Find the shoes <br /> you never wanted</h2>
        <div className="p-1"></div>
        <p className="w-fit mx-auto text-lg font-bold text-white text-center px-2 py-1 bg-blue-950"><Link href='/shoes' >Discover</Link></p>
        <div className="p-3"></div>
      </section>

      {/**FEATURED */}
      <section className="p-5">
        <h3 className="text-xl font-bold text-blue-950">Featured</h3>
        <div className="p-3"></div>
        <Suspense fallback={<section>Loading...</section>}>
          <section className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {products.map(product => <ProductCard key={product.id} img={process.env.API_URL + product.attributes.images.data[0].attributes.formats.small.url} title={product.attributes.name} price={product.attributes.price} sale={product.attributes.sale}/>)}
          </section>
        </Suspense>
      </section>
    </main>
  )
}

