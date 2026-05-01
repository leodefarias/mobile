import React, { memo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

function CustomButtonBase({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
}: CustomButtonProps) {
  const { colors } = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
      ? colors.danger
      : colors.surfaceMuted;

  const textColor =
    variant === 'secondary' ? colors.text : colors.primaryText;

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        { backgroundColor, opacity: isDisabled ? 0.6 : 1 },
      ]}
    >
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator color={textColor} style={styles.spinner} />
        ) : null}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export const CustomButton = memo(CustomButtonBase);
