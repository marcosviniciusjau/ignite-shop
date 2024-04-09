import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            price: ID
        ]
    })
}