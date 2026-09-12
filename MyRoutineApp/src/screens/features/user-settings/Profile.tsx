import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SectionTitle from "../../../components/SectionTitle";
import TagChip from "../../../components/TagChip";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  SkinType,
  SKIN_TYPES,
  SKIN_TYPE_LABELS,
} from "../../../utils/types/Skincare";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addMedicalCondition,
  addTreatment,
  removeMedicalCondition,
  removeTreatment,
  updateProfile,
} from "../../../store/slices/userProfileSlice";

export default function Profile() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.userProfile);
  const { colors } = useTheme();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [skinType, setSkinType] = useState<SkinType>(
    (userProfile.skinType as SkinType) || "normal",
  );
  const [newCondition, setNewCondition] = useState("");
  const [newTreatment, setNewTreatment] = useState("");

  const handleSave = () => {
    dispatch(updateProfile({ name, age, skinType }));
  };

  const handleAddCondition = () => {
    if (!newCondition.trim()) return;
    dispatch(addMedicalCondition(newCondition));
    setNewCondition("");
  };

  const handleAddTreatment = () => {
    if (!newTreatment.trim()) return;
    dispatch(addTreatment(newTreatment));
    setNewTreatment("");
  };

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
          <Text style={styles.avatarText}>
            {(userProfile.name || user?.email || "?").charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.email, { color: colors.buttonTertiaryText }]}>
          {user?.email}
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
            selected={skinType === type}
            onPress={() => setSkinType(type)}
          />
        ))}
      </View>

      <CustomButton title="Guardar perfil" onPress={handleSave} />

      <SectionTitle
        title="Condiciones médicas"
        subtitle="Agrega tags con tus condiciones de piel o salud"
      />
      <View style={styles.tagRow}>
        {userProfile.medicalConditions.map((condition) => (
          <TagChip
            key={condition}
            label={condition}
            selected
            onRemove={() => dispatch(removeMedicalCondition(condition))}
          />
        ))}
      </View>
      <View style={styles.addRow}>
        <View style={styles.addInput}>
          <CustomInput
            placeholder="Ej: Acné, Rosácea, Eczema..."
            value={newCondition}
            onChangeText={setNewCondition}
          />
        </View>
        <CustomButton
          title="Agregar"
          onPress={handleAddCondition}
          variant="secondary"
        />
      </View>

      <SectionTitle
        title="Tratamientos dermatológicos"
        subtitle="Registra tratamientos que estés recibiendo"
      />
      <View style={styles.tagRow}>
        {userProfile.dermatologicalTreatments.map((treatment) => (
          <TagChip
            key={treatment}
            label={treatment}
            selected
            onRemove={() => dispatch(removeTreatment(treatment))}
          />
        ))}
      </View>
      <View style={styles.addRow}>
        <View style={styles.addInput}>
          <CustomInput
            placeholder="Ej: Retinol, Ácido glicólico..."
            value={newTreatment}
            onChangeText={setNewTreatment}
          />
        </View>
        <CustomButton
          title="Agregar"
          onPress={handleAddTreatment}
          variant="secondary"
        />
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
