import { View,StyleSheet,Text } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SectionTitle from "../../../components/SectionTitle";
import CustomInput from "../../../components/CustomInput";
import { useState } from "react";
import { SKIN_TYPES } from "../../../utils/types/Skincare";
import TagChip from "../../../components/TagChip";

export default function Profile() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState<string>("normal");
  const [newCondition, setNewCondition] = useState("");
  const [newTreatment, setNewTreatment] = useState("");

  return (
    <ScreenWrapper>
            <SectionTitle
        title="Mi Perfil"
        subtitle="Información personal y de piel"
      />

      <View style={[styles.avatarSection, { backgroundColor: colors.inputBackground }]}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={styles.avatarText}>
            name
          </Text>
        </View>
        <Text style={[styles.email, { color: colors.buttonTertiaryText }]}>
          email
        </Text>
      </View>

      <SectionTitle title="Información básica" />
      <CustomInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <CustomInput
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
      />

      <Text style={[styles.label, { color: colors.primary }]}>Tipo de piel</Text>
      {SKIN_TYPES.map((skinType) => (
       <> <TagChip 
        label={skinType}
        />
        </>
      ))} 

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  addInput: {
    flex: 1,
  },
});
