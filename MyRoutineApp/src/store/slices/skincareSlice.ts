import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductReview } from '../../utils/types/Skincare';

type SkincareState = { 
  products: Product[]; 
};

const initialState: SkincareState = {
  products: [],
};

export const skincareSlice = createSlice({
  name: 'skincare',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  addReview: (state, action: PayloadAction<{ productId: string; review: ProductReview }>) => {
      const { productId, review } = action.payload;
      state.products = state.products.map(product => {
        if (product.id === productId) {
          const existingReviews = (product as any).reviews || [];
          return {
            ...product,
            reviews: [...existingReviews, review],
          };
        }
        return product;
      });
    },
  },
});

export const { addProduct, deleteProduct, addReview } = skincareSlice.actions;
export default skincareSlice.reducer;