import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function CustomInput({
  label,
  error,
  style,
  ...rest
}: CustomInputProps) {
  const { colors } = useTheme();

  const borderColor = error ? colors.danger : colors.border;

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      ) : null}

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor,
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...rest}
      />

      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
});
