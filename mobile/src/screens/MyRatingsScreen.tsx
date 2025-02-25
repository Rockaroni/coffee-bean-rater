import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import { CoffeeRating } from '../types/coffee';
import { getRatings } from '../utils/storage';
import { colors, spacing } from '../theme/colors';

export default function MyRatingsScreen({ navigation }: RootStackScreenProps<'MyRatings'>) {
  const [ratings, setRatings] = useState<CoffeeRating[]>([]);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      const userRatings = await getRatings();
      setRatings(userRatings);
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  };

  const renderRating = ({ item }: { item: CoffeeRating }) => (
    <TouchableOpacity
      style={styles.ratingCard}
      onPress={() => navigation.navigate('BeanDetails', { ratingId: item.id })}
    >
      <Text style={styles.beanName}>{item.beanName}</Text>
      <Text style={styles.roaster}>{item.roaster}</Text>
      <Text style={styles.rating}>Rating: {item.rating}/5</Text>
      {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ratings}
        renderItem={renderRating}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.medium,
  },
  ratingCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  beanName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  roaster: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.small,
  },
  rating: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: spacing.small,
  },
  notes: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
