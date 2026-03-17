import "./global.css";
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Fontisto } from '@expo/vector-icons';
import { InputField } from './components/InputField';

function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <View style={{ height: insets.top }} className="bg-fiap w-full" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        className="px-6 pt-8"
      >
        <View className="items-center mb-8">
          <Image
            source={require('./assets/logo-fiap.png')}
            style={{ width: 150, height: 60 }}
            resizeMode="contain"
          />
          <Text className="text-fiap text-3xl font-bold mt-3">
            Bem-vindo
          </Text>
          <Text className="text-gray-400 text-base mt-1">
            Faça login para continuar
          </Text>
        </View>

        <InputField
          icon="mail"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            activeOpacity={0.7}
          >
            <View
              className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                keepLoggedIn ? 'bg-fiap border-fiap' : 'border-gray-500'
              }`}
            >
              {keepLoggedIn && <Feather name="check" size={14} color="#fff" />}
            </View>
            <Text className="text-white text-sm">Manter logado</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-fiap text-sm font-semibold">
              Esqueci a senha
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-fiap rounded-xl py-4 items-center mb-6"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold">Entrar</Text>
        </TouchableOpacity>

        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-700" />
          <Text className="text-gray-500 mx-4 text-sm">ou</Text>
          <View className="flex-1 h-px bg-gray-700" />
        </View>

        <TouchableOpacity
          className="border-2 border-fiap rounded-xl py-4 items-center mb-4"
          activeOpacity={0.8}
        >
          <Text className="text-fiap text-lg font-bold">Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-dark-card rounded-xl py-4 border-2 border-gray-700"
          activeOpacity={0.8}
        >
          <Fontisto name="microsoft" size={20} color="#ED145B" style={{ marginRight: 10 }} />
          <Text className="text-white text-lg font-bold">Entrar com Microsoft</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
}
