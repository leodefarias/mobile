import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '@/components/CustomButton';
import { EmptyState } from '@/components/EmptyState';
import { FilterBar } from '@/components/FilterBar';
import { Header } from '@/components/Header';
import { TaskCard } from '@/components/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';
import type { Task, TaskFilter } from '@/types/task';
import type { TaskStackParamList } from '@/types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<TaskFilter>('todas');
  const [search, setSearch] = useState('');
  const { filtered, loading, tasks } = useTasks(filter, search);

  const onPressTask = useCallback(
    (task: Task) => {
      navigation.navigate('TaskDetail', { taskId: task.id });
    },
    [navigation]
  );

  const goNew = useCallback(() => {
    navigation.navigate('TaskForm', {});
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <Header title="Tarefas" />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onPress={onPressTask} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title={
                tasks.length === 0
                  ? 'Nenhuma tarefa cadastrada'
                  : 'Nenhuma tarefa encontrada'
              }
              description={
                tasks.length === 0
                  ? 'Crie sua primeira tarefa para começar.'
                  : 'Tente alterar o filtro ou a busca.'
              }
              actionTitle={tasks.length === 0 ? 'Criar tarefa' : undefined}
              onAction={tasks.length === 0 ? goNew : undefined}
            />
          }
        />
      )}

      <View style={styles.fab}>
        <CustomButton title="+ Nova tarefa" onPress={goNew} />
      </View>
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
  },
  listContent: {
    paddingBottom: 90,
  },
  fab: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
});
