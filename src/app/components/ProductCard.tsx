"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({
  img,
  title,
  price,
  sale,
  id,
}: {
  img: string;
  title: string;
  price: number;
  sale: number;
  id: string | number;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shoes/${id}`);
  };

  return (
    <section>
      <section
        onClick={handleClick}
        className="cursor-pointer hover:underline hover:opacity-80 w-fit"
      >
        <section className="">
          <Image
            className="aspect-square object-cover w-auto h-32 sm:h-64 "
            src={img}
            alt={title}
            width={500}
            height={500}
            sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
          />
        </section>
        <p className="break-words">{title}</p>
        <p>
          {" "}
          <span>{price}$</span>{" "}
          <span className="line-through text-red-600">{sale}$</span>
        </p>
      </section>
    </section>
  );
}
