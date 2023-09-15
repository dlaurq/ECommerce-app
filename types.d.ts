import { Prisma } from "@prisma/client"

type Product = Prisma.ProductGetPayload<{
  include:{
    images: true,
    productColors: {
        include: {
            Color: true
        }
    },
    productSizeQuantity: {
        include: {
            Size: true
        }
    }
  }
}>


type CartProduct = Prisma.CartProductGetPayload<{
  include:{
    products: {
        include: {
            images: true,
        }
    },
    size:true
  }
}>