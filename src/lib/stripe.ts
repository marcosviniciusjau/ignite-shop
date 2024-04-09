import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'default_secret_key';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: 'Ignite Shop',
  }
})