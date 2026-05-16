//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

//Ícones
import { Ionicons } from "@expo/vector-icons";

//Importação da Fonte
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

//Menu SOBRE
import TelaSobre from "./telas/Sobre";
import TelaServicos from "./telas/Servicos/Index";
import TelaPerfil from "./telas/Perfil";

//MENU - BOTTOM TABS
const Tab = createBottomTabNavigator();

function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Sobre") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Serviços") {
            iconName = focused ? "musical-note" : "musical-note-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#6d24ca",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Sobre" component={TelaSobre} />
      <Tab.Screen name="Serviços" component={TelaServicos} />
      <Tab.Screen name="Perfil" component={TelaPerfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  //Carrega a fonte
  const [fonteCarregada] = useFonts({ FontePadrao: Poppins_400Regular });

  //Verifica se a fonte foi carregada
  if (!fonteCarregada) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
