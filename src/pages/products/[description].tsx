import { Button, HomeContainer, Input, Product } from "@/styles/pages/home";

import { GetStaticProps } from "next";

import { useKeenSlider } from "keen-slider/react";
import Stripe from "stripe";
import { CartActions, useShoppingCart } from "use-shopping-cart";
import { stripe } from "@/lib/stripe";
import { ProductsCard } from "../products_card";

import { Product as Products } from "use-shopping-cart/core";
import { useState, useEffect } from "react";
interface ProductsCardsProps {
  products: Products[];
  addItem: CartActions["addItem"];
}

export default function Products({ products }: ProductsCardsProps) {
  const { removeItem, cartDetails, clearCart, totalPrice } = useShoppingCart();
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const [isSearching, setIsSearching] = useState(true);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(products);
  const cart = useShoppingCart();
  const { addItem } = cart;

  function getName(search: string) {
    if (search.trim() === "") {
      setProduct(products);
      setIsSearching(true);
    } else {
      const filtrado = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      setProduct(filtrado);
      setIsSearching(false);
    }
  }

  useEffect(() => {
    if (sliderInstance.current && isSearching) {
      sliderInstance.current.update();
    }
  }, [isSearching, sliderInstance]);

  return (
    <>
      <div className="flex">
        <Input
          type="search"
          placeholder="Busque um produto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getName(e.target.value);
          }}
          required
        />
        <Button type="submit" onClick={() => getName(search)}>
          🔎
        </Button>
      </div>

      {product.length > 0 ? (
        isSearching ? (
          <HomeContainer ref={sliderRef} className="keen-slider">
            <ProductsCard products={products} addItem={addItem} />
          </HomeContainer>
        ) : (
          // Renderiza sem o slider ao fazer uma busca
          <div className="products-container">
            <ProductsCard products={product} addItem={addItem} />
          </div>
        )
      ) : (
        <p>Produto não encontrado</p>
      )}
      <hr
        style={{
          background: "grey",
          height: 1,
          width: "100%",
          maxWidth: "20rem",
        }}
      />
    </>
  );
}

export const getServerSideProps: GetStaticProps<
  any,
  { description: string }
> = async ({ params }) => {
  const description = params.description;

  const response = await stripe.products.search({
    query: `name:'${description}'`,
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    //const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: product.default_price.unit_amount / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
