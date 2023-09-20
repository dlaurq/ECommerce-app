import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

type Data = { userId: string };

export async function POST(request: Request) {
  //console.log();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-08-16",
  });

  const data: Data = await request.json();

  const userId = data.userId;

  const cart = await prisma.cart.findFirst({ where: { userId: userId } });

  const products = await prisma.product.findMany();

  if (!cart) return NextResponse.json({ message: "cart not found" });

  const cartProducts = await prisma.cartProduct.findMany({
    where: {
      cartId: cart.id,
    },
  });

  const line_items = cartProducts.map((item) => {
    const quantity: number = item.quantity!;
    const price = products.filter((product) => product.id === item.productId);
    return { quantity: quantity, price: price[0].stripeId };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: request.headers.get("origin")!,
    cancel_url: request.headers.get("origin")!,
  });

  return NextResponse.json(session);
}
