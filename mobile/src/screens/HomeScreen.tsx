import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import { colors, spacing } from '../theme/colors';
import { clearBeanCatalog } from '../utils/beanCatalog';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const handleClearCatalog = async () => {
    await clearBeanCatalog();
    alert('Bean catalog cleared!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Bean Rater</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Scan Coffee Beans</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyRatings')}
      >
        <Text style={styles.buttonText}>My Ratings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.testButton]}
        onPress={() => navigation.navigate('BeanDetails', { beanId: 'test-bean' })}
      >
        <Text style={styles.buttonText}>View Test Bean</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={handleClearCatalog}
      >
        <Text style={styles.buttonText}>Clear Catalog</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xlarge,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    marginBottom: spacing.medium,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: colors.secondary,
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
});
