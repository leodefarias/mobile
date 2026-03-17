import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InputFieldProps {
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function InputField({ icon, placeholder, secureTextEntry, value, onChangeText }: InputFieldProps) {
  return (
    <View className="flex-row items-center bg-dark-card rounded-xl border-2 border-fiap px-4 py-3 mb-4">
      <Feather name={icon} size={20} color="#999" style={{ marginRight: 12 }} />
      <TextInput
        className="flex-1 text-white text-base"
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}
