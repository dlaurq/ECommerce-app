import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prisma from "../lib/prisma";
import { ReactNode } from "react";

export default async function NavBar() {
  const { userId } = auth();

  if (!userId)
    return (
      <StaticSection>
        <Link href="/sign-in">Login</Link>
      </StaticSection>
    );

  const cart = await prisma.cart.findFirst({ where: { userId: userId } });

  const productsCouter = await prisma.cartProduct.count({
    where: {
      cartId: cart?.id,
    },
  });

  return (
    <StaticSection>
      <section className="relative flex flex-row items-center justify-between gap-3 md:gap-6 text-white ">
        <Link href="/cart" className=" hover:opacity-80">
          <p className="absolute bottom-4 left-3 z-10 bg-amber-500 text-black rounded-full p-0.5 text-sm aspect-square min-w-[1.5rem] text-center font-medium">
            {productsCouter}
          </p>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="h-6 w-auto md:h-7 "
          />
        </Link>
        <UserButton afterSignOutUrl="/" />
      </section>
    </StaticSection>
  );
}

function StaticSection({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-black flex flex-row justify-between items-end text-xl p-4 font-medium text-white md:px-8 md:text-2xl">
      <h1 className="text-3xl font-bold text-center uppercase text-amber-500 md:text-4xl hover:opacity-80">
        <Link href="/">Gumari</Link>
      </h1>
      <ul className="mr-auto ">
        <li className="pl-3 md:pl-6 hover:opacity-80">
          <Link href="/shoes">Shoes</Link>
        </li>
      </ul>
      {children}
    </nav>
  );
}
