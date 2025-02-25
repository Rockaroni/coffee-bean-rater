import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  BeanDetails: { beanId?: string; ratingId?: string };
  MyRatings: undefined;
  AddRating: {
    imageUri: string;
    suggestedBeanName?: string;
    suggestedRoaster?: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;
