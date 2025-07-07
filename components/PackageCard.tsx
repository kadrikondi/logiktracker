import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Package2, User } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '@/hooks/useTheme';
import type { Package } from '@/types/package';

interface PackageCardProps {
  package: Package;
  onPress: () => void;
  allowFontScaling?: boolean;
}

export function PackageCard({ package: pkg, onPress, allowFontScaling = true }: PackageCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Package2 size={24} color={theme.colors.secondary} />
        </View>
        <View style={styles.headerInfo}>
          <Text 
            style={styles.trackingId} 
            allowFontScaling={allowFontScaling}
            numberOfLines={1}
          >
            {pkg.trackingId}
          </Text>
          <StatusBadge status={pkg.status} allowFontScaling={allowFontScaling} />
        </View>
      </View>
      
      <View style={styles.recipientInfo}>
        <View style={styles.recipientRow}>
          <User size={16} color={theme.colors.secondary} />
          <Text 
            style={styles.recipientName} 
            allowFontScaling={allowFontScaling}
            numberOfLines={1}
          >
            {pkg.recipient.name}
          </Text>
        </View>
        <Text 
          style={styles.address} 
          allowFontScaling={allowFontScaling}
          numberOfLines={2}
        >
          {pkg.recipient.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerInfo: {
    flex: 1,
    gap: 8,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  recipientInfo: {
    gap: 8,
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});