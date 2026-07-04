export interface Workshop {
  id: string;
  title: string;
  date: string;
  fullDescription: string;
  location: string;
  imageUrls: string[];
  organizers: string;
}

export interface NutrientRow {
  nutrient: string;
  perSample: string;
  per100g: string;
}

export interface Recipe {
  id: string;
  name: string;
  yieldInfo: string;
  ingredients: string[];
  instructions: string[];
  imageUrls: string[];
  nutritiveValues: NutrientRow[];
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  speaker: string;
  description: string;
  uploadDate: string;
  tags: string;
}

export interface About {
  id: string;
  section: string;
  heading: string;
  content: string;
  imageUrls: string[];
  order: number;
}

export interface Committee {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  university: string;
}

export interface University {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
}

export type ServiceResult<T> = T[] | { error: string };
