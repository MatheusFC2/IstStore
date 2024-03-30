import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Category, Icon } from "./styles";
import { Text } from "../Text";

interface CategoriesProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string) => void;
}

export function Categories({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoriesProps) {
    const renderCategory = ({ item }: { item: string }) => {
        const isActive = selectedCategory === item;
        return (
            <Category
                style={{
                    opacity: isActive && 1,
                    marginBottom: 10,
                    marginTop: 20,
                }}
            >
                <TouchableOpacity onPress={() => onSelectCategory(item)}>
                    <Icon>
                        <Text
                            style={{
                                fontWeight: isActive ? "bold" : "normal",
                                color: isActive ? "#FF6503" : "#666",
                            }}
                        >
                            {item}
                        </Text>
                    </Icon>
                </TouchableOpacity>
            </Category>
        );
    };

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={renderCategory}
        />
    );
}
