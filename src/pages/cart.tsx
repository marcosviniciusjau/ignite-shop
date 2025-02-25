import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "./cart-entry";
import { Button } from "@/styles/pages/cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CartContainer } from "@/styles/pages/cart-entry";

export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const { removeItem, cartDetails, clearCart, totalPrice } = useShoppingCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Carregando carrinho...</div>;
  }
  //const quantity = cartDetails.map((item)=> item.quantity)
  //console.log(quantity)
  // Criar array com todos os produtos formatados corretamente
  const cartItems = Object.values(cartDetails ?? {}).map((entry) => ({
    id: entry.id,
    name: entry.name,
    price: entry.price, // Total por item
    quantity: entry.quantity,
    image: entry.imageUrl,
  }))
  async function handleBuyAllProducts() {
    if (cartItems.length === 0) {
      alert("Carrinho vazio!");
      return;
    }

    try {
      const productIds = cartItems.map((item) => item.id);

      const quantities = cartItems.map((item) => item.quantity);
      const products = await Promise.all(
        productIds.map(async (productId) => {
          return await stripe.products.retrieve(productId, {
            expand: ["default_price"],
          });
        })
      );
      const prices = products.map((product) => product.default_price);
      const priceIds = prices.map((price) => price.id);
      const response = await axios.post("/api/checkout", {
        priceId: priceIds.map((item) => item),
        quantity: quantities.map((item) => item),
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl; // Redirecionar para o Stripe Checkout
    } catch (err) {
      console.error("Erro ao processar o checkout:", err);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <CartContainer>
      <h2>Carrinho</h2>
      <p>
        Total:{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(totalPrice)}
      </p>
      <br />
      {cartItems.length === 0 ? <p>O carrinho está vazio.</p> : null}
      {cartItems.length > 0 && (
        <>
          <Button onClick={() => clearCart()}>Limpar carrinho</Button>

          <br />
          <Button onClick={handleBuyAllProducts}>Comprar tudo</Button>
          {cartItems.map((entry) => (
            <CartEntry
              key={entry.id}
              entry={entry}
              removeItem={removeItem}
              totalPrice={totalPrice}
            />
          ))}
        </>
      )}
    </CartContainer>
  );
}
