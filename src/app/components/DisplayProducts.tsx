import { Suspense } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../../types";

export default function DisplayProducts({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<section>Loading...</section>}>
      <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            img={"/" + product.images[0].url}
            title={product.name}
            price={product.price}
            sale={product.sale}
          />
        ))}
      </section>
    </Suspense>
  );
}
