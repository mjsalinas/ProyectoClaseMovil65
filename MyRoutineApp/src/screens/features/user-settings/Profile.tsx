import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SectionTitle from "../../../components/SectionTitle";
import CustomInput from "../../../components/CustomInput";
import { useEffect, useState } from "react";
import { SKIN_TYPE_LABELS, SKIN_TYPES } from "../../../utils/types/Skincare";
import TagChip from "../../../components/TagChip";
import CustomButton from "../../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addMedicalCondition,
  removeMedicalCondition,
  updateProfile,
} from "../../../store/slices/userProfileSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const userProfile = useAppSelector((state) => state.userProfile);

  const [name, setName] = useState(userProfile.name ? userProfile.name : "");
  const [age, setAge] = useState(userProfile.age ? userProfile.age : "");
  const [skinType, setSkinType] = useState<string>(
    userProfile.skinType ? userProfile.skinType : "",
  );
  const [newCondition, setNewCondition] = useState("");
  const [newTreatment, setNewTreatment] = useState("");

  useEffect(() => {
    console.log("Informacion cargada desde Redux: ", userProfile);
  }, []);

  const handleSave = () => {
    dispatch(updateProfile({ name, age, skinType }));
  };

  const handleAddCondition = () =>{
    dispatch(addMedicalCondition(newCondition));
  };
  const handleOnRemoveCondition = () =>{
    dispatch(removeMedicalCondition(newCondition));
  }
  
  return (
    <ScreenWrapper>
      <SectionTitle
        title="Mi Perfil"
        subtitle="Información personal y de piel"
      />

      <View
        style={[
          styles.avatarSection,
          { backgroundColor: colors.inputBackground },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={styles.avatarText}>name</Text>
        </View>
        <Text style={[styles.email, { color: colors.buttonTertiaryText }]}>
          email
        </Text>
      </View>

      <SectionTitle title="Información básica" />
      <CustomInput placeholder="Nombre" value={name} onChangeText={setName} />
      <CustomInput placeholder="Edad" value={age} onChangeText={setAge} />

      <Text style={[styles.label, { color: colors.primary }]}>
        Tipo de piel
      </Text>
      <View style={styles.tagRow}>
        {SKIN_TYPES.map((type) => (
          <TagChip
            key={type}
            label={SKIN_TYPE_LABELS[type]}
            onPress={() => setSkinType(type)}
            selected={skinType === type}
          />
        ))}
      </View>
      <CustomButton title="Guardar Perfil" onPress={handleSave} />

      <SectionTitle
        title="Condiciones Medicas"
        subtitle="Agrega tags con tus condiciones de piel"
      />
      <View style={styles.tagRow}>
        {userProfile.medicalConditions.map((condition) => (
          <TagChip
            key={condition}
            label={condition}
            onRemove={handleOnRemoveCondition}
          />
        ))}
      </View>
      <View>
        <CustomInput
          placeholder="Ej: Acne, Rosacea, etc"
          value={newCondition}
          onChangeText={setNewCondition}
        />
        <CustomButton title="Agregar" onPress={handleAddCondition} variant="secondary" />
      </View>
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
