import Stripe from "stripe";

const stripeSecretKey = 'sk_test_51P1uUREeodiRobHQ7RpyExNDlKQCqfWQdxw3BBBv2GbE15C1NHQckrs8AR4VjBr1wkOzoDh06TaYmcdyEYBiFdkX00JO6SQ1yF';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: 'Pizza Shop',
  }
})