export interface Workshop {
  id: string;
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  capacity: number;
  location: string;
  imageUrls: string[];
  registrationLink: string;
}

export interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrls: string[];
  cuisine: string;
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
