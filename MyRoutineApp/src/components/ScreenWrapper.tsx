import { ScrollView, View, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";


type ScreenWrapperProps ={
    children: React.ReactNode;
    scrollable? : boolean;
}

export default function ScreenWrapper({children,scrollable=true}: ScreenWrapperProps){
const { colors, isDark } = useTheme();

  const content = scrollable ? (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>{children}</View>
    </View>
  );

    return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      {content}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});