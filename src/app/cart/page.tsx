import { auth } from "@clerk/nextjs";
import { getCartProductsByUser } from "../lib/product";
import { redirect } from "next/navigation";
import CartProduct from "../components/CartProduct";
import RouterRefresh from "../components/RouterRefresh";
import CheckoutButton from "../components/CheckoutButton";

export const revalidate = 0;

export default async function Cart() {
  const { userId } = auth();
  if (!userId) return redirect("/login");

  const cartProducts = await getCartProductsByUser({ userId });

  return (
    <section className="bg-gray-200 p-4 md:p-8 md:text-xl lg:px-80 xl:px-96 min-h-[80vh]">
      <div className="p-2"></div>
      <h2 className="font-bold text-2xl ">YOUR CART</h2>
      <div className="p-2"></div>

      <section className="bg-white">
        {cartProducts?.length === 0 ? (
          <p className="bg-gray-200">You have no products in your cart :( </p>
        ) : (
          cartProducts?.map((cartProduct) => (
            <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
          ))
        )}
      </section>

      <section className="py-5 flex flex-row justify-between ">
        <p className="bg-white text-xl font-medium p-5 w-fit">
          Total price:{" "}
          {cartProducts?.reduce(
            (total, cartProduct) =>
              total + cartProduct.quantity! * cartProduct.products.price,
            0
          )}
          $
        </p>
        <CheckoutButton userId={userId} />
      </section>
      <RouterRefresh />
    </section>
  );
}
