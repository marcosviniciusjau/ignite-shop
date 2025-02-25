import { Button, HomeContainer, Product, Input } from "@/styles/pages/home";
import Link from "next/link";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import { Product as Products } from "use-shopping-cart/core";
import { useState } from "react";
interface ProductsTableProps {
  products: Products[];
}


export function ProductsTable({ products }: ProductsTableProps) {
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const [isSearching, setIsSearching] = useState(true);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(products);


  return (
    
    <HomeContainer ref={sliderRef} className="keen-slider">
  
      {products.map((product) => {
        return (
          <Link
            href={`/products/${product.description}`}
            key={product.description}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={400} height={400} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>A partir de {product.price}</span>

                <Button>Selecionar</Button>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeContainer>
  );
}
