import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import type { TaskFilter } from '@/types/task';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (next: TaskFilter) => void;
  search: string;
  onSearchChange: (next: string) => void;
}

const OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluida', label: 'Concluídas' },
];

export function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Buscar tarefa"
        placeholderTextColor={colors.textMuted}
        style={[
          styles.search,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      <View style={styles.row}>
        {OPTIONS.map((option) => {
          const active = filter === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() => onFilterChange(option.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: active ? colors.primaryText : colors.text },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
