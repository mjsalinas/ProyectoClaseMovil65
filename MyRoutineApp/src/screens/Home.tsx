import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import StarRating from "../components/StarRating";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useSkincare } from "../contexts/SkincareContext";
import { i18n } from "../contexts/LanguageContext";
import { CATEGORY_LABELS } from "../utils/types/Skincare";
import { useAppSelector } from "../store/hooks";

type RoutinePreviewProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  productIds: string[];
};

function RoutinePreview({ title, icon, productIds }: RoutinePreviewProps) {
  const { products } = useSkincare();
  const { colors } = useTheme();

  const routineProducts = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <View
      style={[styles.routineCard, { backgroundColor: colors.inputBackground }]}
    >
      <View style={styles.routineHeader}>
        <Ionicons name={icon} size={20} color={colors.secondary} />
        <Text style={[styles.routineTitle, { color: colors.primary }]}>
          {title}
        </Text>
      </View>
      {routineProducts.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Sin productos asignados
        </Text>
      ) : (
        routineProducts.map((product, index) => (
          <View key={product!.id} style={styles.stepRow}>
            <Text style={[styles.stepNum, { color: colors.secondary }]}>
              {index + 1}.
            </Text>
            <View style={styles.stepContent}>
              <Text
                style={[styles.stepName, { color: colors.buttonTertiaryText }]}
              >
                {product!.name}
              </Text>
              <Text style={[styles.stepCat, { color: colors.textSecondary }]}>
                {CATEGORY_LABELS[product!.category]}
              </Text>
            </View>
            {product!.review && (
              <StarRating rating={product!.review.rating} readonly size={14} />
            )}
          </View>
        ))
      )}
    </View>
  );
}

export default function Home() {
  const { products } = useSkincare();
  const profile = useAppSelector((state) => state.userProfile);
  const { user } = useAuth();
  const { colors } = useTheme();

  const reviewedCount = products.filter((p) => p.review).length;

  // Al conectar Redux en Routines, estas listas pueden leerse del store.
  const routine = { morning: [] as string[], night: [] as string[] };

  return (
    <ScreenWrapper>
      <Text style={[styles.greeting, { color: colors.primary }]}>
        {i18n.t("welcome")}, {profile.name || user?.email}
      </Text>
      <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
        Tu rutina de skincare de hoy
      </Text>

      <View style={styles.statsRow}>
        <View
          style={[styles.stat, { backgroundColor: colors.inputBackground }]}
        >
          <Text style={[styles.statNum, { color: colors.secondary }]}>
            {products.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Productos
          </Text>
        </View>
        <View
          style={[styles.stat, { backgroundColor: colors.inputBackground }]}
        >
          <Text style={[styles.statNum, { color: colors.secondary }]}>
            {routine.morning.length + routine.night.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Pasos rutina
          </Text>
        </View>
        <View
          style={[styles.stat, { backgroundColor: colors.inputBackground }]}
        >
          <Text style={[styles.statNum, { color: colors.secondary }]}>
            {reviewedCount}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Reseñas
          </Text>
        </View>
      </View>

      <SectionTitle title="Rutina de Mañana" />
      <RoutinePreview
        title="Mañana"
        icon="sunny-outline"
        productIds={routine.morning}
      />

      <SectionTitle title="Rutina de Noche" />
      <RoutinePreview
        title="Noche"
        icon="moon-outline"
        productIds={routine.night}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    alignItems: "center",
  },
  statNum: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  routineCard: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 8,
  },
  routineHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 13,
    fontStyle: "italic",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  stepNum: {
    fontSize: 14,
    fontWeight: "700",
    width: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: "500",
  },
  stepCat: {
    fontSize: 11,
  },
});
