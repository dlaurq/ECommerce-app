import { Color, PrismaClient, Size } from "@prisma/client";

const prisma = new PrismaClient()

const sizes = ["40", "41", "42", "42.5", "43", "44", "45"]
const colors = ["white", "red"]



async function main() {

    const sizesData:Array<Size> = []
    const colorsData:Array<Color> = []
    

    sizes.forEach(async (size, index ) => {
        const sizeData = await prisma.size.upsert({
            where: {name: size},
            update: {},
            create: {
                name: size
            }
        })

        sizesData.push(sizeData)
    })

    colors.forEach(async (color, index) => {
        const colorData = await prisma.color.upsert({
            where: {name: color},
            update: {},
            create: {
                name: color
            }
        })

        colorsData.push(colorData)
    })

    const product1 = await prisma.product.upsert({
        where: { name: "Air Force 1", },
        update: {},
        create: {
            name: "Air Force 1",
            featured: true,
            price: 100,
            sale: 150,
            description: "f tare",
            images: {
                create: [
                    {
                        name: "af1-img1",
                        url: "af1-img1.webp"
                    },
                    {
                        name: "af1-img2",
                        url: "af1-img2.webp"
                    },
                ]
            }
        }
    })

    const product2 = await prisma.product.upsert({
        where: { name: "Air Jordan 1 High Chicago", },
        update: {},
        create: {
            name: "Air Jordan 1 High Chicago",
            featured: true,
            price: 200,
            sale: 250,
            description: "f tare tare",
            images: {
                create: [
                    {
                        name: "aj1-chic-img1",
                        url: "aj1-chic-img1.webp"
                    },
                    {
                        name: "aj1-chic-img2",
                        url: "aj1-chic-img2.webp"
                    },
                ]
            }
        }
    })

    const sizeProductRelation1 = await prisma.productSizeQuantity.upsert({
        where: { id: 1},
        update: {},
        create: {
            productId: product1.id,
            sizeId: sizesData[0].id,
            quantity: 3,
        }
    })
    const sizeProductRelation2 = await prisma.productSizeQuantity.upsert({
        where: { id: 2},
        update: {},
        create: {
            productId: product1.id,
            sizeId: sizesData[1].id,
            quantity: 3
        }
    })
    const sizeProductRelation3 = await prisma.productSizeQuantity.upsert({
        where: { id: 3},
        update: {},
        create: {
            productId: product1.id,
            sizeId: sizesData[2].id,
            quantity: 3
        }
    })
    const sizeProductRelation4 = await prisma.productSizeQuantity.upsert({
        where: { id: 4},
        update: {},
        create: {
            productId: product2.id,
            sizeId: sizesData[0].id,
            quantity: 3
        }
    })

    const colorProductRelation1 = await prisma.productColors.upsert({
        where: {id: 1},
        update: {},
        create: {
            colorId: colorsData[0].id,
            productId: product1.id,
        }
    })

    const colorProductRelation2 = await prisma.productColors.upsert({
        where: {id: 2},
        update: {},
        create: {
            colorId: colorsData[1].id,
            productId: product2.id,
        }
    })
    
}

main()
    .then(() => prisma.$disconnect)
    .catch(async (e) => { 
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })