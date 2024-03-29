import { Text } from "../Text";
import * as S from "./styles";

export function Header() {
    return (
        <S.Container>
            <Text size={14} opacity={0.9}>
                Bem vindo(a) ao
            </Text>
            <Text size={24} weight="600" color="#FF6503">
                Ist
                <Text size={24} color="#FF6503">
                    Store
                </Text>
            </Text>
        </S.Container>
    );
}
