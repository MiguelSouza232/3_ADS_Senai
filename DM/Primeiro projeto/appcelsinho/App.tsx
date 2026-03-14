//Menu
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//MENU SOBRE
import telasSobre from "./telas/Sobre";

//MENU - BOTTOM TABS
const Tab = createBottomTabNavigator();

function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon({focused, color, size}) => ({
          let iconName: any;
          if (route.name === "Sobre") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Servicos") {
            iconName = focused ? "bag" : "bag-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }
        }),
        headerShown: false,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Sobre" component={telasSobre} />
      <Tab.Screen name="Sobre1" component={telasSobre} />
      <Tab.Screen name="Sobre2" component={telasSobre} />
      <Tab.Screen name="Sobre3" component={telasSobre} />
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
