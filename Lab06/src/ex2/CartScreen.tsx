import React, { useState } from "react";
import { View, Text, Image, FlatList, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiStackParamList, CartItem } from "../types";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<ApiStackParamList, "Cart"> & {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function CartScreen({ navigation, route, cartItems, setCartItems }: any) {
  const totalAmount = cartItems.reduce((sum: number, item: CartItem) => sum + item.product.price * 24000 * item.quantity, 0);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Quay lại</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.product.image }} style={styles.image} resizeMode="contain" />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>{item.product.title}</Text>
                  <Text style={styles.price}>{formatPrice(item.product.price * 24000)}</Text>
                  <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
              <Text style={styles.totalPrice}>{formatPrice(totalAmount)}</Text>
            </View>
            <Pressable style={styles.checkoutBtn} onPress={() => alert("Thanh toán thành công!")}>
              <Text style={styles.checkoutText}>TIẾN HÀNH THANH TOÁN</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  backBtn: { marginRight: 16 },
  backText: { fontSize: 16, color: colors.blue, fontWeight: "500" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: colors.muted },
  listContainer: { padding: 16 },
  card: { flexDirection: "row", backgroundColor: "#f9f9f9", marginBottom: 12, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: "#eee" },
  image: { width: 70, height: 70, marginRight: 12 },
  info: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: "500", color: colors.text },
  price: { fontSize: 15, fontWeight: "bold", color: colors.red },
  quantity: { fontSize: 13, color: colors.muted },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: "#eee", backgroundColor: "#fff" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  totalLabel: { fontSize: 16, fontWeight: "500", color: colors.text },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: colors.red },
  checkoutBtn: { backgroundColor: colors.red, height: 48, justifyContent: "center", alignItems: "center", borderRadius: 6 },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});