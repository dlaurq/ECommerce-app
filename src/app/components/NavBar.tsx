import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-end text-2xl border-b-4 border-blue-950  text-blue-950 px-5 py-2">
        <h1 className="text-4xl font-bold "><Link href='/'>Gumari</Link></h1>
        <ul className="mr-auto">
            <li className="pl-3"><Link href='/shoes'>Shoes</Link></li>
        </ul>
        <p>Cart</p>
    </nav>
  )
}

export default NavBar