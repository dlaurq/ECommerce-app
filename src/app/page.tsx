
import Link from "next/link";
import getAllFeaturedProducts from "./lib/getAllFeaturedProducts";
import DisplayProducts from "./components/DisplayProducts";

export default async function Home() {

  const productsData = getAllFeaturedProducts()
  const products = await productsData

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
        <DisplayProducts products={products.data}/>
      </section>
    </main>
  )
}

