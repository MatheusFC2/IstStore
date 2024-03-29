import { FlatList, TouchableOpacity } from "react-native";
import { ICartItem } from "../types/CartItem";
import {
    Actions,
    Image,
    ItemContainer,
    ProductContainer,
    ProductDetails,
    QuantityContainer,
    Summary,
    TotalContainer,
} from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { IProduct } from "../types/Product";
import { useState } from "react";
import { ConfirmOrderModal } from "../OrderConfirmModal";

interface CartProps {
    cartItems: ICartItem[];
    onAdd: (product: IProduct) => void;
    onDecrement: (product: IProduct) => void;
    onConfirmOrder: () => void;
}

export function Cart({
    cartItems,
    onAdd,
    onDecrement,
    onConfirmOrder,
}: CartProps) {
    const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
    // Aqui estou calculando o total do carrinho de compras com base nos preços e quantidades
    const total = cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    function handleConfirmOrder() {
        setIsConfirmingOrder(true);
    }
    function handleOk() {
        onConfirmOrder();
        setIsConfirmingOrder(false);
    }

    return (
        <>
            <ConfirmOrderModal visible={isConfirmingOrder} onClose={handleOk} />
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={(cartItem) => cartItem.product.id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItems }) => (
                        <ItemContainer>
                            <ProductContainer>
                                <Image src={cartItems.product.image}></Image>
                                <QuantityContainer>
                                    <Text>{cartItems.quantity}x</Text>
                                </QuantityContainer>
                                <ProductDetails>
                                    <Text size={14} weight="600">
                                        {cartItems.product.title}
                                    </Text>
                                    <Text
                                        size={14}
                                        color="#666"
                                        style={{ marginTop: 4 }}
                                    >
                                        {formatCurrency(
                                            cartItems.product.price
                                        )}
                                    </Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAdd(cartItems.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        onDecrement(cartItems.product)
                                    }
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </ItemContainer>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">
                                {formatCurrency(total)}
                            </Text>
                        </>
                    ) : (
                        <Text color="#999">Seu carrinho está vazio</Text>
                    )}
                </TotalContainer>
                <Button
                    disabled={cartItems.length === 0}
                    onPress={() => handleConfirmOrder()}
                >
                    Confirmar Pedido
                </Button>
            </Summary>
        </>
    );
}
