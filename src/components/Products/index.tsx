import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import { Text } from "../Text";
import { ProductsModal } from "../ProductsModal";
import { Categories } from "../Categories";
import { ProductItem } from "../ProductItem";
import { IProduct } from "../types/Product";

interface ProductsProps {
    onAddToCart: (product: IProduct) => void;
}

export function Products({ onAddToCart }: ProductsProps) {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get<string[]>("https://fakestoreapi.com/products/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            axios
                .get<IProduct[]>(
                    `https://fakestoreapi.com/products/category/${selectedCategory}`
                )
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false));
        } else {
            // Carregar todos os produtos quando nenhuma categoria for selecionada
            setLoading(true);
            axios
                .get<IProduct[]>("https://fakestoreapi.com/products")
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false));
        }
    }, [selectedCategory]);

    function handleCategorySelect(category: string) {
        // Se a categoria clicada for a mesma que já está selecionada, desmarque-a
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? null : category
        );
    }

    function handleOpenModal(product: IProduct) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    return (
        <View>
            {loading && (
                <View>
                    <Text>Loading...</Text>
                </View>
            )}
            <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />
            <ProductsModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct as IProduct}
                onAddToCart={onAddToCart}
            />
            <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductItem
                        product={item}
                        onOpenModal={handleOpenModal}
                        onAddToCart={onAddToCart}
                    />
                )}
            />
        </View>
    );
}
