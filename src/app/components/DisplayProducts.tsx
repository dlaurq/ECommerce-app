import { Suspense } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../../types";

export default function DisplayProducts({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<section>Loading...</section>}>
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3">
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
