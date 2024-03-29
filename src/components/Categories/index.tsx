import { useEffect, useState } from "react";
import { Text } from "../Text";
import axios from "axios";
import { FlatList, View } from "react-native";
import { Category, Icon } from "./styles";

export function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://fakestoreapi.com/products/categories")
            .then((res) => {
                setCategories(res.data);
                console.log(res.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <Category>
            <Icon>
                <Text>{item}</Text>
            </Icon>
        </Category>
    );

    return (
        <>
            {loading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : null}

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(element) => element.id}
                renderItem={renderItem}
            />
        </>
    );
}
