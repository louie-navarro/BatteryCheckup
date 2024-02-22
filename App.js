import { StatusBar } from 'expo-status-bar';
import { usePowerState } from 'expo-battery';
import * as Brightness from 'expo-brightness';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';

export default function App() {
  const { lowPowerMode, batteryLevel, batteryState } = usePowerState();
  const [brightness, setBrightness] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const brightness = await Brightness.getBrightnessAsync();
      setBrightness(brightness);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>location: {location || errorMsg}</Text>
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      )}
      <Text>brightness: {brightness}</Text>
      <Text>lowPowerMode: {lowPowerMode}</Text>
      <Text>batteryLevel: {batteryLevel}</Text>
      <Text>batteryState: {batteryState}</Text>
      <Text>brand: {Device.brand}</Text>
      <Text>type: {Device.deviceType}</Text>
      <Text>manufacturer: {Device.manufacturer}</Text>
      <Text>deviceYearClass: {Device.deviceYearClass}</Text>
      <Text>osName: {Device.osName}</Text>
      <Text>osVersion: {Device.osVersion}</Text>
      {/* ios only */}
      <Text>modelID: {Device.modelId}</Text> 
      <Text>modelName: {Device.modelName}</Text>
      {/* andoid only */}
      <Text>platformApiLevel: {Device.platformApiLevel}</Text>
      <StatusBar style='auto' />
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
