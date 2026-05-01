import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string } | undefined;
  TaskDetail: { taskId: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  TasksTab: NavigatorScreenParams<TaskStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};
