import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import { CoffeeBean } from '../types/coffee';
import { getBeanById } from '../utils/beanCatalog';
import { getRatingById } from '../utils/storage';
import { colors, spacing } from '../theme/colors';

export default function BeanDetailsScreen({ route, navigation }: RootStackScreenProps<'BeanDetails'>) {
  const [bean, setBean] = useState<CoffeeBean | null>(null);
  const { beanId, ratingId } = route.params;

  useEffect(() => {
    loadData();
  }, [beanId, ratingId]);

  const loadData = async () => {
    try {
      if (ratingId) {
        const rating = await getRatingById(ratingId);
        if (rating) {
          const beanData = await getBeanById(rating.beanId);
          setBean(beanData);
        }
      } else if (beanId) {
        const beanData = await getBeanById(beanId);
        setBean(beanData);
      }
    } catch (error) {
      console.error('Error loading bean details:', error);
      Alert.alert('Error', 'Failed to load bean details');
    }
  };

  if (!bean) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{bean.name}</Text>
        <Text style={styles.roaster}>{bean.roaster}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.detail}>Origin: {bean.origin || 'Unknown'}</Text>
          <Text style={styles.detail}>Process: {bean.processMethod || 'Unknown'}</Text>
          <Text style={styles.detail}>Roast Level: {bean.roastLevel || 'Unknown'}</Text>
          {bean.altitude && <Text style={styles.detail}>Altitude: {bean.altitude}</Text>}
          {bean.harvestPeriod && <Text style={styles.detail}>Harvest: {bean.harvestPeriod}</Text>}
        </View>

        {bean.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{bean.description}</Text>
          </View>
        )}

        {bean.officialTastingNotes && bean.officialTastingNotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Official Tasting Notes</Text>
            {bean.officialTastingNotes.map((note, index) => (
              <Text key={index} style={styles.tastingNote}>{note}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.rateButton}
          onPress={() => navigation.navigate('AddRating', {
            imageUri: bean.imageUrl || '',
            suggestedBeanName: bean.name,
            suggestedRoaster: bean.roaster,
          })}
        >
          <Text style={styles.rateButtonText}>Rate this Coffee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  roaster: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
  },
  section: {
    marginBottom: spacing.large,
    backgroundColor: colors.surface,
    padding: spacing.medium,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.small,
  },
  detail: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.small,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  tastingNote: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.tiny,
  },
  rateButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
