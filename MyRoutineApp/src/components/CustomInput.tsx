import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "default" | "password" | "number" | "email";
};

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  type = "default",
}: Props) {
  //tema: manejo de estado LOCAL {en el componente}
  //hook: useState para definir variable en el estado
  const [isSecureText, setIsSecureText] = useState(type === "password");
  //Primera accion: inicializar la variable
  //Segunda accion: utilizar la variable; ej: en propiedad secureTextEntry de TextInput
  //Tercera accion: actualizar su valor; setIsSecureText(true)
  const isPasswordField = type === "password";

  const icon: (typeof MaterialIcons)["name"] | undefined =
    type === "password"
      ? "lock"
      : type === "email"
        ? "alternate-email"
        : undefined;

  const keyboardType: KeyboardTypeOptions =
    type === "email"
      ? "email-address"
      : type === "number"
        ? "number-pad"
        : "default";

  const getError = () => {
    if (type === "email" && !value.includes("@")) return "Correo invalido";
    if (type === "password" &&  value.length < 4) return "La contraseña es debil"
  };

  const error = getError();
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <MaterialIcons name={icon as any} size={22} color={colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isSecureText}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={() => {
              setIsSecureText(!isSecureText);
            }}
          >
            <Ionicons
              name={isSecureText ? "eye" : "eye-off"}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ color: colors.primary }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    width: "85%",
    alignSelf: "center",
  },
  inputContainer: {
    //distribucion de componentes con flexbox
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 14,
    paddingVertical: 4,
    minHeight: 50,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
});
