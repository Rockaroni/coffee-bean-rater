export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  seller?: string;
  origin: string;
  processMethod?: string;
  roastLevel?: 'light' | 'medium' | 'dark' | 'unknown';
  description?: string;
  officialTastingNotes?: string[];
  varieties?: string[];
  altitude?: string;
  harvestPeriod?: string;
  imageUrl?: string;
  averageRating: number;
  numberOfRatings: number;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export interface CoffeeBeanInput {
  name: string;
  roaster: string;
  seller?: string;
  origin: string;
  processMethod?: string;
  roastLevel?: 'light' | 'medium' | 'dark' | 'unknown';
  description?: string;
  officialTastingNotes?: string[];
  varieties?: string[];
  altitude?: string;
  harvestPeriod?: string;
  imageUrl?: string;
}

export interface CoffeeRating {
  id: string;
  beanId: string;
  userId: string;
  rating: number;
  notes?: string;
  personalTastingNotes?: string[];
  pricePaid?: number;
  purchaseLocation?: string;
  imageUri?: string;
  beanName: string;
  roaster: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeRatingInput {
  beanId: string;
  rating: number;
  notes?: string;
  personalTastingNotes?: string[];
  pricePaid?: number;
  purchaseLocation?: string;
  imageUri?: string;
  beanName: string;
  roaster: string;
}
