export type ProductCategory =
  | "cleanser"
  | "toner"
  | "serum"
  | "moisturizer"
  | "sunscreen"
  | "treatment"
  | "other";

export type UsageTimeUnit = "days" | "weeks";

export type ProductReview = {
  rating: number;
  comment: string;
  usageDuration: number;
  usageUnit: UsageTimeUnit;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  review?: ProductReview;
};

export type Routine = {
  morning: string[];
  night: string[];
};

export type SkinType =
  | "normal"
  | "dry"
  | "oily"
  | "combination"
  | "sensitive";

export type UserProfile = {
  name: string;
  age: string;
  skinType: SkinType;
  medicalConditions: string[];
  dermatologicalTreatments: string[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "cleanser",
  "toner",
  "serum",
  "moisturizer",
  "sunscreen",
  "treatment",
  "other",
];

export const SKIN_TYPES: SkinType[] = [
  "normal",
  "dry",
  "oily",
  "combination",
  "sensitive",
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  cleanser: "Limpiador",
  toner: "Tónico",
  serum: "Sérum",
  moisturizer: "Hidratante",
  sunscreen: "Protector solar",
  treatment: "Tratamiento",
  other: "Otro",
};

export const SKIN_TYPE_LABELS: Record<SkinType, string> = {
  normal: "Normal",
  dry: "Seca",
  oily: "Grasa",
  combination: "Mixta",
  sensitive: "Sensible",
};
