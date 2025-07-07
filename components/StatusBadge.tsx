import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { statusColors, statusLabels } from '@/utils/statusColors';
import type { Package } from '@/types/package';

interface StatusBadgeProps {
  status: Package['status'];
  allowFontScaling?: boolean;
}

export function StatusBadge({ status, allowFontScaling = true }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <Text 
        style={[styles.badgeText, { color: '#FFFFFF' }]}
        allowFontScaling={allowFontScaling}
      >
        {statusLabels[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});