import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import BeanDetailsScreen from './src/screens/BeanDetailsScreen';
import MyRatingsScreen from './src/screens/MyRatingsScreen';
import AddRatingScreen from './src/screens/AddRatingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="BeanDetails" component={BeanDetailsScreen} />
        <Stack.Screen name="MyRatings" component={MyRatingsScreen} />
        <Stack.Screen name="AddRating" component={AddRatingScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
