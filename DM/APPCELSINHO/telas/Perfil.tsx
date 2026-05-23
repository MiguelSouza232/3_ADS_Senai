import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import Texto from "../componentes/Texto";
import estilosPerfil from "./estilosPerfil";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [savedNome, setSavedNome] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedCelular, setSavedCelular] = useState("");

  // Estados da câmera
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

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
    <ScrollView style={estilosPerfil.container} contentContainerStyle={estilosPerfil.content}>
      <View style={estilosPerfil.headerContainer}>
        <Image
          source={require("../assets/LogoCelsinho.png")}
          style={estilosPerfil.headerBackground}
          resizeMode="contain"
        />
      </View>

      <View style={estilosPerfil.photoWrapper}>
        {!permission ? (
          <Image
            source={require("../assets/icon.png")}
            style={estilosPerfil.photo}
            resizeMode="cover"
          />
        ) : !permission.granted ? (
          <TouchableOpacity 
            style={estilosPerfil.photo}
            onPress={requestPermission}
          >
            <Texto estiloEspecifico={estilosPerfil.cameraPermissionText}>
              Permitir Câmera
            </Texto>
          </TouchableOpacity>
        ) : (
          <CameraView style={estilosPerfil.photo} facing={facing} />
        )}
        <TouchableOpacity style={estilosPerfil.cameraButton} onPress={toggleCameraFacing}>
          <Ionicons name="reload" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Texto estiloEspecifico={estilosPerfil.sectionTitle}>Meu Perfil</Texto>

      <View style={estilosPerfil.cardContainer}>
        <Texto estiloEspecifico={estilosPerfil.label}>Nome Completo</Texto>
        <TextInput
          style={[estilosPerfil.input, !isEditing && estilosPerfil.inputDisabled]}
          placeholder="Seu nome completo"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={formatarNome}
          editable={isEditing}
        />

        <Texto estiloEspecifico={estilosPerfil.label}>E-Mail</Texto>
        <TextInput
          style={[estilosPerfil.input, !isEditing && estilosPerfil.inputDisabled]}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={formatarEmail}
          editable={isEditing}
        />

        <Texto estiloEspecifico={estilosPerfil.label}>WhatsApp</Texto>
        <TextInput
          style={[estilosPerfil.input, !isEditing && estilosPerfil.inputDisabled]}
          placeholder="(xx) xxxxx-xxxx"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={celular}
          onChangeText={formatarCelular}
          editable={isEditing}
        />

        {!isEditing ? (
          <TouchableOpacity style={estilosPerfil.button} onPress={iniciarEdicao}>
            <Ionicons name="pencil" size={18} color="#fff" />
            <Texto estiloEspecifico={estilosPerfil.buttonText}>Editar Perfil</Texto>
          </TouchableOpacity>
        ) : (
          <View style={estilosPerfil.buttonGroup}>
            <TouchableOpacity
              style={[estilosPerfil.button, estilosPerfil.buttonSalvar]}
              onPress={handleSalvar}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Texto estiloEspecifico={estilosPerfil.buttonText}>Salvar</Texto>
            </TouchableOpacity>
            <TouchableOpacity
              style={[estilosPerfil.button, estilosPerfil.buttonCancelar]}
              onPress={cancelarEdicao}
            >
              <Ionicons name="close" size={18} color="#fff" />
              <Texto estiloEspecifico={estilosPerfil.buttonText}>Cancelar</Texto>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <StatusBar style="light" animated />
    </ScrollView>
  );
}
