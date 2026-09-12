import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../utils/types/Skincare";

const initialUserProfile: UserProfile = {
    name: "",
    age: "",
    skinType: "normal",
    medicalConditions: [],
    dermatologicalTreatments: [],
};

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: initialUserProfile,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            Object.assign(state, action.payload);
        },
        //las modificaciones a las propiedades tipo arreglo, se hacen directamente al objeto [medicalConditions] en el estado
        addMedicalCondition: (state, action: PayloadAction<string>) => {
            //aplicar validaciones de formato y de tipo de dato para agregar un elemento nuevo a un arreglo
            const trimmed = action.payload.trim();
            if (!trimmed || state.medicalConditions.includes(trimmed)) return;
            state.medicalConditions.push(trimmed);
        },
        removeMedicalCondition: (state, action: PayloadAction<string>) => {
            //eliminar un elemento de un arreglo segun coincidencia de contenido (valor a eliminar viene del payload)
            state.medicalConditions = state.medicalConditions.filter(
                (mc) => mc !== action.payload
            );
        },
        //las modificaciones a las propiedades tipo arreglo, se hacen directamente al objeto [dermatologicalTreatments] en el estado
        addTreatment: (state, action: PayloadAction<string>) => {
            //aplicar validaciones de formato y de tipo de dato para agregar un elemento nuevo a un arreglo
            const trimmed = action.payload.trim();
            if (!trimmed || state.medicalConditions.includes(trimmed)) return;
            state.dermatologicalTreatments.push(trimmed);
        },
        removeTreatment: (state, action: PayloadAction<string>) => {
            //eliminar un elemento de un arreglo segun coincidencia de contenido (valor a eliminar viene del payload)
            state.dermatologicalTreatments = state.dermatologicalTreatments.filter(
                (dt) => dt !== action.payload
            )
        },
    },
});

export const {
    updateProfile,
    addMedicalCondition,
    removeMedicalCondition,
    addTreatment,
    removeTreatment
} = userProfileSlice.actions;

export default userProfileSlice.reducer;