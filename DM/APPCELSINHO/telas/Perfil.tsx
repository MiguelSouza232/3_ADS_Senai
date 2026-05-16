import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import Texto from "../componentes/Texto";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [savedNome, setSavedNome] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedCelular, setSavedCelular] = useState("");

  const iniciarEdicao = () => {
    setSavedNome(nome);
    setSavedEmail(email);
    setSavedCelular(celular);
    setIsEditing(true);
  };

  const cancelarEdicao = () => {
    setNome(savedNome);
    setEmail(savedEmail);
    setCelular(savedCelular);
    setIsEditing(false);
  };

  const formatarNome = (texto: string) => {
    const formatted = texto
      .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
      .replace(/\s+/g, " ");
    setNome(formatted);
  };

  const formatarEmail = (texto: string) => {
    const formatted = texto.toLowerCase().trim();
    setEmail(formatted);
  };

  const formatarCelular = (texto: string) => {
    const apenas_numeros = texto.replace(/\D/g, "").slice(0, 11);
    let formatted = "";
    if (apenas_numeros.length > 0) {
      formatted = "(" + apenas_numeros.substring(0, 2);
    }
    if (apenas_numeros.length > 2) {
      formatted += ") " + apenas_numeros.substring(2, 7);
    }
    if (apenas_numeros.length > 7) {
      formatted += "-" + apenas_numeros.substring(7);
    }
    setCelular(formatted);
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSalvar = () => {
    if (!nome.trim() || !email.trim() || !celular.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Atenção", "Por favor, insira um email válido");
      return;
    }

    if (celular.replace(/\D/g, "").length < 11) {
      Alert.alert("Atenção", "Por favor, insira um celular válido");
      return;
    }

    setSavedNome(nome);
    setSavedEmail(email);
    setSavedCelular(celular);
    setIsEditing(false);

    Alert.alert("Sucesso!", "Seus dados foram atualizados com sucesso!", [
      { text: "OK", onPress: () => {} },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/LogoCelsinho.png")}
          style={styles.headerBackground}
          resizeMode="contain"
        />
      </View>

      <View style={styles.photoWrapper}>
        <Image
          source={require("../assets/LogoCelsinho.png")}
          style={styles.photo}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Texto estiloEspecifico={styles.sectionTitle}>Meu Perfil</Texto>

      <View style={styles.form}>
        <Texto estiloEspecifico={styles.label}>Nome</Texto>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          placeholder="Seu nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={formatarNome}
          editable={isEditing}
        />

        <Texto estiloEspecifico={styles.label}>Email</Texto>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={formatarEmail}
          editable={isEditing}
        />

        <Texto estiloEspecifico={styles.label}>Celular</Texto>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          placeholder="(xx) xxxxx-xxxx"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={celular}
          onChangeText={formatarCelular}
          editable={isEditing}
        />

        {!isEditing ? (
          <TouchableOpacity style={styles.button} onPress={iniciarEdicao}>
            <Ionicons name="pencil" size={18} color="#fff" />
            <Texto estiloEspecifico={styles.buttonText}>Editar Perfil</Texto>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSalvar]}
              onPress={handleSalvar}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Texto estiloEspecifico={styles.buttonText}>Salvar</Texto>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancelar]}
              onPress={cancelarEdicao}
            >
              <Ionicons name="close" size={18} color="#fff" />
              <Texto estiloEspecifico={styles.buttonText}>Cancelar</Texto>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <StatusBar style="light" animated />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  content: {
    paddingBottom: 40,
  },
  headerContainer: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  headerBackground: {
    width: 220,
    height: 220,
    opacity: 0.16,
  },
  photoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: "#1a1a1a",
    alignSelf: "center",
    marginTop: -80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  cameraButton: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#6d24ca",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#111111",
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  form: {
    paddingHorizontal: 24,
  },
  label: {
    color: "#f5f5f5",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1d1d1d",
    color: "white",
    paddingHorizontal: 16,
  },
  inputDisabled: {
    backgroundColor: "#161616",
    borderColor: "#2a2a2a",
    color: "#999",
  },
  button: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: "#6d24ca",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
    shadowColor: "#6d24ca",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    flexDirection: "row",
    gap: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  buttonSalvar: {
    flex: 1,
    backgroundColor: "#6d24ca",
  },
  buttonCancelar: {
    flex: 1,
    backgroundColor: "#444",
    shadowColor: "#000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
