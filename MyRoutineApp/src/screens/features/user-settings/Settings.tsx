import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import { i18n, useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";

export default function Settings() {
  const { language, clearLanguage, changeLanguage } = useLanguage();
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={72}
        color={colors.primary}
        style={styles.icon}
      />

      <Text style={[styles.title, { color: colors.text }]}>
        Tema actual: {isDark ? "Oscuro" : "Claro"}
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Cambia el tema y observa como toda la interfaz se actualiza
        automaticamente.
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          {isDark ? "Desactivar modo oscuro" : "Activar modo oscuro"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? colors.primary : "#f4f3f4"}
          trackColor={{ false: "#ccc", true: "#9B59B6" }}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Idioma
      </Text>
      <Text style={[styles.languageText, { color: colors.textSecondary }]}>
        Current language: {language}
      </Text>
      <CustomButton
        title={i18n.t("clearLanguage")}
        onPress={clearLanguage}
      />
      <CustomButton
        title={"EN"}
        onPress={() => changeLanguage("en")}
        variant="secondary"
      />
      <CustomButton
        title={"ES"}
        onPress={() => changeLanguage("es")}
        variant="secondary"
      />
      <CustomButton
        title={"FR"}
        onPress={() => changeLanguage("fr")}
        variant="secondary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  icon: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 32 },
  label: { fontSize: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 8,
  },
  languageText: { fontSize: 14, marginBottom: 12 },
});
