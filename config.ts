export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        name: 'free',
        priceId: 'price_1PcrlNKOsHNcKX48d9vdJsUY',
        quota: {
          PETS: 1,
        },
      },
      pro: {
        name: 'pro',
        priceId: 'price_1PcrkgKOsHNcKX48rjpErPNw',
        quota: {
          PETS: 10,
        },
      },

    },
    products: {
      tag: {
        name: 'Tag NFC',
        priceId: 'price_1PpDo1KOsHNcKX48fNz4mfNm', // Coloque aqui o ID do preço do produto no Stripe
        unitAmount: 1990, // Preço da Tag NFC (ex: R$19,90 em centavos)
        currency: 'brl', // Moeda
      },
    }

  },
}
