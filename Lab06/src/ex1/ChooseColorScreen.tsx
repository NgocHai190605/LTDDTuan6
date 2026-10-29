import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList, ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image 
          source={PHONE_COLORS[picked ?? phone.defaultColor].image} 
          style={styles.thumb} 
          resizeMode="contain" 
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {picked && (
            <>
              <Text style={styles.small}>Màu: <Text style={{ fontWeight: "bold" }}>{PHONE_COLORS[picked].label}</Text></Text>
              <Text style={styles.small}>Cung cấp bởi <Text style={{ fontWeight: "bold" }}>{phone.supplier}</Text></Text>
              <Text style={[styles.small, { fontWeight: "bold", fontSize: 18 }]}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable 
              key={key} 
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]} 
            />
          ))}
        </View>
        <Pressable 
          style={styles.doneBtn} 
          onPress={() => navigation.navigate("Product", { color: picked })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, backgroundColor: "#fff", gap: 12 },
  thumb: { width: 112, height: 130 },
  headerText: { flex: 1, justifyContent: "center", gap: 4 },
  small: { fontSize: 14, color: colors.text },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, justifyContent: "space-between" },
  hint: { fontSize: 14, color: colors.text, marginBottom: 12 },
  swatches: { alignItems: "center", gap: 16, marginVertical: 20 },
  swatch: { width: 65, height: 65 },
  swatchOn: { borderWidth: 3, borderColor: colors.blue },
  doneBtn: { backgroundColor: colors.blue, height: 44, borderRadius: 4, justifyContent: "center", alignItems: "center" },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});