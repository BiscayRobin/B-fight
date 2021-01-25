import React from 'react'
import React, {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BleManager from 'react-native-ble-manager';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class Multi extends React.Component {

  constructor(props){
    super(props);
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);
    this.list=list;
    this.setList=setList;
    this.isScanning=isScanning;
    this.setIsScanning=setIsScanning;
    this.peripherals=peripherals;
}

  startScan = () => {
    if (!this.isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  }

  handleStopScan = () => {
    console.log('Scan is stopped');
    this.setIsScanning(false);
  }

  handleDisconnectedPeripheral = (data) => {
    let peripheral = this.peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      this.peripherals.set(peripheral.id, peripheral);
      this.setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        this.peripherals.set(peripheral.id, peripheral);
        this.setList(Array.from(this.peripherals.values()));
      }
    });
  }

  handleDiscoverPeripheral = (peripheral) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    this.peripherals.set(peripheral.id, peripheral);
    this.setList(Array.from(this.peripherals.values()));
  }

  testPeripheral = (peripheral) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = this.peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            this.peripherals.set(peripheral.id, p);
            this.setList(Array.from(this.peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
                let p = this.peripherals.get(peripheral.id);
                if (p) {
                  p.rssi = rssi;
                  this.peripherals.set(peripheral.id, p);
                  this.setList(Array.from(this.peripherals.values()));
                }
              });
            });
          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }

  }

  useEffect(){
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }

    return (() => {
      console.log('unmount');
      bleManagerEmitter.removeEventListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.removeEventListener('BleManagerStopScan', handleStopScan );
      bleManagerEmitter.removeEventListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      bleManagerEmitter.removeEventListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }

  renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => this.testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>

              <View style={{margin: 10}}>
                <Button
                  title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                  onPress={() => startScan() }
                />
              </View>

              <View style={{margin: 10}}>
                <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
              </View>

              {(list.length == 0) &&
                <View style={{flex:1, margin: 20}}>
                  <Text style={{textAlign: 'center'}}>No peripherals</Text>
                </View>
              }

            </View>
          </ScrollView>
          <FlatList
              data={list}
              renderItem={({ item }) => renderItem(item) }
              keyExtractor={item => item.id}
            />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


export default Multi
