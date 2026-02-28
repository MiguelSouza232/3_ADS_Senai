import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

export default function App() {
  const player = useVideoPlayer(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    (player) => {
      player.loop = true;
      // player.play();
    },
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("./assets/SubLogoCelsinho.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.text}>APP Dj Celsinho</Text>
      <Image
        source={require("./assets/Contrate.png")}
        resizeMode="contain"
        style={styles.imagem}
      />
      <StatusBar style="light" animated />

      <VideoView player={player} style={styles.video} allowsPictureInPicture />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  imagem: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 100,
    alignSelf: "center",
  },
  video: {
    width: 300,
    alignSelf: "center",
    height: 275,
    marginTop: 50,
  },
});
