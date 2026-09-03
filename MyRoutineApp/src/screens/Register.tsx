import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { colors } = useTheme();

  const handleRegister = () => {
    setAttempts(attempts + 1);
    if (attempts === 3) {
      setIsDisabled(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Crear Cuenta</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Complete sus datos para registrarse
      </Text>
      <CustomInput
        placeholder={"Nombre"}
        value={name}
        onChangeText={setName}
        type="default"
      />
      <CustomInput
        placeholder={"Correo"}
        value={email}
        onChangeText={setEmail}
        type="email"
      />
      <CustomInput
        placeholder={"Contraseña"}
        value={password}
        onChangeText={setPassword}
        type="password"
      />

      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        <View
          style={[
            styles.checkbox,
            acceptedTerms
              ? { borderColor: colors.primary, backgroundColor: colors.primary }
              : { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        />
        <Text style={[styles.termsText, { color: colors.text }]}>
          Acepto los terminos y condiciones
        </Text>
      </TouchableOpacity>

      <CustomButton
        title={"Registrarme"}
        onPress={handleRegister}
        disabled={isDisabled}
      />

      <Text style={{ color: colors.textSecondary }}>
        Intentos de registro: {attempts}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
  },
  termsText: {
    fontSize: 12,
    paddingLeft: 10,
  },
});
