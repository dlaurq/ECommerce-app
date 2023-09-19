"use client";
import { useAuth } from "@clerk/nextjs";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  sizes,
  productId,
}: {
  sizes: Size[];
  productId: string;
}) {
  const [selectedSize, setSelectedSize] = useState<string>();
  const [buttonText, setButtonText] = useState<string>("Add to cart");

  const router = useRouter();

  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) return router.push("/cart");
    if (!selectedSize) return;

    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, sizeId: selectedSize }),
    });

    if (res?.ok) setButtonText("Product added");
    router.refresh();
    //console.log(await res.json());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2"></div>
      <fieldset>
        <select
          onChange={(e) => setSelectedSize(e.target.value)}
          className="text-xl border-2 border-black px-2 py-1 w-full text-left cursor-pointer"
          name="sizes"
          id="sizes"
          required
        >
          <option value="">Choose a size</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </select>
      </fieldset>
      <div className="p-2"></div>
      <button
        className="p-2 font-bold bg-black text-amber-500 text-xl w-full hover:opacity-80"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
