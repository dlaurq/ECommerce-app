import Image from "next/image";
import CartProductInteraction from "./CartProductInteraction";
import { CartProduct } from "../../../types";

export default function CartProduct({
  cartProduct,
}: {
  cartProduct: CartProduct;
}) {
  return (
    <section className="p-5 flex flex-row justify-start items-start gap-5 border-b-2  border-black last:border-b-0">
      <Image
        className="aspect-square object-contain"
        alt={cartProduct.products.name}
        src={"/" + cartProduct.products.images[0].url}
        width={100}
        height={100}
        sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
      />
      <section className="w-full flex flex-col ">
        <section className="flex flex-row justify-between items-start">
          <section>
            <h3>{cartProduct.products.name}</h3>
            <p>Size: {cartProduct.size.name}</p>
          </section>

          <section>
            {cartProduct.products.price * cartProduct.quantity!}$
          </section>
        </section>
        <div className="p-2"></div>
        <CartProductInteraction cartProduct={cartProduct} />
      </section>
    </section>
  );
}
