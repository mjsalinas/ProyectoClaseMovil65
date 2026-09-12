import { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductReview } from "../utils/types/Skincare";

type SkincareContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, review: ProductReview) => void;
};

const SkincareContext = createContext<SkincareContextType | null>(null);

export const useSkincare = () => {
  const context = useContext(SkincareContext);
  if (!context) {
    throw new Error("useSkincare debe usarse dentro de SkincareProvider");
  }
  return context;
};

export function SkincareProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addReview = (productId: string, review: ProductReview) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, review } : p)),
    );
  };

  return (
    <SkincareContext.Provider
      value={{ products, addProduct, deleteProduct, addReview }}
    >
      {children}
    </SkincareContext.Provider>
  );
}
