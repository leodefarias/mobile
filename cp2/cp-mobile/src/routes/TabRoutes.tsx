import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { HomeStackRoutes } from '@/routes/HomeStackRoutes';
import { TaskStackRoutes } from '@/routes/TaskStackRoutes';
import { SettingsStackRoutes } from '@/routes/SettingsStackRoutes';
import type { TabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, string> = {
  HomeTab: '🏠',
  TasksTab: '✅',
  SettingsTab: '⚙️',
};

export function TabRoutes() {
  const { user } = useAuth();
  const { colors } = useTheme();

  const initial: keyof TabParamList =
    user?.role === 'admin' ? 'SettingsTab' : 'HomeTab';

  return (
    <Tab.Navigator
      initialRouteName={initial}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 18 }}>{ICONS[route.name]}</Text>
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackRoutes}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="TasksTab"
        component={TaskStackRoutes}
        options={{ title: 'Tarefas' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackRoutes}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}
