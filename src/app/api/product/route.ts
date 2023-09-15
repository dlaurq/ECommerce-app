import { deleteCartProductById, postProductToCart, updateCartProductQuantity } from '@/app/lib/product'
import { NextResponse } from 'next/server'

type PostBody = {userId: string, productId: string, sizeId: string}
type DeleteBody = {id: number}
type PutBody = {id: number, quantity: number}

export async function POST(request: Request) {
  const data: PostBody = await request.json()
  
  const res = await postProductToCart(data)
 
  return NextResponse.json(res)
  
}

export async function DELETE(request: Request) {
  const data: DeleteBody = await request.json()
  
  const res = await deleteCartProductById(data)
 
  return NextResponse.json(res)
  
}

export async function PUT(request: Request){
  const data: PutBody = await request.json()
  
  const res = await updateCartProductQuantity(data)
 
  return NextResponse.json(res)
}