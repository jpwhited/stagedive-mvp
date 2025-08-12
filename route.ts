import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
});

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const buf = await request.arrayBuffer();
  const body = Buffer.from(buf);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || '',
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const listingId = session.metadata?.listingId;
    if (listingId && session.payment_status === 'paid') {
      // mark listing as sold and create order
      await prisma.listing.update({ where: { id: listingId }, data: { status: 'SOLD' } });
      await prisma.order.create({
        data: {
          buyerId: session.customer_email || '',
          listingId,
          status: 'PAID',
        },
      });
    }
  }
  return new NextResponse('Received', { status: 200 });
}