import { View, Text, StyleSheet, Switch } from "react-native";
import CustomButton from "../../../components/CustomButton";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SectionTitle from "../../../components/SectionTitle";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage, i18n } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { navigationRef } from "../../../navigation/NavigationService";

export default function Settings() {
  const { logout } = useAuth();
  const { changeLanguage, clearLanguage, language } = useLanguage();
  const { colors, toggleTheme, isDark } = useTheme();

  const handleLogout = () => {
    logout();
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  };

  return (
    <ScreenWrapper>
      <SectionTitle
        title="Configuraciones"
        subtitle="Personaliza tu experiencia en la app"
      />

      <View
        style={[styles.section, { backgroundColor: colors.inputBackground }]}
      >
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          {i18n.t("changeLanguage")}
        </Text>
        <Text style={[styles.currentValue, { color: colors.textSecondary }]}>
          Idioma actual: {language || "es"}
        </Text>
        <View style={styles.buttonRow}>
          <CustomButton title="ES" onPress={() => changeLanguage("es")} />
          <CustomButton
            title="EN"
            onPress={() => changeLanguage("en")}
            variant="secondary"
          />
        </View>
        <CustomButton
          title={i18n.t("clearLanguage")}
          onPress={clearLanguage}
          variant="tertiary"
        />
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.inputBackground }]}
      >
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          Apariencia
        </Text>
        <Text style={[styles.currentValue, { color: colors.textSecondary }]}>
          Tema actual: {isDark ? "Oscuro" : "Claro"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? colors.primary : "#f4f3f4"}
          trackColor={{ false: "#ccc", true: colors.secondary }}
        />
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.inputBackground }]}
      >
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          Sesión
        </Text>
        <CustomButton
          title="Cerrar sesión"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 13,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
});
