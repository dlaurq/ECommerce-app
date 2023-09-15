import prisma from "./prisma"

export async function getAllProducts(where = {}) {
    const res = await prisma.product.findMany({
        where: where,
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
        },
        orderBy: {
            name: "asc"
        }
    })
    return res
}

export async function getAllFeaturedProducts() {
    const res = await prisma.product.findMany({
        where: {
            featured: true
        },
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
    })
    return res
}

export async function getProductById(id: string){
    const res = await prisma.product.findFirst({
        where: {id: parseInt(id)},
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
    })

    return res
}

export async function postProductToCart({userId, productId, sizeId}: {userId: string, productId: string, sizeId: string}) {

    const cart = await prisma.cart.upsert({
        where: {
            userId: userId
        },
        update: {},
        create: {
            userId: userId
        }
    })

    const cartProduct = await prisma.cartProduct.findFirst({
        where: {
            productId: parseInt(productId),
            sizeId: parseInt(sizeId)
        }
    })

    if(cartProduct){
        const res = await prisma.cartProduct.update({
            where: {
                id: cartProduct.id
            },
            data: {
                quantity: cartProduct.quantity! + 1
            }
        })

        return {message: 'update'}
    }

    const res = await prisma.cartProduct.create({
        data:{
            cartId: cart.id,
            productId: parseInt(productId),
            sizeId: parseInt(sizeId),
            quantity: 1
        }
    })

    return {message: 'create'}
}


export async function getCartProductsByUser({userId}: {userId: string}){

    const cart = await prisma.cart.findFirst({
        where: {
            userId: userId
        }
    })

    if(!cart) return

    const res = await prisma.cartProduct.findMany({
        where: {
            cartId: {
                equals: cart.id
            }
        },
        include:{
            products: {
                include: {
                    images: true,
                }
            },
            size:true
            
        },
        orderBy: {
            products: {
                name: "asc"
            }
        }
    })

    return res
}

export async function deleteCartProductById({id}: {id: number}){

    const res = await prisma.cartProduct.delete({
        where: {
            id: id
        }
    })

    return {message: 'ok'}
}

export async function updateCartProductQuantity({id, quantity}: {id: number, quantity: number}){

    const res = await prisma.cartProduct.update({
        where:{
            id: id
        },
        data: {
            quantity: quantity
        }
    })

    return {message: 'ok'}
}