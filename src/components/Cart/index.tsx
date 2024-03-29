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

interface CartProps {
    cartItems: ICartItem[];
}

export function Cart({ cartItems }: CartProps) {
    return (
        <>
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
                                    {formatCurrency(cartItems.product.price)}
                                </Text>
                            </ProductDetails>
                        </ProductContainer>
                        <Actions>
                            <TouchableOpacity style={{ marginRight: 24 }}>
                                <PlusCircle />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MinusCircle />
                            </TouchableOpacity>
                        </Actions>
                    </ItemContainer>
                )}
            />
            <Summary>
                <TotalContainer>
                    <Text color="#666">Total</Text>
                    <Text size={20} weight="600">
                        {formatCurrency(20)}
                    </Text>
                </TotalContainer>
                <Button onPress={() => alert("Pedido Confirmado")}>
                    Confirmar Pedido
                </Button>
            </Summary>
        </>
    );
}
