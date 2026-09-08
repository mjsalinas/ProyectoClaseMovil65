import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type TagChipProps = {
  label: string;
  onRemove?: () => void;
  onPress?: () => void;
  selected?: boolean;
};

export default function TagChip({
  label,
  onRemove,
  onPress,
  selected = false,
}: TagChipProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.secondary : colors.inputBackground,
          borderColor: colors.secondary,
        },
      ]}
      onPress={onPress}
      disabled={!onPress && !onRemove}
    >
      <Text
        style={[
          styles.chipText,
          { color: selected ? "#ffffff" : colors.buttonTertiaryText },
        ]}
      >
        {label}
      </Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 13,
  },
  removeBtn: {
    marginLeft: 6,
  },
  removeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
