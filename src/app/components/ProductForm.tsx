'use client'
import { useAuth } from "@clerk/nextjs";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProductForm({sizes, productId}: {sizes:Size[], productId: string}) {

  const [selectedSize, setSelectedSize] = useState<string>()

  const router = useRouter()

  const { userId } = useAuth();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(!userId) return router.push('/cart')
    if(!selectedSize) return

    const res = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId, productId, sizeId: selectedSize})
    })

    console.log(await res.json())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2"></div>
      <fieldset>
          <select onChange={(e) => setSelectedSize(e.target.value)} className="text-xl border-2 border-black px-2 py-1 w-full text-center" name="sizes" id="sizes" required>
              <option value="">Choose a size</option>
              {sizes.map(size => <option key={size.id} value={size.id}>{size.name}</option>)}
          </select>
      </fieldset>
      <div className="p-2"></div>
      <button className="p-2 font-bold bg-blue-950 text-white text-xl w-full" type="submit">Add to cart</button>
    </form>
  )
}
