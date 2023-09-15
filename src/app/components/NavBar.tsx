import Link from "next/link"
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
export default async function NavBar(){
  const { userId } = auth();
  return (
    <nav className="flex flex-row justify-between items-end text-2xl border-b-4 border-blue-950  text-blue-950 px-5 py-2">
        <h1 className="text-4xl font-bold "><Link href='/'>Gumari</Link></h1>
        <ul className="mr-auto">
            <li className="pl-3"><Link href='/shoes'>Shoes</Link></li>
        </ul>
        {!userId
          ? <Link href='/sign-in'>Login</Link>
          : <section className="flex flex-row gap-2">
              <Link href='/cart'>Cart</Link>
              <UserButton afterSignOutUrl="/"/>
            </section> 
        }
    </nav>
  )
}

