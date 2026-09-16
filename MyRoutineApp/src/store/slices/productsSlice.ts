import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReview } from "../../utils/types/Skincare";

type ProductsState = Product[];

const initialState: ProductsState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      state.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      return state.filter((product) => product.id !== action.payload);
    },
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: ProductReview }>,
    ) => {
      const product = state.find((p) => p.id === action.payload.productId);
      if (product) {
        product.review = action.payload.review;
      }
    },
  },
});

export const { addProduct, deleteProduct, addReview } = productsSlice.actions;
export default productsSlice.reducer;
