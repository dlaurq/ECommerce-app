import { Color, PrismaClient, Product, Size } from "@prisma/client";

const prisma = new PrismaClient();

const sizes = [
  "36",
  "37",
  "37.5",
  "38",
  "39",
  "39.5",
  "40",
  "40.5",
  "41",
  "42",
  "42.5",
  "43",
  "44",
  "44.5",
  "45",
];
const colors = [
  "white",
  "red",
  "black",
  "gray",
  "yellow",
  "navy",
  "light gray",
  "green",
];
const products = [
  {
    name: "Air Force 1 White",
    featured: true,
    price: 100,
    sale: 250,
    description: "f tare tare",
    stripeId: "price_1NrfCALpGFYJuDQdOQEb2mKb",
    images: {
      create: [
        {
          name: "AirForce1White1",
          url: "AirForce1White1.webp",
        },
        {
          name: "AirForce1White2",
          url: "AirForce1White2.webp",
        },
        {
          name: "AirForce1White3",
          url: "AirForce1White3.webp",
        },
      ],
    },
  },
  {
    name: "Air Force 1 Black",
    featured: false,
    price: 110,
    sale: 230,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "AirForce1Black1",
          url: "AirForce1Black1.webp",
        },
        {
          name: "AirForce1Black2",
          url: "AirForce1Black2.webp",
        },
        {
          name: "AirForce1Black3",
          url: "AirForce1Black3.webp",
        },
      ],
    },
  },
  {
    name: "Dunk Low Red/Gray",
    featured: false,
    price: 150,
    sale: 250,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "DunkLowRedGray1",
          url: "DunkLowRedGray1.webp",
        },
        {
          name: "DunkLowRedGray2",
          url: "DunkLowRedGray2.webp",
        },
        {
          name: "DunkLowRedGray3",
          url: "DunkLowRedGray3.webp",
        },
      ],
    },
  },
  {
    name: "Superstars White",
    featured: false,
    price: 90,
    sale: 120,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "SuperstarsWhite1",
          url: "SuperstarsWhite1.webp",
        },
        {
          name: "SuperstarsWhite2",
          url: "SuperstarsWhite2.webp",
        },
        {
          name: "SuperstarsWhite3",
          url: "SuperstarsWhite3.webp",
        },
      ],
    },
  },
  {
    name: "Vans Old Skool",
    featured: false,
    price: 60,
    sale: 100,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "VansOldSkool1",
          url: "VansOldSkool1.webp",
        },
        {
          name: "VansOldSkool2",
          url: "VansOldSkool2.webp",
        },
        {
          name: "VansOldSkool3",
          url: "VansOldSkool3.webp",
        },
      ],
    },
  },
  {
    name: "Vans Old Skool Flame",
    featured: true,
    price: 70,
    sale: 110,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "VansOldSkoolFlame1",
          url: "VansOldSkoolFlame1.webp",
        },
        {
          name: "VansOldSkoolFlame2",
          url: "VansOldSkoolFlame2.webp",
        },
        {
          name: "VansOldSkoolFlame3",
          url: "VansOldSkoolFlame3.webp",
        },
      ],
    },
  },
  {
    name: "Converse Chuck Taylor All Star High",
    featured: true,
    price: 70,
    sale: 110,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "ConverseChuckTaylorAllStarHigh1",
          url: "ConverseChuckTaylorAllStarHigh1.webp",
        },
        {
          name: "ConverseChuckTaylorAllStarHigh2",
          url: "ConverseChuckTaylorAllStarHigh2.webp",
        },
        {
          name: "ConverseChuckTaylorAllStarHigh3",
          url: "ConverseChuckTaylorAllStarHigh3.webp",
        },
      ],
    },
  },
  {
    name: "Ultra Boost 22 White",
    featured: true,
    price: 200,
    sale: 340,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "UltraBoost22White1",
          url: "UltraBoost22White1.webp",
        },
        {
          name: "UltraBoost22White2",
          url: "UltraBoost22White2.webp",
        },
        {
          name: "UltraBoost22White3",
          url: "UltraBoost22White3.webp",
        },
      ],
    },
  },
  {
    name: "Ultra Boost 22 Black",
    featured: true,
    price: 190,
    sale: 330,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "UltraBoost22Black1",
          url: "UltraBoost22Black1.webp",
        },
        {
          name: "UltraBoost22Black2",
          url: "UltraBoost22Black2.webp",
        },
        {
          name: "UltraBoost22Black3",
          url: "UltraBoost22Black3.webp",
        },
      ],
    },
  },
  {
    name: "Adidas Adilette 22 Green",
    featured: true,
    price: 500,
    sale: 1000,
    description: "f tare tare",
    stripeId: "",
    images: {
      create: [
        {
          name: "AdidasAdilette22Green1",
          url: "AdidasAdilette22Green1.webp",
        },
        {
          name: "AdidasAdilette22Green2",
          url: "AdidasAdilette22Green2.webp",
        },
        {
          name: "AdidasAdilette22Green3",
          url: "AdidasAdilette22Green3.webp",
        },
      ],
    },
  },
];

async function main() {
  const sizesData: Array<Size> = [];
  const colorsData: Array<Color> = [];
  const productsData: Array<Product> = [];

  sizes.forEach(async (size) => {
    const sizeData = await prisma.size.upsert({
      where: { name: size },
      update: {},
      create: {
        name: size,
      },
    });

    sizesData.push(sizeData);
  });

  colors.forEach(async (color) => {
    const colorData = await prisma.color.upsert({
      where: { name: color },
      update: {},
      create: {
        name: color,
      },
    });

    colorsData.push(colorData);
  });

  products.forEach(async (product) => {
    const productData = await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });

    productsData.push(productData);
  });
  /*
  const sizeProductRelation1 = await prisma.productSizeQuantity.upsert({
    where: { id: 1 },
    update: {},
    create: {
      productId: product1.id,
      sizeId: sizesData[0].id,
      quantity: 3,
    },
  });
  const sizeProductRelation2 = await prisma.productSizeQuantity.upsert({
    where: { id: 2 },
    update: {},
    create: {
      productId: product1.id,
      sizeId: sizesData[1].id,
      quantity: 3,
    },
  });
  const sizeProductRelation3 = await prisma.productSizeQuantity.upsert({
    where: { id: 3 },
    update: {},
    create: {
      productId: product1.id,
      sizeId: sizesData[2].id,
      quantity: 3,
    },
  });
  const sizeProductRelation4 = await prisma.productSizeQuantity.upsert({
    where: { id: 4 },
    update: {},
    create: {
      productId: product2.id,
      sizeId: sizesData[0].id,
      quantity: 3,
    },
  });

  const colorProductRelation1 = await prisma.productColors.upsert({
    where: { id: 1 },
    update: {},
    create: {
      colorId: colorsData[0].id,
      productId: product1.id,
    },
  });

  const colorProductRelation2 = await prisma.productColors.upsert({
    where: { id: 2 },
    update: {},
    create: {
      colorId: colorsData[1].id,
      productId: product2.id,
    },
  });
  */
}

main()
  .then(() => prisma.$disconnect)
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
