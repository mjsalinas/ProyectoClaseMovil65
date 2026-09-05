import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type UserProfile = {
    name: string;
    age: string;
    skinType: string;
    medicalConditions: string[];
    dermatologicalTreatments: string[];
}

const initialUserProfile: UserProfile = {
    name: "",
    age: "",
    skinType: "",
    medicalConditions: [],
    dermatologicalTreatments: [],
};

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: initialUserProfile,
    reducers: {
        updateProfile: (state, action: PayloadAction<UserProfile>)=>{

        },
        addMedicalCondition: (state, action: PayloadAction<string>)=>{
            
        },
        removeMedicalCondition: (state, action: PayloadAction<string>)=>{
            
        },
        addTreatment: (state, action: PayloadAction<string>)=>{

        },
        removeTreatment: (state, action: PayloadAction<string>)=>{

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