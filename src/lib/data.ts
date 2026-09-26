import type {
  Pack,
  ModelOption,
  StyleOption,
  BackgroundOption,
  Category,
  PoseFamily,
} from "./types";

// Ported exactly from the approved prototype (artifact 21bfdce7-...).
// This is placeholder library data — swap in real photos/models later,
// per the backend plan's "content library" section. Structure stays the same.

export const PACKS: Pack[] = [
  { id: "p1", name: "Pack 1", title: "Single look", desc: "One garment in, one finished look out.", images: 1, credits: 3 },
  { id: "p2", name: "Pack 2", title: "Double look", desc: "Two garments styled in the same session.", images: 2, credits: 6 },
  { id: "p3", name: "Pack 3", title: "Triple look", desc: "Three garments on one consistent model.", images: 3, credits: 8 },
];

export const AGE_RANGES: Record<Category, string[]> = {
  kids: ["0–2 yrs", "3–5 yrs", "6–9 yrs", "10–12 yrs", "13–15 yrs"],
  adult: ["18–24", "25–34", "35–44", "45–59"],
  seniors: ["60–69 yrs", "70+ yrs"],
};

export const MODEL_TINTS = ["#E3A73F", "#6FA89A", "#8C9BC4", "#B7A25A", "#8FA0A6", "#BE93A6"];

export const MODELS: ModelOption[] = [
  { id: "m1", name: "Aria", gender: "female", category: "adult", seed: 0 },
  { id: "m2", name: "Noor", gender: "female", category: "adult", seed: 1 },
  { id: "m3", name: "Priya", gender: "female", category: "adult", seed: 2 },
  { id: "m4", name: "Leah", gender: "female", category: "seniors", seed: 3 },
  { id: "m5", name: "Grace", gender: "female", category: "seniors", seed: 4 },
  { id: "m6", name: "Mia", gender: "female", category: "kids", seed: 5 },
  { id: "m7", name: "Zoe", gender: "female", category: "kids", seed: 0 },
  { id: "m8", name: "Kabir", gender: "male", category: "adult", seed: 1 },
  { id: "m9", name: "Rohan", gender: "male", category: "adult", seed: 2 },
  { id: "m10", name: "Ethan", gender: "male", category: "adult", seed: 3 },
  { id: "m11", name: "Arthur", gender: "male", category: "seniors", seed: 4 },
  { id: "m12", name: "Walter", gender: "male", category: "seniors", seed: 5 },
  { id: "m13", name: "Leo", gender: "male", category: "kids", seed: 0 },
  { id: "m14", name: "Max", gender: "male", category: "kids", seed: 1 },
];

export const STYLES: StyleOption[] = [
  { id: "s1", name: "Classic standing", cats: ["kids", "adult", "seniors"], fam: "standing" },
  { id: "s2", name: "Hand on hip", cats: ["adult", "seniors"], fam: "standing" },
  { id: "s3", name: "Walking stride", cats: ["adult"], fam: "action" },
  { id: "s4", name: "Three-quarter turn", cats: ["kids", "adult", "seniors"], fam: "standing" },
  { id: "s5", name: "Seated casual", cats: ["kids", "adult", "seniors"], fam: "seated" },
  { id: "s6", name: "Runway walk", cats: ["adult"], fam: "action" },
  { id: "s7", name: "Over the shoulder", cats: ["adult", "seniors"], fam: "standing" },
  { id: "s8", name: "Playful jump", cats: ["kids"], fam: "action" },
  { id: "s9", name: "Cross-legged sit", cats: ["kids"], fam: "seated" },
  { id: "s10", name: "Peekaboo pose", cats: ["kids"], fam: "seated" },
  { id: "s11", name: "Relaxed lean", cats: ["adult", "seniors"], fam: "standing" },
  { id: "s12", name: "Power pose", cats: ["adult"], fam: "action" },
  { id: "s13", name: "Gentle portrait", cats: ["seniors", "adult"], fam: "portrait" },
  { id: "s14", name: "Close-up portrait", cats: ["kids", "adult", "seniors"], fam: "portrait" },
];

export const POSE_FAM: Record<PoseFamily, { scale: number; ty: number; rot: number }> = {
  standing: { scale: 1, ty: 0, rot: 0 },
  seated: { scale: 0.86, ty: 62, rot: 0 },
  action: { scale: 1, ty: -4, rot: -7 },
  portrait: { scale: 1.9, ty: 150, rot: 0 },
};

export const STYLE_HUES: Record<PoseFamily, number> = {
  standing: 42,
  seated: 168,
  action: 206,
  portrait: 266,
};

export const BACKGROUNDS: Record<"indoor" | "outdoor", BackgroundOption[]> = {
  indoor: [
    { id: "i1", name: "Studio white backdrop" },
    { id: "i2", name: "Minimalist loft" },
    { id: "i3", name: "Boutique interior" },
    { id: "i4", name: "Cozy living room" },
    { id: "i5", name: "Café corner" },
    { id: "i6", name: "Marble hallway" },
    { id: "i7", name: "Library nook" },
    { id: "i8", name: "Industrial warehouse" },
    { id: "i9", name: "Retail storefront" },
    { id: "i10", name: "Art gallery wall" },
    { id: "i11", name: "Bedroom chic" },
    { id: "i12", name: "Spiral staircase" },
  ],
  outdoor: [
    { id: "o1", name: "Urban street" },
    { id: "o2", name: "City rooftop" },
    { id: "o3", name: "Park greenery" },
    { id: "o4", name: "Beach shoreline" },
    { id: "o5", name: "Garden terrace" },
    { id: "o6", name: "Desert dunes" },
    { id: "o7", name: "Countryside field" },
    { id: "o8", name: "Poolside" },
    { id: "o9", name: "Mountain backdrop" },
    { id: "o10", name: "Golden hour meadow" },
    { id: "o11", name: "Graffiti alley" },
    { id: "o12", name: "Botanical garden" },
  ],
};