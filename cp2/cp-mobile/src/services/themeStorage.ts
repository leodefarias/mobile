import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'light' | 'dark';

const KEY = '@taskflow:theme';

export async function getStoredTheme(): Promise<ThemeName | null> {
  const value = await AsyncStorage.getItem(KEY);

  if (value === 'light' || value === 'dark') {
    return value;
  }

  return null;
}

export async function setStoredTheme(theme: ThemeName): Promise<void> {
  await AsyncStorage.setItem(KEY, theme);
}
