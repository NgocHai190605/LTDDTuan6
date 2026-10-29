import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiProduct, ApiStackParamList } from "../types";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<ApiStackParamList, "ApiList">;

export function ApiProductScreen({ navigation }: Props) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text style={{ marginTop: 8 }}>Đang tải dữ liệu từ API...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerTitle}>Danh sách sản phẩm từ API</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.card} 
            onPress={() => navigation.navigate("ApiDetail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>{formatPrice(item.price * 24000)}</Text>
              <Text style={styles.category} numberOfLines={1}>Danh mục: {item.category}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f5f5f5", padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: colors.text },
  card: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 12, borderRadius: 8, padding: 12, elevation: 2 },
  image: { width: 80, height: 80, marginRight: 12 },
  info: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: "500", color: colors.text },
  price: { fontSize: 16, fontWeight: "bold", color: colors.red },
  category: { fontSize: 12, color: colors.muted }
});