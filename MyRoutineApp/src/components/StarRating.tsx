import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type StarRatingProps = {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
};

export default function StarRating({
  rating,
  onRate,
  readonly = false,
  size = 24,
}: StarRatingProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={readonly}
          onPress={() => onRate?.(star)}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color={colors.secondary}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 4,
  },
});
