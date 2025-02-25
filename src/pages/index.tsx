import Head from "next/head";

import "keen-slider/keen-slider.min.css";

import { Search } from "./search";

import { Product as Products } from "use-shopping-cart/core";
import { ProductsTable } from "./products_table";
import { useShoppingCart } from "use-shopping-cart";

export default function Home() {
   
  const products: Products[] = [
    {
      name: "Pizzas médias",
      description: "média",
      price: "39,90",
      imageUrl:
        "https://files.stripe.com/links/MDB8YWNjdF8xUDF1VVJFZW9kaVJvYkhRfGZsX3Rlc3RfM0Q3anFhZmlkUkNBMWVOME4zZHhUamM000ynJiYgL4",
      princingTableId: "prctbl_1QMz35EeodiRobHQsjvfXGn0",
    },
    {
      name: "Pizza queijo",
      description: "descricao",
      price: "39,90",
      imageUrl:
        "https://files.stripe.com/links/MDB8YWNjdF8xUDF1VVJFZW9kaVJvYkhRfGZsX3Rlc3RfRlJHV3lXcXlVTE9OQTNVUVVmY2hGOU12006XpJgrrz",
      princingTableId: "",
    },
  ];

  return (
    <>
      <Head>
        <title>Home | Pizza Shop</title>
      </Head>
      <ProductsTable products={products} />
    </>
  );
}
