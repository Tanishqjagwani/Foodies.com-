import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Restrurent, Order } from "./screens";
import Tabs from "./navigation/tabs";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restrurent" component={Restrurent} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
