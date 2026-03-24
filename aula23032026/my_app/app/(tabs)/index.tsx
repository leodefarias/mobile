import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function HomeScreen() {

  const [inputValue, setInputValue] = useState<string>()
  let texto: string

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput
              style={{
                borderColor:"#FFF",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: "10px",
                color: "#FFF",
                padding: 4
              }}
              onChangeText={(e) => setInputValue(e)}
            >

            </TextInput>
            <TextInput
              style={{
                borderColor:"#FFF",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: "10px",
                color: "#FFF",
                padding: 4
              }}
              
              value={inputValue}
            >

            </TextInput>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
