import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';
import { performOCR } from '../utils/ocr';
import { addBeanToCatalog, findBeanByRoasterAndName } from '../utils/beanCatalog';
import { colors, spacing } from '../theme/colors';

export default function CameraScreen({ navigation }: RootStackScreenProps<'Camera'>) {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!cameraPermission.granted && !libraryPermission.granted) {
        Alert.alert(
          'Permissions Required',
          'This app needs camera and photo library permissions to work properly.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  const processImage = async (uri: string) => {
    setIsProcessing(true);
    try {
      const ocrResult = await performOCR(uri);
      console.log('OCR Results:', ocrResult);

      if (!ocrResult.possibleBeanName || !ocrResult.possibleRoaster) {
        Alert.alert(
          'Incomplete Information',
          'Could not detect the bean name or roaster. Please try taking another photo.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Store OCR result in a variable to fix scope issues
      const result = ocrResult;
      
      // First check if the bean already exists
      const existingBean = await findBeanByRoasterAndName(
        ocrResult.possibleRoaster,
        ocrResult.possibleBeanName
      );

      if (existingBean) {
        console.log('Bean found in catalog:', existingBean);
        navigation.navigate('BeanDetails', { beanId: existingBean.id });
        return;
      }

      // If we get here, the bean doesn't exist, so create it
      const newBean = await addBeanToCatalog({
        name: ocrResult.possibleBeanName,
        roaster: ocrResult.possibleRoaster,
        seller: ocrResult.possibleSeller || ocrResult.possibleRoaster,
        origin: ocrResult.allDetectedText.find(t => t.type === 'origin')?.value || '',
        processMethod: ocrResult.allDetectedText.find(t => t.type === 'process')?.value || '',
        description: `A delightful coffee from ${ocrResult.possibleRoaster}. Scan or add more details to learn more about this bean.`,
        officialTastingNotes: [],
        varieties: [],
        altitude: '',
        harvestPeriod: '',
        roastLevel: 'medium'
      });

      console.log('Created new bean in catalog:', newBean);
      navigation.navigate('BeanDetails', { beanId: newBean.id });
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert(
        'Error',
        'Failed to process the coffee bean image. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  if (isProcessing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.processingText}>Processing image...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick from Gallery</Text>
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
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    marginBottom: spacing.medium,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  processingText: {
    marginTop: spacing.medium,
    fontSize: 16,
    color: colors.text,
  },
});
