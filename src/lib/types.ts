export type Gender = "male" | "female";
export type Category = "kids" | "adult" | "seniors";
export type BgType = "indoor" | "outdoor";
export type PoseFamily = "standing" | "seated" | "action" | "portrait";

export interface Pack {
  id: string;
  name: string;
  title: string;
  desc: string;
  images: number;
  credits: number;
}

export interface ModelOption {
  id: string;
  name: string;
  gender: Gender;
  category: Category;
  seed: number;
}

export interface StyleOption {
  id: string;
  name: string;
  cats: Category[];
  fam: PoseFamily;
}

export interface BackgroundOption {
  id: string;
  name: string;
}

export interface UploadedGarment {
  name: string;
  dataUrl: string;
}

export interface Selections {
  packId: string | null;
  gender: Gender | null;
  category: Category | null;
  age: string | null;
  modelId: string | null;
  styleId: string | null;
  bgType: BgType | null;
  bgId: string | null;
  batchName: string;
  uploads: (UploadedGarment | undefined)[];
}

export interface ResultImage {
  id: string;
  filename: string;
  svg: string;
  thumb: string | null;
}

export interface AuthUser {
  name: string;
  email: string;
}

export type Theme = "light" | "dark";

// Which field of Selections each form section validates against —
// used to jump/flash the right section when Generate is clicked early.
export interface RequiredField {
  key: keyof Selections;
  sectionId: string;
  message: string;
}