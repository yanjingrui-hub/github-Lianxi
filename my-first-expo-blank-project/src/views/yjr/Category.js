import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, Image } from "react-native-elements";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const scale = windowWidth / 375;
const normalize = (size) => Math.round(scale * size);

// 简化的产品项组件
const ProductItem = React.memo(({ product, onPress }) => (
  <TouchableOpacity style={styles.productItem} onPress={() => onPress(product)}>
    <Image
      source={{ uri: product.image }}
      style={styles.productImage}
      PlaceholderContent={<Icon name="image" type="feather" />}
    />
    <Text style={styles.productName}>{product.name}</Text>
  </TouchableOpacity>
));
ProductItem.displayName = "ProductItem";

// 简化的分类项组件                分类信息    是否选中    选中处理函数
const CategoryItem = React.memo(({ category, isSelected, onSelect }) => (
  <TouchableOpacity
    style={styles.categoryContainer}
    onPress={() => onSelect(category.name)}
  >
    <Text style={isSelected ? styles.categoryItemActive : styles.categoryText}>
      {category.name}
    </Text>
  </TouchableOpacity>
));
CategoryItem.displayName = "CategoryItem";

export default function Category({ navigation }) {
  const [selected, setSelected] = useState("全部");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // 合并数据获取
  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/shopList"),
        axios.get("/api/shopType"),
      ]);
      setProducts(productsRes.data.data);
      setCategories(categoriesRes.data.data);
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(
    () =>
      selected === "全部"
        ? products
        : products.filter((item) => item.type === selected),
    [selected, products]
  );

  const groupedProducts = useMemo(
    () =>
      products.reduce((acc, product) => {
        (acc[product.type] = acc[product.type] || []).push(product);
        return acc;
      }, {}),
    [products]
  );

  const renderProducts = () => {
    if (selected === "全部") {
      return Object.entries(groupedProducts).map(
        ([type, typeProducts]) =>
          type !== "全部" && (
            <View key={type} style={styles.typeSection}>
              <Text style={styles.typeTitle}>{type}</Text>
              <View style={styles.productGrid}>
                {typeProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onPress={(p) => navigation.replace("Detail", { id: p.id })}
                  />
                ))}
              </View>
            </View>
          )
      );
    }

    return (
      <View style={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onPress={(p) => navigation.replace("Detail", { id: p.id })}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.headerTitle, styles.headerText]}>商品分类</Text>
      <View style={styles.content}>
        <ScrollView style={styles.leftMenu}>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selected === category.name}
              onSelect={setSelected}
            />
          ))}
        </ScrollView>
        <ScrollView style={styles.rightContent}>
          <Card containerStyle={styles.section}>
            <Text style={styles.text}>{selected}</Text>
            {renderProducts()}
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae9e5",
  },
  headerTitle: {
    padding: normalize(10),
    backgroundColor: "#c1ab96",
  },
  headerText: {
    fontSize: normalize(18),
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flexDirection: "row",
    flex: 1,
  },
  leftMenu: {
    width: windowWidth * 0.25, // 屏幕宽度的 25%
    maxWidth: 120, // 最大宽度限制
    backgroundColor: "white",
  },
  categoryContainer: {
    width: "100%",
    paddingVertical: normalize(2),
  },
  categoryItemActive: {
    backgroundColor: "#c1ab96",
    color: "white",
    padding: normalize(8),
    textAlign: "center",
    marginVertical: normalize(2),
    marginHorizontal: normalize(4),
    borderRadius: normalize(4),
    fontSize: normalize(13),
  },
  categoryText: {
    color: "#666",
    padding: normalize(8),
    textAlign: "center",
    marginVertical: normalize(2),
    marginHorizontal: normalize(4),
    fontSize: normalize(13),
  },
  rightContent: {
    flex: 1,
    padding: normalize(8),
  },
  section: {
    flex: 1,
    borderRadius: normalize(10),
    padding: normalize(10),
    marginVertical: 0,
    marginHorizontal: 0,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  productItem: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: normalize(16),
    paddingHorizontal: normalize(4),
  },
  productImage: {
    width: (windowWidth * 0.75 - normalize(60)) / 3,
    height: (windowWidth * 0.75 - normalize(60)) / 3,
    marginBottom: normalize(8),
    borderRadius: normalize(5),
  },
  productName: {
    fontSize: normalize(12),
    color: "#666",
    textAlign: "center",
    paddingHorizontal: normalize(4),
  },
  text: {
    marginBottom: normalize(10),
    fontSize: normalize(16),
    fontWeight: "500",
  },
  typeSection: {
    marginBottom: normalize(20),
  },
  typeTitle: {
    fontSize: normalize(16),
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: normalize(8),
    borderRadius: normalize(4),
    marginBottom: normalize(10),
  },
});
