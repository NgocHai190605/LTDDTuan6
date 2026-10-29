import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApiStackParamList, CartItem } from "../types";
import { MainTabs } from "./MainTabs";
import { ApiDetailScreen } from "./ApiDetailScreen";
import { CartScreen } from "./CartScreen";

const Stack = createNativeStackNavigator<ApiStackParamList>();

export function ApiApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ApiList">
          {(props) => <MainTabs {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Stack.Screen>
        <Stack.Screen name="ApiDetail">
          {(props) => <ApiDetailScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}