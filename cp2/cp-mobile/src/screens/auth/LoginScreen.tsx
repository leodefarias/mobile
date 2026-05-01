import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Preencha usuário e senha');
      return;
    }

    setSubmitting(true);
    setError('');
    const ok = await login(username.trim(), password.trim());
    setSubmitting(false);

    if (!ok) {
      setError('Credenciais inválidas');
    }
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
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.title, { color: colors.text }]}>
              TaskFlow
            </Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Entre para gerenciar suas tarefas
            </Text>

            <CustomInput
              label="Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="admin ou user"
            />

            <CustomInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="123"
              error={error || undefined}
            />

            <CustomButton
              title={submitting ? 'Entrando...' : 'Entrar'}
              onPress={onSubmit}
              loading={submitting}
            />

            <Text style={[styles.hint, { color: colors.textMuted }]}>
              Usuários disponíveis: admin / 123 — user / 123
            </Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  hint: {
    fontSize: 12,
    marginTop: 14,
    textAlign: 'center',
  },
});
