import { Provider } from "react-redux";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import { navigationRef } from "./src/navigation/NavigationService";
import StackNavigator from "./src/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/store";

function AppNavigation() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppNavigation />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>

  );
}
