import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { PackageCard } from '@/components/PackageCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useFontScaling } from '@/hooks/useFontScaling';
import { useTheme } from '@/hooks/useTheme';
import packagesData from '@/data/packages.json';
import type { Package } from '@/types/package';

export default function DashboardScreen() {
  const router = useRouter();
  const { fontScalingEnabled, isLoading: fontLoading } = useFontScaling();
  const { theme, isLoading: themeLoading } = useTheme();

  if (fontLoading || themeLoading) {
    return <LoadingSpinner />;
  }

  const handlePackagePress = (packageId: string) => {
    router.push(`/package/${packageId}`);
  };

  const renderPackageCard = ({ item }: { item: Package }) => (
    <PackageCard
      package={item}
      onPress={() => handlePackagePress(item.id)}
      allowFontScaling={fontScalingEnabled}
    />
  );

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} allowFontScaling={fontScalingEnabled}>
          LogiTrack Dashboard
        </Text>
        <Text style={styles.subtitle} allowFontScaling={fontScalingEnabled}>
          {packagesData.length} packages to track
        </Text>
      </View>

      <FlatList
        data={packagesData}
        renderItem={renderPackageCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  listContainer: {
    paddingVertical: 8,
  },
});