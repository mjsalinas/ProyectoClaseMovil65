export type SkinType = "normal" | "dry" | "oily" | "combination" | "sensitive";

export const SKIN_TYPES: SkinType[] = [
    "normal", 
    "dry", 
    "oily",
    "combination",
    "sensitive"
]

export const SKIN_TYPE_LABELS: Record<SkinType, string> ={
    normal: "Normal",
    dry: "Seca",
    oily: "Grasa",
    combination: "Mixta",
    sensitive: "Sensible"
}