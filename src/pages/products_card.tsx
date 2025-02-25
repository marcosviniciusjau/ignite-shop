import { Button, HomeContainer, Product } from "@/styles/pages/home";
import Link from "next/link";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import { CartActions } from "use-shopping-cart";
import { Product as Products } from "use-shopping-cart/core";

import { formatCurrencyString } from "use-shopping-cart";
import { useState } from "react";
interface ProductsCardsProps {
  products: Products[];
  addItem: CartActions["addItem"];
}

export function ProductsCard({ products, addItem }: ProductsCardsProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  function selectPizza(isChecked: boolean, productId: string) {
    setSelectedProducts((prev) =>
      isChecked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  }

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {selectedProducts.length < 2
        ? products.map((product) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <>
                <Product className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    width={400}
                    height={400}
                    alt=""
                  />

                  <footer>
                    <strong>{product.name}</strong>

                    <input
                      type="checkbox"
                      name={product.name}
                      id={product.id}
                      onChange={(e) =>
                        selectPizza(e.target.checked, product.id)
                      }
                    />
                    <span>
                      A partir de{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>

                    <Button
                      onClick={() => addItem(product)}
                      aria-label={`Add one ${product.name} to your cart.`}
                    >
                      Adicionar no carrinho
                    </Button>
                  </footer>
                </Product>
              </>
            );
          })
        : products.map((product) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <>
                <Product
                  className="keen-slider__slide"
                  disabled={!selectedProducts.includes(product.id)}
                >
                  <Image
                    src={product.imageUrl}
                    width={400}
                    height={400}
                    alt=""
                  />

                  <footer>
                    <strong>{product.name}</strong>

                    <input
                      type="checkbox"
                      name={product.name}
                      id={product.id}
                      disabled={!selectedProducts.includes(product.id)}
                      onChange={(e) =>
                        selectPizza(e.target.checked, product.id)
                      }
                    />
                    <span>
                      A partir de{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>

                    <Button
                      onClick={() => addItem(product)}
                      disabled={!selectedProducts.includes(product.id)}
                      aria-label={`Add one ${product.name} to your cart.`}
                    >
                      Adicionar no carrinho
                    </Button>
                  </footer>
                </Product>
              </>
            );
          })}
    </HomeContainer>
  );
}
