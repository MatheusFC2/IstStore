import styled from "styled-components/native";

export const Image = styled.ImageBackground`
    width: 100%;
    height: 300px;
    align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    align-items: center;
    jusitfy-content: center;
    margin: 24px;
    padding-top: 2px;
`;

export const ModalBody = styled.View`
    background-color: #fafafa;
    flex: 1;
    padding: 32px 24px 0;
`;

export const Header = styled.View``;

export const Footer = styled.View`
    min-height: 110px;
    background-color: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
    flex-direction: row;
`;

export const PriceContainer = styled.View``;
