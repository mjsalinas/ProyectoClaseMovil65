import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Variant = "primary" | "secondary" | "tertiary";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean | null | undefined;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = null,
}: CustomButtonProps) {
  const { colors } = useTheme();

  const getBackground = (): string => {
    if (variant === "primary") return colors.primary;
    if (variant === "secondary") return colors.surface;
    return "transparent";
  };

  const getTextColor = (): string => {
    if (variant === "primary") return "#FFFFFF";
    if (variant === "secondary") return colors.text;
    return colors.primary;
  };

  const getBorder = (): ViewStyle => {
    if (variant === "tertiary")
      return { borderWidth: 1.5, borderColor: colors.primary };
    if (variant === "secondary")
      return { borderWidth: 1, borderColor: colors.border };
    return {};
  };

  return (
    <Pressable
      style={[
        styles.base,
        { backgroundColor: getBackground(), opacity: disabled ? 0.5 : 1 },
        getBorder(),
      ]}
      onPress={onPress}
      disabled={!!disabled}
    >
      <Text style={[styles.label, { color: getTextColor() }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 6,
    alignItems: "center",
    minWidth: 180,
  },
  label: { fontSize: 16, fontWeight: "600" },
});
