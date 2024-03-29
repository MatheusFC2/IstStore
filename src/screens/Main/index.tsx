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
import { IProduct } from "../../components/types/Product";

export function Main() {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    function handleAddToCart(product: IProduct) {
        // Essa função vai verificar se o produto já está no carrinho e se estiver ele vai somar 1 na quantidade
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItems) => cartItems.product.id === product.id
            );

            if (itemIndex < 0) {
                return prevState.concat({ product, quantity: 1 });
            }
            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1,
            };
            return newCartItems;
        });
    }

    function handleDecrementCartItem(product: IProduct) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItems) => cartItems.product.id === product.id
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if (item.quantity === 1) {
                const newCartItems = [...prevState];
                newCartItems.splice(itemIndex, 1);
                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1,
            };

            return newCartItems;
        });
    }

    return (
        <>
            <Container>
                <Header></Header>

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>
                <CatalogContainer>
                    <Products onAddToCart={handleAddToCart} />
                </CatalogContainer>
            </Container>
            <Footer>
                <FooterContainer>
                    <Cart
                        cartItems={cartItems}
                        onAdd={handleAddToCart}
                        onDecrement={handleDecrementCartItem}
                    />
                </FooterContainer>
            </Footer>
        </>
    );
}
