import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { Product, CATEGORY_LABELS } from "../utils/types/Skincare";
import StarRating from "./StarRating";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  showReview?: boolean;
};

export default function ProductCard({
  product,
  onPress,
  showReview = true,
}: ProductCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.inputBackground }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.buttonTertiaryText }]}>
            {product.name}
          </Text>
          <Text style={[styles.brand, { color: colors.textSecondary }]}>
            {product.brand}
          </Text>
          <Text style={[styles.category, { color: colors.secondary }]}>
            {CATEGORY_LABELS[product.category]}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
      </View>
      {showReview && product.review && (
        <View style={styles.reviewRow}>
          <StarRating rating={product.review.rating} readonly size={16} />
          <Text style={[styles.usage, { color: colors.textSecondary }]}>
            {product.review.usageDuration}{" "}
            {product.review.usageUnit === "days" ? "días" : "semanas"}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 9,
    padding: 14,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  brand: {
    fontSize: 13,
    marginTop: 2,
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  usage: {
    fontSize: 12,
  },
});
