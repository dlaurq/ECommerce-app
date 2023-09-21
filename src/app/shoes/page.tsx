import Filters from "../components/Filters";
import DisplayProducts from "../components/DisplayProducts";
import Colaps from "../components/Colaps";
import prisma from "../lib/prisma";
import { Color, Size } from "@prisma/client";
import { Product } from "../../../types";
import { getAllProducts } from "../lib/product";
import Sort from "../components/Sort";

const Shoes = async ({
  searchParams,
}: {
  searchParams: { sizes: string; colors: string; orderBy: string };
}) => {
  let where = {};
  let orderBy: {} = { name: "asc" };

  if (searchParams.sizes && searchParams.sizes.length > 0) {
    where = {
      ...where,
      productSizeQuantity: {
        some: {
          Size: {
            name: {
              in: searchParams.sizes?.split(" ").map((size) => size),
            },
          },
        },
      },
    };
  }

  if (searchParams.colors && searchParams.colors.length > 0) {
    where = {
      ...where,
      productColors: {
        some: {
          Color: {
            name: {
              in: searchParams.colors?.split(" ").map((size) => size),
            },
          },
        },
      },
    };
  }

  if (searchParams.orderBy && searchParams.orderBy.length > 0) {
    switch (searchParams.orderBy) {
      case "PrLH":
        orderBy = { price: "asc" };
        break;
      case "PrHL":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { name: "asc" };
    }
  }

  const colorsData = await prisma.color.findMany({ orderBy: { name: "asc" } });
  const sizesData = await prisma.size.findMany({ orderBy: { name: "asc" } });
  const productsData = await getAllProducts(where, orderBy);

  const [colors, sizes, products]: [
    colors: Color[],
    sizes: Size[],
    products: Product[]
  ] = await Promise.all([colorsData, sizesData, productsData]);

  return (
    <main className="md:grid md:grid-cols-5 md:px-3 min-h-[100vh]">
      <Colaps title="Filters">
        <Filters data={sizes} valueKey="sizes" name="sizes" />
        <Filters data={colors} valueKey="colors" name="colors" />
      </Colaps>

      <section className="p-5 max-w-2xl lg:max-w-7xl md:col-span-4">
        <section>
          <Sort />
        </section>
        <section>
          <DisplayProducts products={products} />
        </section>
      </section>
    </main>
  );
};

export default Shoes;
