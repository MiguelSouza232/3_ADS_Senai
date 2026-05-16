import { StyleSheet } from "react-native";

const estilosProd = StyleSheet.create({
    corFundo: {
        backgroundColor: "#111111",
        paddingBottom: 50,
    },
    headerContainer: {
        width: "100%",
        height: 350,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    headerLogo: {
        width: 300,
        height: 300,
        alignSelf: "center",
        zIndex: 1,
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginTop: 12,
        textAlign: "center",
    },
    listContent: {
        paddingBottom: 40,
    },
    card: {
        width: "90%",
        marginVertical: 10,
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#6d24ca",
        backgroundColor: "#1b1b1b",
        elevation: 4,
    },
    cardContent: {
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: "#1b1b1b",
    },
    nome: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
    },
    descricao: {
        color: "#d0d0d0",
        fontSize: 16,
        lineHeight: 24,
    },
    cardCover: {
        height: 180,
        backgroundColor: "#2a2a2a",
    },
})

export default estilosProd;