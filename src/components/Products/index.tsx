import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
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
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
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
        setLoadingCategories(true);
        axios
            .get<string[]>("https://fakestoreapi.com/products/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoadingCategories(false));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setLoadingProducts(true);
            axios
                .get<IProduct[]>(
                    `https://fakestoreapi.com/products/category/${selectedCategory}`
                )
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoadingProducts(false));
        } else {
            setLoadingProducts(true);
            axios
                .get<IProduct[]>("https://fakestoreapi.com/products")
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoadingProducts(false));
        }
    }, [selectedCategory]);

    function handleCategorySelect(category: string) {
        setSelectedCategory((prevCategory) =>
            prevCategory === category ? null : category
        );
    }

    function handleOpenProductDetails(product: IProduct) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setSelectedProduct(null);
    }

    return (
        <View>
            {loadingCategories && (
                <View>
                    <ActivityIndicator size="large" />
                    <Text>Loading Categories...</Text>
                </View>
            )}
            {loadingProducts && (
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <ActivityIndicator size="large" />
                    <Text>Loading Products...</Text>
                </View>
            )}
            {!loadingCategories && (
                <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                />
            )}
            {!loadingProducts && (
                <>
                    <ProductsModal
                        visible={isModalVisible}
                        onClose={handleCloseModal}
                        product={selectedProduct as IProduct}
                        onAddToCart={onAddToCart}
                    />
                    <FlatList
                        data={products}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleOpenProductDetails(item)}
                            >
                                <ProductItem
                                    product={item}
                                    onAddToCart={onAddToCart}
                                    onOpenModal={handleOpenProductDetails}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    );
}
