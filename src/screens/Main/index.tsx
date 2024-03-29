import { useState } from "react";
import { Cart } from "../../components/Cart";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { Products } from "../../components/Products";
import { ICartItem } from "../../components/types/CartItem";
import {
    CatalogContainer,
    CategoriesContainer,
    Container,
    Footer,
    FooterContainer,
} from "./styles";

export function Main() {
    const [cartItems, setCartItems] = useState<ICartItem[]>([
        {
            quantity: 1,
            product: {
                id: "1",
                title: "Camiseta",
                price: 49.9,
                image: "https://source.unsplash.com/random",
                description: "",
                category: "",
                rating: {
                    rate: 0,
                    count: 0,
                },
            },
        },
        {
            quantity: 1,
            product: {
                id: "2",
                title: "Camiseta",
                price: 49.9,
                image: "https://source.unsplash.com/random",
                description: "",
                category: "",
                rating: {
                    rate: 0,
                    count: 0,
                },
            },
        },
        {
            quantity: 1,
            product: {
                id: "3",
                title: "Camiseta",
                price: 49.9,
                image: "https://source.unsplash.com/random",
                description: "",
                category: "",
                rating: {
                    rate: 0,
                    count: 0,
                },
            },
        },
        {
            quantity: 1,
            product: {
                id: "4",
                title: "Camiseta",
                price: 49.9,
                image: "https://source.unsplash.com/random",
                description: "",
                category: "",
                rating: {
                    rate: 0,
                    count: 0,
                },
            },
        },
        {
            quantity: 1,
            product: {
                id: "5",
                title: "Camiseta",
                price: 49.9,
                image: "https://source.unsplash.com/random",
                description: "",
                category: "",
                rating: {
                    rate: 0,
                    count: 0,
                },
            },
        },
    ]);

    return (
        <>
            <Container>
                <Header></Header>

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>
                <CatalogContainer>
                    <Products />
                </CatalogContainer>
            </Container>
            <Footer>
                <FooterContainer>
                    <Cart cartItems={cartItems} />
                </FooterContainer>
            </Footer>
        </>
    );
}
