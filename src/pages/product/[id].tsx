import { useRouter } from "next/router";
import { ImageContainer,ProductContainer, ProductDetails } from "@/styles/pages/product";

export default function Product() {
    const { query } = useRouter();
    return (
        <ProductContainer>
            <ImageContainer>
            </ImageContainer>
            <ProductDetails>
                <h1>Camiseta x</h1>
                <span>R$ 79,90</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut earum odio dignissimos sint quidem numquam aperiam laboriosam unde voluptatem sunt aut doloremque, quaerat ipsam aspernatur officia necessitatibus? Sit, pariatur laboriosam.</p>
                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    );
}