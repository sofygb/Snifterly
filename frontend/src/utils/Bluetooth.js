/* eslint-disable no-bitwise */
import { useMemo, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { BleManager } from "react-native-ble-plx"

import * as ExpoDevice from "expo-device"

import base64 from "react-native-base64"

const HEART_RATE_UUID = "0000180d-0000-1000-8000-00805f9b34fb"
const HEART_RATE_CHARACTERISTIC = "00002a37-0000-1000-8000-00805f9b34fb"

/*interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  medicion: number;
}*/

export class  Bluetooth {
  bleManager = new BleManager()
  allDevices = [];
  connectedDevice = [];
  medicion = 0

  static getAllDevices = async () => {
    return this.allDevices;
  }

  static getConnectedDevice = async () => {
    return this.allDevices;
  }

  static getMedicion = async () => {
    return this.allDevices;
  }

  static requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK"
      }
    )
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK"
      }
    )
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK"
      }
    )

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    )
  }

  static requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK"
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } else {
        const isAndroid31PermissionsGranted = await requestAndroid31Permissions()

        return isAndroid31PermissionsGranted
      }
    } else {
      return true
    }
  }

  static isDuplicteDevice = (devices, nextDevice) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1

  static scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error)
      }
      if (device && device.name?.includes("CorSense")) {
        setAllDevices(prevState => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device]
          }
          return prevState
        })
      }
    })

  static connectToDevice = async device => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id)
      setConnectedDevice(deviceConnection)
      await deviceConnection.discoverAllServicesAndCharacteristics()
      bleManager.stopDeviceScan()
      startStreamingData(deviceConnection)
    } catch (e) {
      console.log("FAILED TO CONNECT", e)
    }
  }

  static disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id)
      setConnectedDevice(null)
      setMedicion(0)
    }
  }

  static onMedicionUpdate = (error, characteristic) => {
    if (error) {
      console.log(error)
      return -1
    } else if (!characteristic?.value) {
      console.log("No Data was recieved")
      return -1
    }

    const rawData = base64.decode(characteristic.value)
    let innerMedicion = -1

    const firstBitValue = Number(rawData) & 0x01

    if (firstBitValue === 0) {
      innerMedicion = rawData[1].charCodeAt(0)
    } else {
      innerMedicion =
        Number(rawData[1].charCodeAt(0) << 8) + Number(rawData[2].charCodeAt(2))
    }

    setMedicion(innerMedicion)
  }

  static startStreamingData = async device => {
    if (device) {
      device.monitorCharacteristicForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC,
        onMedicionUpdate
      )
    } else {
      console.log("No Device Connected")
    }
  }
}
