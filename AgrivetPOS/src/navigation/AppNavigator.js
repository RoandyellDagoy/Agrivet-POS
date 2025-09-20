import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen.js";
import ProductListScreen from "../screens/ProductListScreen.js";
import { AuthContext } from "../context/AuthContext.js";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Products" component={ProductListScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
