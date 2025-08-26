import { navigate } from 'expo-router/build/global-state/routing';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigate('/(tabs)')}
          title="chat"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,

  },
});
