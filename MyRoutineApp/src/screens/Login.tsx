import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Login({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const { login } = useAuth();
  const { colors } = useTheme();

  const handleLogin = () => {
    const allowed = login(correo);
    if (allowed) {
      navigation.navigate("UserTabs", {
        screen: "HomeTab",
        params: { email: correo },
      });
    } else {
      console.log("usuario no tiene acceso");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t("welcomeLogin")}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Inicia sesión para continuar
      </Text>
      <View style={styles.form}>
        <CustomInput
          type="email"
          placeholder={i18n.t("typeEmail")}
          value={correo}
          onChangeText={setCorreo}
        />
        <CustomButton title={i18n.t("signIn")} onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 28,
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
});
