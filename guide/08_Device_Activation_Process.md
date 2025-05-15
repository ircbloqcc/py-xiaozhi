# Device Activation Process v2

## Overview

This document describes the v2 version of the Xiaozhi device authentication process.

## Activation Process

Each device has a unique Serial Number (SN) and HMAC Key for authentication and secure communication. When a new device is used for the first time, it must go through the following activation process:

1. The client sends device information to the server, including the serial number, MAC address, and client ID.
2. The server checks if the device is already activated:
  - If activated, the client operates normally.
  - If not activated, the server returns an activation request containing a verification code and a challenge.
3. The client displays the verification code and prompts the user to visit xiaozhi.me to enter the code.
4. The client signs the challenge using the HMAC key and sends it to the server for verification.
5. The client polls the server for the verification result:
  - If successful, the device is activated.
  - If failed or timed out, the activation fails.

### Xiaozhi ESP32 Device Activation Flowchart

```
┌────────────────────┐
│     Device Start   │
└──────────┬─────────┘
        ↓
┌────────────────────┐
│ Initialize Modules │
│ Connect to WiFi    │
└──────────┬─────────┘
        ↓
┌────────────────────┐
│ Call CheckVersion  │
│ Access OTA Server  │──→ POST /xiaozhi/ota/
└──────────┬─────────┘
        ↓
┌────────────────────┐
│ Parse Server Reply │
└──────────┬─────────┘
        ↓
    ┌─────┴─────┐
    ↓           ↓
┌─────────┐ ┌─────────┐
│New Version?│ │Activation Needed?│
└─────┬───┘ └─────┬───┘
    │           │
┌─────▼───┐       └───┬─── No ──┐
│Upgrade FW│           ↓         ↓
└─────────┘  ┌─────────────┐ ┌─────────────┐
         │Activation Code?│ │Init Protocol│
         └──────┬──────┘ │MQTT/WebSocket│
              │        └─────────────┘
          ┌────▼───┐
          │   Yes   │
          └────┬───┘
             ↓
      ┌──────────────────┐
      │Display Code to User│
      │Play Voice Prompt   │
      └────────┬─────────┘
            ↓
      ┌──────────────────┐
      │ Start Activation │
      └────────┬─────────┘
            ↓
┌────────────────────────────────┐
│        Check Serial Number     │
└───────────────┬────────────────┘
           ↓
      ┌──────┴───────┐
      ↓              ↓
   ┌─────────┐    ┌─────────┐
   │  Has SN  │    │ No SN   │
   └─────┬────┘    └────┬────┘
       │              │
┌─────────▼────────┐    │
│Construct JSON Payload│ │
│- serial_number    │    │
│- challenge        │    │
│- hmac signature   │    │
└─────────┬─────────┘    │
       │              │
       └──────┬───────┘
            ↓
   ┌───────────────────────┐
   │POST to Activation API │──→ POST /xiaozhi/ota/activate
   └────────────┬──────────┘
            ↓
    ┌───────────┴───────────┐
    ↓           ↓           ↓
┌─────────┐ ┌─────────┐ ┌─────────┐
│Status 200│ │Status 202│ │Other Status│
│Activated │ │Retry     │ │Failed      │
└────┬────┘ └────┬────┘ └────┬────┘
    │           │           │
    │      ┌────▼─────┐     │
    │      │Retry Later│     │
    │      │Max 10 Times│     │
    │      └────┬─────┘     │
    │           │           │
    └───────────┼───────────┘
            ↓
      ┌──────────────────┐
      │Set Activation Flag│
      └────────┬─────────┘
            ↓
      ┌──────────────────┐
      │ Continue Normal   │
      │ MQTT/WS Protocol  │
      └──────────────────┘
```

### Detailed Activation Data Flow

```
┌────────────┐                      ┌────────────┐                      ┌────────────┐
│            │                      │            │                      │            │
│  Device    │                      │   Server   │                      │   Browser  │
│            │                      │            │                      │            │
└─────┬──────┘                      └─────┬──────┘                      └─────┬──────┘
    │                                   │                                   │
    │ Request Device Status (MAC, ID, SN) │                                   │
    │ ────────────────────────────────> │                                   │
    │                                   │                                   │
    │ Return Activation Request (Code, Challenge) │                         │
    │ <──────────────────────────────── │                                   │
    │                                   │                                   │
    │ Display Code                      │                                   │
    │ ┌─────────────┐                   │                                   │
    │ │Visit Website │                   │                                   │
    │ │Code: 123456  │                   │                                   │
    │ └─────────────┘                   │                                   │
    │                                   │                                   │
    │                                   │ User Visits xiaozhi.me            │
    │                                   │ <─────────────────────────────────│
    │                                   │                                   │
    │                                   │ User Enters Code 123456           │
    │                                   │ <─────────────────────────────────│
    │                                   │                                   │
    │ Compute HMAC Signature            │                                   │
    │ ┌─────────────┐                   │                                   │
    │ │ HMAC(Key,   │                   │                                   │
    │ │ Challenge)  │                   │                                   │
    │ └─────────────┘                   │                                   │
    │                                   │                                   │
    │ Send Activation Request (SN, Challenge, HMAC) │                       │
    │ ────────────────────────────────> │                                   │
    │                                   │ ┌───────────────┐                │
    │                                   │ │ Wait for Code │                │
    │                                   │ │ Timeout: 202  │                │
    │                                   │ └───────────────┘                │
    │                                   │                                   │
    │ Poll for Result (HTTP Long Polling) │                                 │
    │ ────────────────────────────────> │                                   │
    │ HTTP 202 (Pending)               │                                   │
    │ <──────────────────────────────── │                                   │
    │                                   │                                   │
    │ Continue Polling...              │                                   │
    │ ────────────────────────────────> │                                   │
    │                                   │                                   │
    │                                   │ Code Verified Successfully        │
    │                                   │───────────────────────────────────│
    │                                   │                                   │
    │ Activation Success (HTTP 200)    │                                   │
    │ <──────────────────────────────── │                                   │
    │                                   │                                   │
    │ ┌─────────────┐                   │                                   │
    │ │Activation OK │                   │                                   │
    │ └─────────────┘                   │                                   │
    │                                   │                                   │
```

