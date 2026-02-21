import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/SubLogoCelsinho.png')} resizeMode="contain" style={styles.logo}/>
      <Text style={styles.text}>APP Dj Celsinho</Text>
      <Image source={require('./assets/Contrate.png')} resizeMode="contain" style={styles.imagem}/>
      <StatusBar style="light" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  imagem: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
});
