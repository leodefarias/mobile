import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';
import type { TaskStackParamList } from '@/types/navigation';
import {
  TASK_CATEGORIES,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_LABEL,
  type TaskInput,
  type TaskPriority,
  type TaskStatus,
} from '@/types/task';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

const STATUS_OPTIONS: TaskStatus[] = ['pendente', 'em_andamento', 'concluida'];
const PRIORITY_OPTIONS: TaskPriority[] = ['baixa', 'media', 'alta'];

export function TaskFormScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { addTask, updateTask, getTask } = useTasks();
  const taskId = route.params?.taskId;
  const isEditing = Boolean(taskId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState<string>(TASK_CATEGORIES[0].name);
  const [categoryIcon, setCategoryIcon] = useState<string>(
    TASK_CATEGORIES[0].icon
  );
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!taskId) {
      return;
    }
    const existing = getTask(taskId);
    if (!existing) {
      return;
    }
    setTitle(existing.title);
    setDescription(existing.description);
    setStatus(existing.status);
    setPriority(existing.priority);
    setCategory(existing.category);
    setCategoryIcon(existing.categoryIcon);
  }, [taskId, getTask]);

  const onSubmit = async () => {
    if (!title.trim()) {
      setTitleError('Título obrigatório');
      return;
    }

    setSubmitting(true);
    setTitleError('');

    const input: TaskInput = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category,
      categoryIcon,
    };

    if (isEditing && taskId) {
      await updateTask(taskId, input);
    } else {
      await addTask(input);
    }

    setSubmitting(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.heading, { color: colors.text }]}>
            {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
          </Text>

          <CustomInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Estudar React Native"
            error={titleError || undefined}
          />

          <CustomInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholder="Detalhes opcionais"
            multiline
            numberOfLines={4}
            style={styles.textarea}
          />

          <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
          <View style={styles.chipsRow}>
            {TASK_CATEGORIES.map((item) => {
              const active = item.name === category;
              return (
                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.85}
                  onPress={() => {
                    setCategory(item.name);
                    setCategoryIcon(item.icon);
                  }}
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
                    {item.icon} {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.label, { color: colors.text }]}>Status</Text>
          <View style={styles.chipsRow}>
            {STATUS_OPTIONS.map((option) => {
              const active = option === status;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.85}
                  onPress={() => setStatus(option)}
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
                    {TASK_STATUS_LABEL[option]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.label, { color: colors.text }]}>Prioridade</Text>
          <View style={styles.chipsRow}>
            {PRIORITY_OPTIONS.map((option) => {
              const active = option === priority;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.85}
                  onPress={() => setPriority(option)}
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
                    {TASK_PRIORITY_LABEL[option]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.actions}>
            <CustomButton
              title={isEditing ? 'Salvar alterações' : 'Criar tarefa'}
              onPress={onSubmit}
              loading={submitting}
            />
            <View style={styles.cancel}>
              <CustomButton
                title="Cancelar"
                onPress={() => navigation.goBack()}
                variant="secondary"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
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
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  actions: {
    marginTop: 16,
  },
  cancel: {
    marginTop: 10,
  },
});
