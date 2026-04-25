import { Text, StyleSheet } from "react-native";

export default function Texto({children, estiloEspecifico}: any){
    return <Text style={[estilos.padrao, estiloEspecifico]}>{children}</Text>
}

const estilos=StyleSheet.create({
    padrao: {
        fontFamily: 'FontePadrao',
        fontSize: 18,
        textAlign: "center",
        lineHeight: 30,
    }
})