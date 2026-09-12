import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigator from "./TabsNavigator";
import ProductDetail from "../screens/ProductDetail";
import { useTheme } from "../contexts/ThemeContext";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  UserTabs: undefined;
  ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ title: "Skincare Tracker" }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{ title: "Registro" }}
      />
      <Stack.Screen
        name="UserTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: "Detalle del producto" }}
      />
    </Stack.Navigator>
  );
}
