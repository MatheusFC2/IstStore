import React from "react";
import { TouchableOpacity } from "react-native";
import { formatCurrency } from "../../utils/formatCurrency";
import * as S from "./styles";
import { Text } from "../Text";
import { PlusCircle } from "../Icons/PlusCircle";
import { IProduct } from "../types/Product";

interface ProductItemProps {
    product: IProduct;
    onOpenModal: (product: IProduct) => void;
    onAddToCart: (product: IProduct) => void;
}

export function ProductItem({
    product,
    onOpenModal,
    onAddToCart,
}: ProductItemProps) {
    return (
        <TouchableOpacity onPress={() => onOpenModal(product)}>
            <S.Product>
                <S.ProductImage
                    source={{ uri: product.image }}
                    style={{ height: 120, width: 150 }}
                />
                <S.ProductDetails>
                    <Text size={15} weight="600">
                        {product.title}
                    </Text>
                    <Text size={12} numberOfLines={3}>
                        {product.description}
                    </Text>
                    <Text weight="600">{formatCurrency(product.price)}</Text>
                </S.ProductDetails>
                <S.AddToCartBtn onPress={() => onAddToCart(product)}>
                    <PlusCircle />
                </S.AddToCartBtn>
            </S.Product>
        </TouchableOpacity>
    );
}
