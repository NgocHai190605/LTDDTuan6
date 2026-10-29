import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SelectPhoneParamList, Phone } from "../types"; // Import từ types.ts
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

const Stack = createNativeStackNavigator<SelectPhoneParamList>();
 
export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Product">
            {(props) => <ProductScreen {...props} phone={phone} />}
          </Stack.Screen>
          <Stack.Screen name="ChooseColor">
            {(props) => <ChooseColorScreen {...props} phone={phone} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}