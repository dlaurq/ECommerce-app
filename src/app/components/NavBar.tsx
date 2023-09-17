import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function NavBar() {
  const { userId } = auth();
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

      {!userId ? (
        <Link href="/sign-in">Login</Link>
      ) : (
        <section className="flex flex-row items-center justify-between gap-3 md:gap-6 text-white ">
          <Link href="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="h-6 w-auto md:h-7 hover:opacity-80 "
            />
          </Link>
          <UserButton afterSignOutUrl="/" />
        </section>
      )}
    </nav>
  );
}
