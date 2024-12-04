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


  },
}
