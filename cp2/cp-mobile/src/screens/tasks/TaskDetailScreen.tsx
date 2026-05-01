import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '@/components/CustomButton';
import { StatusBadge } from '@/components/StatusBadge';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';
import {
  TASK_PRIORITY_LABEL,
  type Task,
} from '@/types/task';
import type { TaskStackParamList } from '@/types/navigation';
import { formatDate } from '@/utils/formatDate';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export function TaskDetailScreen({ navigation, route }: Props) {
  const { taskId } = route.params;
  const { colors } = useTheme();
  const { getTask, removeTask } = useTasks();

  const task: Task | undefined = getTask(taskId);

  if (!task) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: colors.background }]}
      >
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: colors.text }]}>
            Tarefa não encontrada
          </Text>
          <CustomButton
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const askDelete = () => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await removeTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={styles.icon}>{task.categoryIcon}</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {task.title}
          </Text>
          <Text style={[styles.category, { color: colors.textMuted }]}>
            {task.category}
          </Text>

          <View style={styles.row}>
            <StatusBadge status={task.status} />
          </View>

          <Text style={[styles.label, { color: colors.text }]}>Prioridade</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {TASK_PRIORITY_LABEL[task.priority]}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {task.description || 'Sem descrição'}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Criada em</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {formatDate(task.createdAt)}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>
            Atualizada em
          </Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {formatDate(task.updatedAt)}
          </Text>
        </View>

        <View style={styles.actions}>
          <CustomButton
            title="Editar"
            onPress={() =>
              navigation.navigate('TaskForm', { taskId: task.id })
            }
          />
          <View style={styles.gap}>
            <CustomButton
              title="Excluir"
              onPress={askDelete}
              variant="danger"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFound: {
    fontSize: 16,
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  icon: {
    fontSize: 36,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  category: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 12,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12,
  },
  value: {
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    marginTop: 16,
  },
  gap: {
    marginTop: 10,
  },
});
