import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { useFontScaling } from '@/hooks/useFontScaling';
import { useTheme } from '@/hooks/useTheme';
import { statusColors, statusLabels } from '@/utils/statusColors';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { Package } from '@/types/package';

const statusOptions: Package['status'][] = ['pending', 'in-transit', 'delivered', 'failed'];

export default function UpdateStatusScreen() {
  const [selectedStatus, setSelectedStatus] = useState<Package['status'] | null>(null);
  const { fontScalingEnabled, isLoading: fontLoading } = useFontScaling();
  const { theme, isLoading: themeLoading } = useTheme();

  if (fontLoading || themeLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = () => {
    if (!selectedStatus) {
      Alert.alert('Validation Error', 'Please select a status before submitting.');
      return;
    }

    console.log('Updated status:', selectedStatus);
    Alert.alert(
      'Status Updated',
      `Package status has been updated to: ${statusLabels[selectedStatus]}`,
      [
        {
          text: 'OK',
          onPress: () => setSelectedStatus(null),
        },
      ]
    );
  };

  const renderStatusOption = (status: Package['status']) => {
    const isSelected = selectedStatus === status;
    
    return (
      <TouchableOpacity
        key={status}
        style={[
          styles.statusOption,
          isSelected && { 
            backgroundColor: statusColors[status],
            borderColor: statusColors[status],
          },
        ]}
        onPress={() => setSelectedStatus(status)}
        activeOpacity={0.7}
      >
        <View style={styles.statusContent}>
          <View style={styles.statusInfo}>
            <Text
              style={[
                styles.statusLabel,
                isSelected && { color: '#FFFFFF' },
              ]}
              allowFontScaling={fontScalingEnabled}
            >
              {statusLabels[status]}
            </Text>
            <View style={[styles.colorIndicator, { backgroundColor: statusColors[status] }]} />
          </View>
          {isSelected && (
            <CheckCircle size={24} color="#FFFFFF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} allowFontScaling={fontScalingEnabled}>
          Update Package Status
        </Text>
        <Text style={styles.subtitle} allowFontScaling={fontScalingEnabled}>
          Select the new status for the package
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle} allowFontScaling={fontScalingEnabled}>
            Package Status
          </Text>
          
          <View style={styles.statusGrid}>
            {statusOptions.map(renderStatusOption)}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedStatus && { backgroundColor: theme.colors.secondary },
          ]}
          onPress={handleSubmit}
          disabled={!selectedStatus}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.submitButtonText,
              selectedStatus && { color: '#FFFFFF' },
            ]}
            allowFontScaling={fontScalingEnabled}
          >
            Update Status
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  statusGrid: {
    gap: 12,
  },
  statusOption: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: theme.colors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
});