## Device-Server Communication Details

### 1. Device Info Request (POST /xiaozhi/ota/)

**Headers**:
```
Activation-Version: 2  // Indicates support for serial number activation
Device-Id: AA:BB:CC:DD:EE:FF  // MAC address
Client-Id: xxxx-xxxx-xxxx-xxxx  // Device UUID
User-Agent: BOARD_NAME/1.0.0  // Board name and firmware version
Content-Type: application/json
```

**Request Body**:
```json
{
  "version": 2,
  "flash_size": 16777216,
  "psram_size": 8388608,
  "minimum_free_heap_size": 7265024,
  "mac_address": "your_mac_address",
  "uuid": "your_client_id",
  "chip_model_name": "esp32s3",
  "chip_info": {
   "model": 9,
   "cores": 2,
   "revision": 0,
   "features": 20
  },
  "application": {
   "name": "xiaozhi",
   "version": "1.6.0",
   "compile_time": "2025-04-16T12:00:00Z",
   "idf_version": "v5.3.2"
  },
  "partition_table": [
   {
    "label": "nvs",
    "type": 1,
    "subtype": 2,
    "address": 36864,
    "size": 24576
   },
   {
    "label": "otadata",
    "type": 1,
    "subtype": 0,
    "address": 61440,
    "size": 8192
   },
   {
    "label": "app0",
    "type": 0,
    "subtype": 0,
    "address": 65536,
    "size": 1966080
   },
   {
    "label": "app1",
    "type": 0,
    "subtype": 0,
    "address": 2031616,
    "size": 1966080
   },
   {
    "label": "spiffs",
    "type": 1,
    "subtype": 130,
    "address": 3997696,
    "size": 1966080
   }
  ],
  "ota": {
   "label": "app0"
  },
  "board": {
   "type": "lc-esp32-s3",
   "name": "LC ESP32-S3 Dev Board",
   "features": ["wifi", "ble", "psram", "octal_flash"],
   "ip": "your_ip_address",
   "mac": "your_mac_address"
  }
}
```

### 2. Server Response

**Response Body**:
```json
{
  "firmware": {
   "version": "1.0.1",
   "url": ""
  },
  "activation": {
   "message": "Please visit xiaozhi.me and enter the activation code",
   "code": "123456",
   "challenge": "randomstring123456",
   "timeout_ms": 30000
  },
  "mqtt": {
   "endpoint": "mqtt.xiaozhi.me",
   "client_id": "device123",
   "username": "user123",
   "password": "pass123",
   "publish_topic": ""
  },
  "websocket": {
   "url": "wss://api.tenclass.net/xiaozhi/v1/",
   "token": "test-token"
  }
}
```

### 3. Device Activation Request (POST /xiaozhi/ota/activate)

**Request Body**:
```json
{
  "Payload": {
   "algorithm": "hmac-sha256",
   "serial_number": "SN-5CD8467B47FB4920",
   "challenge": "dac852d6-4ac4-4650-ba1a-c2a5bf00a766",
   "hmac": "ada4775e3ed93cf9c0eb9ed00444138554ba416af41283a0e5603c77681a8022"
  }
}
```

### 4. Activation Response

- **Success**: Status Code 200
- **Pending User Input**: Status Code 202
- **Failure**: Status Code 4xx (e.g., 401 for unauthorized, 400 for bad request)

**Response Body** (on failure):
```json
{
  "error": "Description of the error"
}
```

## Security Mechanisms

The v2 device activation process employs the following security measures:

1. **Unique Device Identifier**: Each device has a unique Serial Number (SN).
2. **HMAC Signature Verification**: Uses HMAC-SHA256 to sign the challenge, ensuring device authenticity.
3. **Verification Code**: Requires users to enter a code on the website to prevent automated activation attacks.
4. **Polling Mechanism**: Uses HTTP Long Polling to wait for server verification results, accommodating various network conditions.
