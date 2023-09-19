import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={`/shoes/${id}`} className="group">
      <section className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          src={img}
          alt={title}
          width={500}
          height={500}
          sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
        />
      </section>
      <h3 className="mt-1 text-lg font-medium text-gray-900">{title}</h3>
      <p>
        {" "}
        <span>{price}$</span>{" "}
        <span className="line-through text-red-600">{sale}$</span>
      </p>
    </Link>
  );
}
