import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '@/components/CustomButton';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useTasks } from '@/hooks/useTasks';
import { getRandomQuote, type QuoteResponse } from '@/services/api';
import type {
  HomeStackParamList,
  TabParamList,
} from '@/types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { user, treatment } = useAuth();
  const { colors } = useTheme();
  const { tasks } = useTasks();

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState('');

  const loadQuote = useCallback(async () => {
    try {
      setLoadingQuote(true);
      setQuoteError('');
      const response = await getRandomQuote();
      setQuote(response);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao buscar frase';
      setQuoteError(message);
    } finally {
      setLoadingQuote(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const goToTasks = () => {
    const parent = navigation.getParent<BottomTabNavigationProp<TabParamList>>();
    parent?.navigate('TasksTab', { screen: 'TaskList' });
  };

  const pendingCount = tasks.filter((task) => task.status === 'pendente').length;
  const inProgressCount = tasks.filter(
    (task) => task.status === 'em_andamento'
  ).length;
  const doneCount = tasks.filter((task) => task.status === 'concluida').length;

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <Header title="Início" />

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.welcome, { color: colors.text }]}>
            Bem-vindo, {treatment} {user?.name ?? 'usuário'}!
          </Text>
          <Text style={[styles.welcomeMuted, { color: colors.textMuted }]}>
            Organize suas tarefas e mantenha o foco no que importa.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Frase motivacional do dia
          </Text>

          {loadingQuote ? (
            <ActivityIndicator color={colors.primary} style={styles.spinner} />
          ) : quoteError ? (
            <View>
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {quoteError}
              </Text>
              <View style={styles.retry}>
                <CustomButton
                  title="Tentar novamente"
                  onPress={loadQuote}
                  variant="secondary"
                />
              </View>
            </View>
          ) : quote ? (
            <View>
              <Text style={[styles.quote, { color: colors.text }]}>
                “{quote.quote}”
              </Text>
              <Text style={[styles.author, { color: colors.textMuted }]}>
                — {quote.author}
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Resumo das tarefas
          </Text>
          <Text style={[styles.summary, { color: colors.textMuted }]}>
            Pendentes: {pendingCount}
          </Text>
          <Text style={[styles.summary, { color: colors.textMuted }]}>
            Em andamento: {inProgressCount}
          </Text>
          <Text style={[styles.summary, { color: colors.textMuted }]}>
            Concluídas: {doneCount}
          </Text>

          <View style={styles.cta}>
            <CustomButton title="Ir para Tarefas" onPress={goToTasks} />
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
  content: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  welcomeMuted: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
  },
  spinner: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 8,
  },
  retry: {
    marginTop: 8,
  },
  summary: {
    fontSize: 14,
    marginVertical: 2,
  },
  cta: {
    marginTop: 12,
  },
});
