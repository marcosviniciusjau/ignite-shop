import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { priceId, quantity } = req.body;

    // Verifica se os valores recebidos são arrays
    if (!Array.isArray(priceId) || !Array.isArray(quantity) || priceId.length !== quantity.length) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelURL = `${process.env.NEXT_URL}/`;

    try {
        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: successURL,
            cancel_url: cancelURL,
            mode: "payment",
            line_items: priceId.map((id, index) => ({
                price: id,
                quantity: quantity[index],
            })),
        });

        return res.status(201).json({ checkoutUrl: checkoutSession.url });
    } catch (error) {
        console.error("Erro ao criar checkout:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
