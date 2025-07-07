import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Type, Moon, LogOut, User } from 'lucide-react-native';
import { useFontScaling } from '@/hooks/useFontScaling';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { fontScalingEnabled, updateFontScaling, isLoading: fontLoading } = useFontScaling();
  const { theme, isDarkMode, toggleTheme, isLoading: themeLoading } = useTheme();
  const { authState, logout } = useAuth();

  if (fontLoading || themeLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress:  router.replace('/login'),
        },
      ]
    );
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} allowFontScaling={false}>
          Settings
        </Text>
        <Text style={styles.subtitle} allowFontScaling={false}>
          Configure your app preferences
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>
            Profile
          </Text>
          
          <View style={styles.profileItem}>
            <View style={styles.profileInfo}>
              <View style={styles.iconContainer}>
                <User size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.profileName} allowFontScaling={false}>
                  {authState.user?.name}
                </Text>
                <Text style={styles.profileEmail} allowFontScaling={false}>
                  {authState.user?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Display Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>
            Display
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Type size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel} allowFontScaling={false}>
                  Enable Font Scaling
                </Text>
                <Text style={styles.settingDescription} allowFontScaling={false}>
                  Allow text to scale with device accessibility settings
                </Text>
              </View>
            </View>
            <Switch
              value={fontScalingEnabled}
              onValueChange={updateFontScaling}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.secondary,
              }}
              thumbColor={fontScalingEnabled ? theme.colors.success : theme.colors.surface}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Moon size={20} color={theme.colors.secondary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel} allowFontScaling={false}>
                  Dark Mode
                </Text>
                <Text style={styles.settingDescription} allowFontScaling={false}>
                  Switch between light and dark themes
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.secondary,
              }}
              thumbColor={isDarkMode ? theme.colors.success : theme.colors.surface}
            />
          </View>
        </View>

        {/* Account Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>
            Account
          </Text>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.logoutInfo}>
              <View style={[styles.iconContainer, styles.logoutIconContainer]}>
                <LogOut size={20} color={theme.colors.error} />
              </View>
              <Text style={styles.logoutText} allowFontScaling={false}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle} allowFontScaling={false}>
            Settings Information
          </Text>
          <Text style={styles.infoText} allowFontScaling={false}>
            • Dashboard & Update screens: Respect font scaling setting{'\n'}
            • Package Details & Settings screens: Fixed font sizes{'\n'}
            • Dark mode applies to all screens{'\n'}
            • All settings are automatically saved to device storage
          </Text>
        </View>


         {/* Developer Credit Section */}
         <View style={styles.creditSection}>
          <Text style={styles.creditText} allowFontScaling={false}>
            CODE WITH REACTNATIVE BY KONDIPRESS 08038863055
          </Text>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40, // Extra padding at bottom for better scroll experience
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
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
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  logoutButton: {
    marginBottom: 8,
  },
  logoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIconContainer: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.error,
  },
  infoBox: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  creditSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  creditText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});