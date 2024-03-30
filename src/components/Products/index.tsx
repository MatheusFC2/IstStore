import { FlatList, View } from "react-native";
// import { Text as RNText } from "react-native";
import { Text } from "../Text";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { ProductsModal } from "../ProductsModal";
import { IProduct } from "../types/Product";
import * as S from "./styles";
import { PlusCircle } from "../Icons/PlusCircle";

interface ProductsProps {
    onAddToCart: (product: IProduct) => void;
}

export function Products({ onAddToCart }: ProductsProps) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );

    function handleOpenModal(product: IProduct) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <S.Product onPress={() => handleOpenModal(item)}>
            <S.ProductImage
                source={{ uri: item.image }}
                style={{ height: 120, width: 150 }}
            />
            <S.ProductDetails>
                <Text size={15} weight="600">
                    {item.title}
                </Text>
                <Text size={12} numberOfLines={3}>
                    {item.description}
                </Text>
                <Text weight="600">{formatCurrency(item.price)}</Text>
            </S.ProductDetails>
            <S.AddToCartBtn onPress={() => onAddToCart(item)}>
                <PlusCircle />
            </S.AddToCartBtn>
        </S.Product>
    );

    return (
        <>
            {loading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : null}
            <ProductsModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct as IProduct}
                onAddToCart={onAddToCart}
            />
            <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(products) => products.id}
                renderItem={renderItem}
            />
        </>
    );
}
