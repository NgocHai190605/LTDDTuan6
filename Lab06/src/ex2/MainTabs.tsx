import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList, CartItem } from "../types";
import { ApiProductScreen } from "./ApiProductScreen";
import { CartScreen } from "./CartScreen";
import { colors } from "../theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function MainTabs({ cartItems, setCartItems }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        options={{ title: "Sản phẩm" }}
      >
        {(props) => <ApiProductScreen {...props} cartCount={cartItems.length} />}
      </Tab.Screen>
      <Tab.Screen 
        name="CartTab" 
        options={{ 
          title: `Giỏ hàng (${cartItems.reduce((sum, item) => sum + item.quantity, 0)})` 
        }}
      >
        {(props) => <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}