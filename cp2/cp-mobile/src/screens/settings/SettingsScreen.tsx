import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import type { Treatment } from '@/types/user';

const TREATMENTS: Treatment[] = ['Sr.', 'Sra.', 'Srta.'];

export function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, treatment, changeTreatment } = useAuth();

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <Header title="Configurações" />

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tema
          </Text>

          <View style={styles.themeRow}>
            <Text style={[styles.themeLabel, { color: colors.text }]}>
              Modo escuro
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          <Text style={[styles.helper, { color: colors.textMuted }]}>
            A preferência é salva localmente.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tratamento
          </Text>

          <View style={styles.chipsRow}>
            {TREATMENTS.map((option) => {
              const active = option === treatment;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.85}
                  onPress={() => changeTreatment(option)}
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
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Perfil
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Nome</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {user?.name ?? '-'}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Usuário</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {user?.username ?? '-'}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Perfil</Text>
          <Text style={[styles.value, { color: colors.textMuted }]}>
            {user?.role === 'admin' ? 'Administrador' : 'Usuário comum'}
          </Text>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  themeLabel: {
    fontSize: 15,
  },
  helper: {
    fontSize: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    marginTop: 2,
  },
});
