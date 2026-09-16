import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Routine } from "../../utils/types/Skincare";
import { deleteProduct } from "./productsSlice";

type RoutinePayload = {
  type: "morning" | "night";
  productId: string;
};

const initialState: Routine = {
  morning: [],
  night: [],
};

const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {
    addToRoutine: (state, action: PayloadAction<RoutinePayload>) => {
      const { type, productId } = action.payload;
      if (state[type].includes(productId)) return;
      state[type].push(productId);
    },
    removeFromRoutine: (state, action: PayloadAction<RoutinePayload>) => {
      const { type, productId } = action.payload;
      state[type] = state[type].filter((id) => id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct, (state, action) => {
      state.morning = state.morning.filter((id) => id !== action.payload);
      state.night = state.night.filter((id) => id !== action.payload);
    });
  },
});

export const { addToRoutine, removeFromRoutine } = routineSlice.actions;
export default routineSlice.reducer;
