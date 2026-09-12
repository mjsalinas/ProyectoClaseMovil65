import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import StarRating from "../components/StarRating";
import TagChip from "../components/TagChip";
import { useTheme } from "../contexts/ThemeContext";
import { useSkincare } from "../contexts/SkincareContext";
import { RootStackParamList } from "../navigation/StackNavigator";
import { CATEGORY_LABELS, UsageTimeUnit } from "../utils/types/Skincare";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetail({ route, navigation }: Props) {
  const { products, addReview, deleteProduct } = useSkincare();
  const { productId } = route.params;
  const { colors } = useTheme();
  const product = products.find((p) => p.id === productId);

  const [rating, setRating] = useState(product?.review?.rating ?? 0);
  const [comment, setComment] = useState(product?.review?.comment ?? "");
  const [usageDuration, setUsageDuration] = useState(
    product?.review?.usageDuration?.toString() ?? "",
  );
  const [usageUnit, setUsageUnit] = useState<UsageTimeUnit>(
    product?.review?.usageUnit ?? "weeks",
  );

  if (!product) {
    return (
      <ScreenWrapper>
        <Text style={{ color: colors.textSecondary }}>
          Producto no encontrado
        </Text>
        <CustomButton
          title="Volver"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </ScreenWrapper>
    );
  }

  const handleSaveReview = () => {
    if (rating === 0 || !usageDuration.trim()) return;
    addReview(productId, {
      rating,
      comment: comment.trim(),
      usageDuration: parseInt(usageDuration, 10),
      usageUnit,
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteProduct(productId);
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View
        style={[styles.header, { backgroundColor: colors.inputBackground }]}
      >
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

      <SectionTitle
        title="Mi reseña"
        subtitle="Califica tu experiencia con este producto"
      />

      <Text style={[styles.label, { color: colors.primary }]}>Puntuación</Text>
      <StarRating rating={rating} onRate={setRating} />

      <CustomInput
        placeholder="Escribe tu reseña..."
        value={comment}
        onChangeText={setComment}
      />

      <Text style={[styles.label, { color: colors.primary }]}>
        Tiempo de uso
      </Text>
      <CustomInput
        placeholder="Cantidad (ej: 3)"
        value={usageDuration}
        onChangeText={setUsageDuration}
        type="number"
      />

      <View style={styles.unitRow}>
        <TagChip
          label="Días"
          selected={usageUnit === "days"}
          onPress={() => setUsageUnit("days")}
        />
        <TagChip
          label="Semanas"
          selected={usageUnit === "weeks"}
          onPress={() => setUsageUnit("weeks")}
        />
      </View>

      {product.review && (
        <View
          style={[styles.existingReview, { borderColor: colors.secondary }]}
        >
          <Text style={[styles.existingLabel, { color: colors.textSecondary }]}>
            Reseña actual
          </Text>
          <StarRating rating={product.review.rating} readonly size={18} />
          <Text style={{ color: colors.buttonTertiaryText }}>
            {product.review.comment || "Sin comentario"}
          </Text>
          <Text style={[styles.usageText, { color: colors.textSecondary }]}>
            Llevo {product.review.usageDuration}{" "}
            {product.review.usageUnit === "days" ? "días" : "semanas"} usándolo
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <CustomButton title="Guardar reseña" onPress={handleSaveReview} />
        <CustomButton
          title="Eliminar producto"
          onPress={handleDelete}
          variant="secondary"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  brand: {
    fontSize: 14,
    marginTop: 4,
  },
  category: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  unitRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  existingReview: {
    borderWidth: 1,
    borderRadius: 9,
    padding: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  existingLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  usageText: {
    fontSize: 12,
    marginTop: 6,
  },
  actions: {
    gap: 10,
    marginTop: 8,
  },
});
