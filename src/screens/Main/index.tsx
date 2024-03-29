import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { Products } from "../../components/Products";
import {
    CatalogContainer,
    CategoriesContainer,
    Container,
    Footer,
} from "./styles";

export function Main() {
    return (
        <>
            <Container>
                <Header></Header>

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>
                <CatalogContainer>
                    <Products />
                </CatalogContainer>
            </Container>
            <Footer></Footer>
        </>
    );
}
