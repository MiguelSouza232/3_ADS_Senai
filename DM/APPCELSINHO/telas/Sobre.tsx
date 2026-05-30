import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Image, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

//Componente de Texto
import Texto from "../componentes/Texto";

export default function Sobre() {
  //Indica o vídeo e coloca ele em loop
  const player = useVideoPlayer(
    require("../assets/SetCelsinho.mp4"),
    (player) => {
      player.loop = true;
      //player.play()
    },
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/CelsinhoGregs.jpg")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/LogoCelsinho.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Texto estiloEspecifico={styles.titulo}>Sobre</Texto>

      <Texto estiloEspecifico={styles.texto}>
        Crescer rodeado por sons e ritmos foi algo mágico. Lembro de tardes
        inteiras ouvindo meu pai mixar músicas, aprendendo a sentir a batida e
        compreender como cada estilo tem sua alma. Aos poucos, fui criando minha
        identidade sonora, explorando produções próprias e arriscando meus
        primeiros sets.
        {"\n"}
        {"\n"}
        Com o tempo, comecei a tocar em pequenas festas, eventos de amigos e até
        mesmo ajudar meu pai em apresentações. A conexão com o público é o que
        mais me motiva a seguir em frente.
        {"\n"}
        {"\n"}
        Atualmente atuo pelas áreas de produção musical, mixagem e performance
        ao vivo. Cada projeto é uma nova oportunidade de criar algo único e
        emocionante. A música é minha paixão e minha missão é compartilhar essa
        energia com o mundo.
        {"\n"}
      </Texto>

      <Image
        source={require("../assets/Contrate.png")}
        style={styles.imagem}
        resizeMode="contain"
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
  logoContainer: {
    width: "100%",
    height: 350,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.4,
  },
  texto: {
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  imagem: {
    height: 350,
    alignSelf: "center",
    marginHorizontal: 16,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'FontePadraoBold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    zIndex: 1,
  },
  video: {
    width: 350,
    height: 195,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});
