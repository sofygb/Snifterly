#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
int dato = 0;

class MyServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

int pinSensor = 12;    // Selecciona el PIN de ingreso del potenciómetro
int valorSensor = 0;  // Variable que guarda la información que viene del potenciómetro

void setup() {
  Serial.begin(115200); // Debería ser así o Serial.begin(9600);?

  // Crea el servidor BLE
  BLEDevice::init("ESP32_BLE_Server");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Crea el servicio BLE
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Crea el característica BLE
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );

  // Inicia la característica BLE
  pCharacteristic->addDescriptor(new BLE2902());

  // Inicia el servicio BLE
  pService->start();

  // Inicia el anuncio BLE
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->addServiceUUID(pService->getUUID());
  pAdvertising->start();
}

void loop() {
  if (deviceConnected) {
    valorSensor = analogRead(pinSensor);
    // Actualiza el dato
    dato=valorSensor;
    // Envia el dato a través de BLE
    pCharacteristic->setValue((uint8_t*)&dato, sizeof(dato));
    pCharacteristic->notify();

    delay(1000); // Puedes ajustar el intervalo de transmisión según tus necesidades
  }

  // Desconecta si el dispositivo se desconecta
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // Da tiempo al cliente para recibir los datos antes de desconectar.
    pServer->startAdvertising(); // Inicia el anuncio BLE
    Serial.println("Empezando a anunciar...");
    oldDeviceConnected = deviceConnected;
  }

  // Almacena el estado de conexión para la próxima iteración
  oldDeviceConnected = deviceConnected;
}
