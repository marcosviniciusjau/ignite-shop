import {
  Product,
  CartActions,
  CartEntry as ICartEntry,
} from "use-shopping-cart/core";
import { formatCurrencyString } from "use-shopping-cart";
import { Button, BuyButton, CartContainer } from "@/styles/pages/cart-entry";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
export function CartEntry({
  entry,
  totalPrice,
  removeItem,
}: {
  entry: ICartEntry;
  removeItem: CartActions["removeItem"];
  totalPrice: number;
}) {
  useEffect(() => {
    entry;
  }, [entry]);
  console.log(entry);
  // Calcular o total em centavos
  const total = entry.price * entry.quantity;

  return (
    <>
      <CartContainer>
        <h3>{entry.name}</h3>
        {entry.image ? (
          <Image
            width={100}
            height={100}
            src={entry.image}
            alt={entry.description}
          />
        ) : null}
        <p>
          {entry.quantity} x{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(entry.price)}{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </p>
        <Button onClick={() => removeItem(entry.id)}>
          Remover do carrinho
        </Button>
      </CartContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_MHbQ8Xs9nQr5CJ",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 2,
  };
};
