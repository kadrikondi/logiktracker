import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Phone, MapPin, CircleCheck as CheckCircle, Package2 } from 'lucide-react-native';
import { StatusBadge } from '@/components/StatusBadge';
import { useTheme } from '@/hooks/useTheme';
import packagesData from '@/data/packages.json';
import type { Package } from '@/types/package';

export default function PackageDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  
  const packageData = packagesData.find((pkg) => pkg.id === id) as Package | undefined;

  if (!packageData) {
    const styles = createStyles(theme);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText} allowFontScaling={false}>
            Package not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleContactRecipient = () => {
    const phoneUrl = `tel:${packageData.recipient.phone}`;
    Linking.openURL(phoneUrl).catch(() => {
      Alert.alert('Error', 'Unable to open phone app');
    });
  };

  const handleMarkDelivered = () => {
    Alert.alert(
      'Mark as Delivered',
      `Mark package ${packageData.trackingId} as delivered?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Package has been marked as delivered!');
          },
        },
      ]
    );
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={theme.colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Package Details
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.packageCard}>
          <View style={styles.packageHeader}>
            <View style={styles.iconContainer}>
              <Package2 size={32} color={theme.colors.secondary} />
            </View>
            <View style={styles.packageInfo}>
              <Text style={styles.trackingId} allowFontScaling={false}>
                {packageData.trackingId}
              </Text>
              <StatusBadge status={packageData.status} allowFontScaling={false} />
            </View>
          </View>

          <View style={styles.packageDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel} allowFontScaling={false}>Type:</Text>
              <Text style={styles.detailValue} allowFontScaling={false}>{packageData.type}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel} allowFontScaling={false}>Weight:</Text>
              <Text style={styles.detailValue} allowFontScaling={false}>{packageData.weight}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel} allowFontScaling={false}>Description:</Text>
              <Text style={styles.detailValue} allowFontScaling={false}>{packageData.description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.recipientCard}>
          <Text style={styles.cardTitle} allowFontScaling={false}>
            Recipient Information
          </Text>
          
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName} allowFontScaling={false}>
              {packageData.recipient.name}
            </Text>
            
            <View style={styles.contactRow}>
              <Phone size={16} color={theme.colors.secondary} />
              <Text style={styles.contactText} allowFontScaling={false}>
                {packageData.recipient.phone}
              </Text>
            </View>
            
            <View style={styles.addressRow}>
              <MapPin size={16} color={theme.colors.secondary} />
              <Text style={styles.addressText} allowFontScaling={false}>
                {packageData.recipient.address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactRecipient}
            activeOpacity={0.8}
          >
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText} allowFontScaling={false}>
              Contact Recipient
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.deliveredButton,
              packageData.status === 'delivered' && styles.deliveredButtonDisabled,
            ]}
            onPress={handleMarkDelivered}
            disabled={packageData.status === 'delivered'}
            activeOpacity={0.8}
          >
            <CheckCircle size={20} color="#FFFFFF" />
            <Text style={styles.deliveredButtonText} allowFontScaling={false}>
              {packageData.status === 'delivered' ? 'Already Delivered' : 'Mark as Delivered'}
            </Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  packageCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  packageInfo: {
    flex: 1,
    gap: 8,
  },
  trackingId: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  packageDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  recipientCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  recipientInfo: {
    gap: 12,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.text,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  addressText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    flex: 1,
  },
  actionButtons: {
    gap: 12,
    paddingBottom: 20,
  },
  contactButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deliveredButton: {
    backgroundColor: theme.colors.success,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  deliveredButtonDisabled: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  deliveredButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.text,
  },
});