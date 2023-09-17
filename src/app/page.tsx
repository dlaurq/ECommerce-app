import Link from "next/link";
import DisplayProducts from "./components/DisplayProducts";
import { getAllFeaturedProducts } from "./lib/product";

export default async function Home() {
  const products = await getAllFeaturedProducts();

  return (
    <main>
      {/**HERO */}
      <section className="bg-[url('/heroImg.webp')]  bg-center bg-cover h-[30vh] ">
        <section className="w-full h-full flex flex-col justify-evenly items-center backdrop-blur-sm">
          <div className="p-2"></div>
          <h2 className="text-xl text-center text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_100%)] font-bold ">
            Find the shoes <br className="md:hidden" /> you never wanted
          </h2>
          <div className="p-1"></div>
          <p className="w-fit mx-auto text-lg font-bold text-amber-500 text-center px-4 py-2 bg-black hover:opacity-80">
            <Link href="/shoes">Discover</Link>
          </p>
          <div className="p-3"></div>
        </section>
      </section>

      {/**FEATURED */}
      <section className="p-5 md:px-8">
        <h3 className="text-2xl font-bold text-black">Featured</h3>
        <div className="p-2"></div>
        <DisplayProducts products={products} />
      </section>
    </main>
  );
}
