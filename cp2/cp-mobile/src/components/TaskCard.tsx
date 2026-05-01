import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBadge } from '@/components/StatusBadge';
import { useTheme } from '@/hooks/useTheme';
import {
  TASK_PRIORITY_LABEL,
  type Task,
} from '@/types/task';
import { formatDate } from '@/utils/formatDate';

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
}

function TaskCardBase({ task, onPress }: TaskCardProps) {
  const { colors } = useTheme();

  const priorityColor =
    task.priority === 'alta'
      ? colors.danger
      : task.priority === 'media'
      ? colors.warning
      : colors.textMuted;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(task)}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.icon}>{task.categoryIcon}</Text>

        <View style={styles.headerInfo}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: colors.text }]}
          >
            {task.title}
          </Text>
          <Text style={[styles.category, { color: colors.textMuted }]}>
            {task.category}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <StatusBadge status={task.status} />
        <View style={[styles.priority, { borderColor: priorityColor }]}>
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            Prioridade: {TASK_PRIORITY_LABEL[task.priority]}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: colors.textMuted }]}>
          Criada: {formatDate(task.createdAt)}
        </Text>
        <Text style={[styles.meta, { color: colors.textMuted }]}>
          Atualizada: {formatDate(task.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  category: {
    fontSize: 12,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#0001',
    paddingTop: 8,
  },
  meta: {
    fontSize: 11,
  },
});

export const TaskCard = memo(TaskCardBase);
