import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { ProductsModal } from "../ProductsModal";
import { IProduct } from "../types/Product";
import { Button } from "../Button";

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
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 120, width: 150 }}
                />
            </View>
            <View>
                <Text size={12} weight="600">
                    {item.title}
                </Text>
                <Text size={10}>{item.description}</Text>
                <Text weight="600">{formatCurrency(item.price)}</Text>
                <Button onPress={() => onAddToCart(item)}>
                    Adicionar ao carrinho
                </Button>
            </View>
        </TouchableOpacity>
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
