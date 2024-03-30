import { Modal } from "react-native";
import { IProduct } from "../types/Product";
import {
    CloseButton,
    Footer,
    FooterContainer,
    Header,
    Image,
    ModalBody,
    PriceContainer,
} from "./styles";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Button } from "../Button";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductsModalProps {
    visible: boolean;
    onClose: () => void;
    product: IProduct;
    onAddToCart: (product: IProduct) => void;
}

export function ProductsModal({
    visible,
    onClose,
    product,
    onAddToCart,
}: ProductsModalProps) {
    if (!product) {
        return null;
    }

    function handleAddToCart() {
        onAddToCart(product!);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Image src={product.image}>
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>
            <ModalBody>
                <Header>
                    <Text size={17} weight="600">
                        {product.title}
                    </Text>
                    <Text color="#666" style={{ marginTop: 12 }}>
                        {product.description}
                    </Text>
                </Header>
            </ModalBody>
            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text>Preço</Text>
                        <Text size={20} weight="600">
                            {formatCurrency(product.price)}
                        </Text>
                    </PriceContainer>
                    <Button onPress={handleAddToCart}>
                        Adicionar ao Carrinhos
                    </Button>
                </FooterContainer>
            </Footer>
        </Modal>
    );
}
