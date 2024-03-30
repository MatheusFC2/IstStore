import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { Category, Icon } from "./styles";

export function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://fakestoreapi.com/products/categories")
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
                .get(
                    `https://fakestoreapi.com/products/category/${selectedCategory}`
                )
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false));
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const renderItem = ({ item }) => (
        <Category>
            <TouchableOpacity onPress={() => handleCategorySelect(item)}>
                <Icon>
                    <Text>{item}</Text>
                </Icon>
            </TouchableOpacity>
        </Category>
    );

    return (
        <View>
            {loading && (
                <View>
                    <Text>Loading...</Text>
                </View>
            )}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={renderItem}
            />
        </View>
    );
}
