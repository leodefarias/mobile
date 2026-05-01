import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user, treatment, logout } = useAuth();
  const { colors } = useTheme();

  if (!user) {
    return null;
  }

  const greeting = `${treatment} ${user.name}`;
  const roleLabel = user.role === 'admin' ? 'Admin' : 'Usuário';
  const roleBg = user.role === 'admin' ? colors.primary : colors.success;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.infoColumn}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            {greeting}
          </Text>

          <View style={styles.metaRow}>
            <View style={[styles.roleBadge, { backgroundColor: roleBg }]}>
              <Text style={styles.roleText}>{roleLabel}</Text>
            </View>

            {title ? (
              <Text style={[styles.title, { color: colors.textMuted }]}>
                {title}
              </Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logout}
          style={[styles.logout, { borderColor: colors.danger }]}
        >
          <Text style={[styles.logoutText, { color: colors.danger }]}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginRight: 8,
  },
  roleText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
  },
  logout: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
