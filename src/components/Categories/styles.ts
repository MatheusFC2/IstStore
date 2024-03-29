import styled from "styled-components/native";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const Category = styled.TouchableOpacity`
    align-items: center;
    margin-left: 24px;
`;

export const Icon = styled.View`
    background-color: #fff;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    box-shadow: 8px 2px 1px rgba(0, 0, 0, ${isAndroid ? 0.5 : 0.1});
    elevation: 2;
`;
