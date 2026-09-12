import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './slices/userProfileSlice';
import skincareReducer from './slices/skincareSlice'; 

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    skincare: skincareReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;