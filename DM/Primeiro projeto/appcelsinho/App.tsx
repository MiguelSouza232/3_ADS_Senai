import React from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Ícones
import Ionicons from "react-native-vector-icons/Ionicons";

// Tela
import telasSobre from "./telas/Sobre";

// Tipagem das rotas
type RootTabParamList = {
  Sobre: undefined;
  Servicos: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === "Sobre") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Servicos") {
            iconName = focused ? "bag" : "bag-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Sobre" component={telasSobre} />
      <Tab.Screen name="Servicos" component={telasSobre} />
      <Tab.Screen name="Perfil" component={telasSobre} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
