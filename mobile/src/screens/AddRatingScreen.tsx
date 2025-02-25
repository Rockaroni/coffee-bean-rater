import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import { saveRating } from '../utils/storage';
import { colors, spacing } from '../theme/colors';

export default function AddRatingScreen({
  route,
  navigation,
}: RootStackScreenProps<'AddRating'>) {
  const { imageUri, suggestedBeanName, suggestedRoaster } = route.params;

  const [beanName, setBeanName] = useState(suggestedBeanName || '');
  const [roaster, setRoaster] = useState(suggestedRoaster || '');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    if (!beanName || !roaster || !rating) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const numericRating = parseFloat(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      Alert.alert('Error', 'Rating must be a number between 1 and 5');
      return;
    }

    try {
      await saveRating({
        beanId: 'temp', // This will be replaced with actual bean ID
        beanName,
        roaster,
        rating: numericRating,
        notes,
        pricePaid: price ? parseFloat(price) : undefined,
        purchaseLocation: location || undefined,
        imageUri,
      });

      navigation.navigate('MyRatings');
    } catch (error) {
      console.error('Error saving rating:', error);
      Alert.alert('Error', 'Failed to save rating');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Bean Name *</Text>
        <TextInput
          style={styles.input}
          value={beanName}
          onChangeText={setBeanName}
          placeholder="Enter bean name"
        />

        <Text style={styles.label}>Roaster *</Text>
        <TextInput
          style={styles.input}
          value={roaster}
          onChangeText={setRoaster}
          placeholder="Enter roaster name"
        />

        <Text style={styles.label}>Rating (1-5) *</Text>
        <TextInput
          style={styles.input}
          value={rating}
          onChangeText={setRating}
          placeholder="Enter rating"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter your tasting notes"
          multiline
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Purchase Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter purchase location"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Rating</Text>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
