import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Nurtura AI 🚀</Text>
      <Text style={styles.subtitle}>
        AI-Powered Pregnancy Wellness Platform
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});

export default App;