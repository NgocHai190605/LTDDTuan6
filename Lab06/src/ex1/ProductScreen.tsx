import React from "react";
import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "../types";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
        </View>

        <Pressable 
          style={styles.chooseBtn} 
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>&gt;</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, justifyContent: "space-between" },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300 },
  info: { paddingBottom: 12 },
  name: { fontSize: 16, fontWeight: "400", color: colors.text, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 4, gap: 8 },
  review: { fontSize: 14, color: colors.muted },
  price: { fontSize: 18, fontWeight: "bold", color: colors.text },
  oldPrice: { fontSize: 14, color: colors.muted, textDecorationLine: "line-through" },
  badge: { fontSize: 12, color: colors.red, fontWeight: "bold" },
  chooseBtn: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  chooseBtnText: { fontSize: 14, fontWeight: "500", color: colors.text },
  chevron: { position: "absolute", right: 12, fontSize: 18, color: colors.muted },
  buyBtn: {
    backgroundColor: colors.red,
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});