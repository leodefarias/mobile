import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StoredUser, Treatment } from '@/types/user';

const USER_KEY = '@taskflow:auth_user';
const TREATMENT_KEY = '@taskflow:treatment';

export async function getStoredUser(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export async function setStoredUser(user: StoredUser): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function clearStoredUser(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function getStoredTreatment(): Promise<Treatment | null> {
  const value = await AsyncStorage.getItem(TREATMENT_KEY);

  if (value === 'Sr.' || value === 'Sra.' || value === 'Srta.') {
    return value;
  }

  return null;
}

export async function setStoredTreatment(treatment: Treatment): Promise<void> {
  await AsyncStorage.setItem(TREATMENT_KEY, treatment);
}
