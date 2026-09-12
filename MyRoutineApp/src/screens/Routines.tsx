import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { useSkincare } from "../contexts/SkincareContext";
import { CATEGORY_LABELS, Routine } from "../utils/types/Skincare";

type RoutineSectionProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  productIds: string[];
  type: "morning" | "night";
  onAdd: (type: "morning" | "night", productId: string) => void;
  onRemove: (type: "morning" | "night", productId: string) => void;
};

function RoutineSection({
  title,
  icon,
  productIds,
  type,
  onAdd,
  onRemove,
}: RoutineSectionProps) {
  const { products } = useSkincare();
  const { colors } = useTheme();

  const routineProducts = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const availableProducts = products.filter((p) => !productIds.includes(p.id));

  return (
    <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={22} color={colors.secondary} />
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {title}
        </Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {routineProducts.length} pasos
        </Text>
      </View>

      {routineProducts.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>
          Sin productos en esta rutina
        </Text>
      ) : (
        routineProducts.map((product, index) => (
          <View key={product!.id} style={styles.routineItem}>
            <View
              style={[styles.stepBadge, { backgroundColor: colors.secondary }]}
            >
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text
                style={[styles.itemName, { color: colors.buttonTertiaryText }]}
              >
                {product!.name}
              </Text>
              <Text
                style={[styles.itemCategory, { color: colors.textSecondary }]}
              >
                {CATEGORY_LABELS[product!.category]}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(type, product!.id)}>
              <Ionicons
                name="close-circle"
                size={22}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
        ))
      )}

      {availableProducts.length > 0 && (
        <>
          <Text style={[styles.addLabel, { color: colors.textSecondary }]}>
            Agregar producto:
          </Text>
          {availableProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.addItem, { borderColor: colors.secondary }]}
              onPress={() => onAdd(type, product.id)}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={colors.secondary}
              />
              <Text
                style={[
                  styles.addItemText,
                  { color: colors.buttonTertiaryText },
                ]}
              >
                {product.name}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

export default function Routines() {
  const { products } = useSkincare();
  const { colors } = useTheme();

  // EJERCICIO: reemplaza este estado local por Redux
  // (createSlice + useAppSelector / useAppDispatch).
  // Acciones esperadas: addToRoutine y removeFromRoutine.
  // Así la rutina también podrá verse en la pantalla Inicio.
  const [routine, setRoutine] = useState<Routine>({
    morning: [],
    night: [],
  });

  const handleAddToRoutine = (
    type: "morning" | "night",
    productId: string,
  ) => {
    setRoutine((prev) => {
      if (prev[type].includes(productId)) return prev;
      return { ...prev, [type]: [...prev[type], productId] };
    });
  };

  const handleRemoveFromRoutine = (
    type: "morning" | "night",
    productId: string,
  ) => {
    setRoutine((prev) => ({
      ...prev,
      [type]: prev[type].filter((id) => id !== productId),
    }));
  };

  return (
    <ScreenWrapper>
      <SectionTitle
        title="Mis Rutinas"
        subtitle="Organiza tus productos en rutina de mañana y de noche"
      />

      {products.length === 0 ? (
        <Text style={[styles.noProducts, { color: colors.textSecondary }]}>
          Primero registra productos en la pestaña Productos para armar tus
          rutinas.
        </Text>
      ) : (
        <>
          <RoutineSection
            title="Rutina de Mañana"
            icon="sunny-outline"
            productIds={routine.morning}
            type="morning"
            onAdd={handleAddToRoutine}
            onRemove={handleRemoveFromRoutine}
          />
          <RoutineSection
            title="Rutina de Noche"
            icon="moon-outline"
            productIds={routine.night}
            type="night"
            onAdd={handleAddToRoutine}
            onRemove={handleRemoveFromRoutine}
          />
        </>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  count: {
    fontSize: 12,
  },
  empty: {
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 8,
  },
  routineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemCategory: {
    fontSize: 11,
    marginTop: 2,
  },
  addLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 6,
  },
  addItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    gap: 8,
  },
  addItemText: {
    fontSize: 13,
  },
  noProducts: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
