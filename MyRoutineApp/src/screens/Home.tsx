import { Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../navigation/TabsNavigator";
import { navigationRef } from "../navigation/NavigationService";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

type NestedFeedProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, "HomeTab">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Home({ navigation }: NestedFeedProps) {
  const { user } = useAuth();
  const { colors } = useTheme();

  const handleUserSettings = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  };

  const handleNavigate = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.welcome, { color: colors.text }]}>
        Hola {user?.email}, Bienvenido a Home
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Variantes de Boton
      </Text>

      <CustomButton
        title="Ir a Preferencias de Usuario"
        onPress={handleUserSettings}
        variant="primary"
      />
      <CustomButton
        title="Cerrar Sesion"
        variant="secondary"
        onPress={handleLogout}
      />
      <CustomButton
        title="Ir atras"
        variant="tertiary"
        onPress={handleNavigate}
      />


     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40, alignItems: "center" },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
});
