// src/types.ts
export type ColorKey = "silver" | "red" | "black" | "blue";

export type Phone = {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  badge: string;
  colors: ColorKey[];
  defaultColor: ColorKey;
};


// Thêm định nghĩa này vào đây để tránh vòng lặp phụ thuộc
export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};
export type ApiProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};
export type CartItem = {
  product: ApiProduct;
  quantity: number;
};

export type ApiStackParamList = {
  ApiList: undefined;
  ApiDetail: { product: ApiProduct };
  Cart: undefined; // Thêm màn hình Giỏ hàng
};
export type MainTabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
};