import { auth } from "@clerk/nextjs";
import { getCartProductsByUser } from "../lib/product"
import { redirect } from "next/navigation";
import CartProduct from "../components/CartProduct";


export const revalidate = 0

export default async function Cart() {

    const { userId } = auth();
    if(!userId) return redirect('/login')

    const cartProducts =  await getCartProductsByUser({ userId })

    return (
        <section className="bg-gray-200 ">
            <div className="p-2"></div>
            <h2 className="font-bold text-2xl px-5">YOUR CART</h2>
            <div className="p-2"></div>

            <section className="bg-white">
                {cartProducts?.map(cartProduct => <CartProduct key={cartProduct.id} cartProduct={cartProduct}/>)}
            

            </section>
                
            <section className="p-5 flex flex-row justify-between ">
                <p className="bg-white text-xl font-medium p-5 w-fit">Total price: {cartProducts?.reduce((total, cartProduct) => total + (cartProduct.quantity! * cartProduct.products.price), 0)}$</p>   
                <button className="bg-black text-white text-xl font-medium p-5 w-fit">Checkout</button>
            </section>
             
        </section>
    )
}
