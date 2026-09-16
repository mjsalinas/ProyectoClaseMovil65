import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./slices/userProfileSlice";
import productsReducer from "./slices/productsSlice";
import routineReducer from "./slices/routineSlice";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    products: productsReducer,
    routine: routineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;