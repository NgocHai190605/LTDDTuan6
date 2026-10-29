import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiStackParamList, CartItem } from "../types";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<ApiStackParamList, "ApiDetail"> & {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function ApiDetailScreen({ route, navigation, cartItems, setCartItems }: Props) {
  const { product } = route.params;

  const handleAddToCart = () => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    alert("Đã thêm sản phẩm vào giỏ hàng!");
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Quay lại</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.category}>Danh mục: {product.category.toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price * 24000)}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>

      <Pressable style={styles.buyBtn} onPress={handleAddToCart}>
        <Text style={styles.buyText}>CHỌN MUA NGAY</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  backBtn: { marginRight: 16 },
  backText: { fontSize: 16, color: colors.blue, fontWeight: "500" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
  content: { padding: 16 },
  image: { width: "100%", height: 280, marginBottom: 16 },
  category: { fontSize: 13, color: colors.muted, marginBottom: 8, fontWeight: "600" },
  title: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 8 },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red, marginBottom: 16 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8, color: colors.text },
  description: { fontSize: 14, color: "#555", lineHeight: 22 },
  buyBtn: { backgroundColor: colors.red, height: 48, justifyContent: "center", alignItems: "center", margin: 16, borderRadius: 6 },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});