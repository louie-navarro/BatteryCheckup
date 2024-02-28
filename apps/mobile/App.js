import { StatusBar } from 'expo-status-bar';
import { usePowerState, BatteryState, useLowPowerMode } from 'expo-battery';
import * as Brightness from 'expo-brightness';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as BatteryPlus from 'battery-plus';

export default function App() {
  const lowPowerMode = useLowPowerMode();
  const { batteryLevel, batteryState } = usePowerState();
  const [brightness, setBrightness] = useState();
  const [location, setLocation] = useState(null);
  const [deviceAddress, setAddress] = useState('');
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [batteryData, setBatteryData] = useState(null);

  useEffect(() => {
    (async () => {
      Brightness.getBrightnessAsync().then((brightness) =>
        setBrightness((brightness * 100).toFixed(0))
      );

      setBatteryData(BatteryPlus.getBatteryData());

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));

      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(`${address[0].city}, ${address[0].country}`);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: location.coords.latitudeDelta,
        longitudeDelta: location.coords.longitudeDelta,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Device Information</Text>
      <Text>
        <Text style={styles.bold}>Manufacturer: </Text>
        <Text>{Device.manufacturer}</Text>
      </Text>
      <Text>
        <Text style={styles.bold}>Brand: </Text>
        <Text>{Device.brand}</Text>
      </Text>
      <Text>
        <Text style={styles.bold}>OS Name & Version: </Text>
        <Text>
          {Device.osName} {Device.osVersion}
        </Text>
      </Text>
      <Text>
        <Text style={styles.bold}>Year Class: </Text>
        <Text>{Device.deviceYearClass}</Text>
      </Text>
      <Text>
        <Text style={styles.bold}>Model Name: </Text>
        <Text>{Device.modelName}</Text>
      </Text>
      <Text style={styles.bold}>Battery Information</Text>
      <Text>
        <Text style={styles.bold}>Level: </Text>
        <Text>{(batteryLevel * 100).toFixed(0)}%</Text>
      </Text>
      <Text>
        <Text style={styles.bold}>State: </Text>
        <Text>{BatteryState[batteryState]}</Text>
      </Text>
      <Text>
        <Text style={styles.bold}>Lower Power Mode: </Text>
        <Text>{lowPowerMode}</Text>
      </Text>
      <Text style={styles.bold}>Screen Information</Text>
      <Text>
        <Text style={styles.bold}>Brightness: </Text>
        <Text>{brightness}%</Text>
      </Text>
      <Text style={styles.bold}>Location Information</Text>
      <Text>
        <Text style={styles.bold}>Address: </Text>
        {location && deviceAddress && <Text>{deviceAddress}</Text>}
      </Text>
      {location && region ? (
        <MapView
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            longitudeDelta: region.longitudeDelta,
            latitudeDelta: region.longitudeDelta,
          }}
          onRegionChange={region}
        />
      ) : (
        <Text>Unable to load Map View</Text>
      )}

      <Text style={{ fontWeight: 'bold' }}>{'\n'}android only:</Text>
      <Text>platformApiLevel: {Device.platformApiLevel}</Text>
      <Text>batteryData: {JSON.stringify(batteryData)}</Text>

      <Text style={{ fontWeight: 'bold' }}>{'\n'}ios only:</Text>
      <Text>modelID: {Device.modelId}</Text>
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
  bold: {
    fontWeight: 'bold',
  },
});
