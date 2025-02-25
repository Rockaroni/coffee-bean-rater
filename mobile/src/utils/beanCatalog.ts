import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoffeeBean, CoffeeBeanInput } from '../types/coffee';

const STORAGE_KEY = '@coffee_beans';

// Test bean data
const TEST_BEAN: CoffeeBean = {
  id: 'test-bean',
  name: 'Ethiopia Yirgacheffe',
  roaster: 'Example Roasters',
  origin: 'Ethiopia',
  processMethod: 'Washed',
  roastLevel: 'medium',
  description: 'A bright and complex coffee with floral notes and citrus acidity.',
  officialTastingNotes: ['Jasmine', 'Bergamot', 'Lemon', 'Black Tea'],
  varieties: ['Heirloom'],
  altitude: '1,900-2,100m',
  harvestPeriod: 'October-December',
  averageRating: 4.5,
  numberOfRatings: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isVerified: true,
};

export async function getBeans(): Promise<CoffeeBean[]> {
  try {
    const beansJson = await AsyncStorage.getItem(STORAGE_KEY);
    const beans = beansJson ? JSON.parse(beansJson) : [];
    return [TEST_BEAN, ...beans];
  } catch (error) {
    console.error('Error getting beans:', error);
    return [TEST_BEAN];
  }
}

export async function getBeanById(id: string): Promise<CoffeeBean | null> {
  if (id === 'test-bean') {
    return TEST_BEAN;
  }

  try {
    const beans = await getBeans();
    return beans.find(bean => bean.id === id) || null;
  } catch (error) {
    console.error('Error getting bean by id:', error);
    return null;
  }
}

export async function findBeanByRoasterAndName(roaster: string, name: string): Promise<CoffeeBean | null> {
  try {
    const beans = await getBeans();
    return beans.find(
      bean => 
        bean.roaster.toLowerCase() === roaster.toLowerCase() &&
        bean.name.toLowerCase() === name.toLowerCase()
    ) || null;
  } catch (error) {
    console.error('Error finding bean:', error);
    return null;
  }
}

export async function addBeanToCatalog(input: CoffeeBeanInput): Promise<CoffeeBean> {
  try {
    const beans = await getBeans();
    
    // Create new bean with generated fields
    const newBean: CoffeeBean = {
      ...input,
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      averageRating: 0,
      numberOfRatings: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVerified: false,
    };

    // Add to storage (excluding test bean)
    const storageBeans = beans.filter(bean => bean.id !== 'test-bean');
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newBean, ...storageBeans]));

    return newBean;
  } catch (error) {
    console.error('Error adding bean to catalog:', error);
    throw error;
  }
}

export async function clearBeanCatalog(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing bean catalog:', error);
    throw error;
  }
}
