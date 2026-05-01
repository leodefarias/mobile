import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {
  TASK_STATUS_LABEL,
  type TaskStatus,
} from '@/types/task';

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useTheme();

  const backgroundColor =
    status === 'concluida'
      ? colors.success
      : status === 'em_andamento'
      ? colors.warning
      : colors.textMuted;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{TASK_STATUS_LABEL[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
