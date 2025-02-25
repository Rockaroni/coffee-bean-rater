import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoffeeRating, CoffeeRatingInput } from '../types/coffee';

const STORAGE_KEY = '@coffee_ratings';

export async function saveRating(rating: CoffeeRatingInput): Promise<CoffeeRating> {
  try {
    // Get existing ratings
    const existingRatings = await getRatings();

    // Create new rating with ID and timestamp
    const newRating: CoffeeRating = {
      ...rating,
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: 'anonymous', // For future authentication
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add new rating to the list
    const updatedRatings = [newRating, ...existingRatings];

    // Save to storage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));

    return newRating;
  } catch (error) {
    console.error('Error saving rating:', error);
    throw error;
  }
}

export async function getRatings(): Promise<CoffeeRating[]> {
  try {
    const ratingsJson = await AsyncStorage.getItem(STORAGE_KEY);
    return ratingsJson ? JSON.parse(ratingsJson) : [];
  } catch (error) {
    console.error('Error getting ratings:', error);
    return [];
  }
}

export async function getRatingById(id: string): Promise<CoffeeRating | null> {
  try {
    const ratings = await getRatings();
    return ratings.find(rating => rating.id === id) || null;
  } catch (error) {
    console.error('Error getting rating by id:', error);
    return null;
  }
}

export async function deleteRating(id: string): Promise<void> {
  try {
    const ratings = await getRatings();
    const updatedRatings = ratings.filter(rating => rating.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));
  } catch (error) {
    console.error('Error deleting rating:', error);
    throw error;
  }
}
