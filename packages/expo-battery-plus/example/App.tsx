import { StyleSheet, Text, View } from 'react-native';

import * as ExpoBatteryPlus from 'expo-battery-plus';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoBatteryPlus.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
