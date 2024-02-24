import { StyleSheet, Text, View } from 'react-native';

import * as BatteryPlus from 'battery-plus';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{BatteryPlus.hello()}</Text>
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
