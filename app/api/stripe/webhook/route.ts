import Stripe from 'stripe'

import {
  handleProcessWebhookUpdatedSubscription,
  stripe,
} from '@/services/stripe'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()

  // Aguarde a promise ser resolvida antes de acessar o método 'get'
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature') as string

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleProcessWebhookUpdatedSubscription(event.data)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response('{ "received": true }', { status: 200 })
}