# Configuration Guide

## Basic Project Configuration

### Configuration File Description
The project uses two types of configuration files: an initial configuration template and a runtime configuration file.

1. **Initial Configuration Template**
  - Location: `/src/utils/config_manager.py`
  - Purpose: Provides a default configuration template, automatically generates the configuration file on first run
  - Use Case: Modify this file for first-time setup or resetting configurations

2. **Runtime Configuration File**
  - Location: `/config/config.json`
  - Purpose: Stores actual runtime configuration information
  - Use Case: Modify this file for daily usage

3. **Device Identity File**
  - Location: `/config/efuse.json`
  - Purpose: Stores unique device identification information, including serial number and activation status
  - Use Case: Automatically generated and updated during the device activation process

### Accessing Configuration Items
The configuration system is designed as a hierarchical structure, accessed using dot-separated paths for specific configuration items:

```python
# Example: Retrieve a configuration value
from src.utils.config_manager import ConfigManager
config = ConfigManager.get_instance()
mqtt_endpoint = config.get_config("SYSTEM_OPTIONS.NETWORK.MQTT_INFO.endpoint")

# Example: Update a configuration value
config.update_config("WAKE_WORD_OPTIONS.USE_WAKE_WORD", True)
```

## Network Configuration

Network configuration is located under `SYSTEM_OPTIONS.NETWORK` and includes the following:

```json
"NETWORK": {
  "OTA_VERSION_URL": "https://api.tenclass.net/xiaozhi/ota/",  // OTA update URL
  "WEBSOCKET_URL": "ws://192.168.31.232:8000/xiaozhi/v1/",     // WebSocket server URL
  "WEBSOCKET_ACCESS_TOKEN": "test-token",                      // Access token
  "MQTT_INFO": {
   "endpoint": "",                             // MQTT server address
   "client_id": "",                            // MQTT client ID
   "username": "",                             // MQTT username
   "password": "",                             // MQTT password
   "publish_topic": "",                        // Publish topic
   "subscribe_topic": ""                       // Subscribe topic
  },
  "ACTIVATION_VERSION": "v2",                   // Activation version, options: v1, v2
  "AUTHORIZATION_URL": "https://xiaozhi.me/"    // Authorization URL
}
```

## Device Activation

Devices must be activated on first use. Activation information is stored in the `config/efuse.json` file:

```json
{
  "serial_number": "SN-E3E1F618-902e16dbe116",  // Device serial number
  "hmac_key": "b5bf012dd518080532f928b70ed958799f34f9224e80dd4128795a70a5baca24",  // Key
  "activation_status": false  // Activation status, changes to true after successful activation
}
```

The activation process is controlled by the `ACTIVATION_VERSION` configuration:
- `v1`: Simplified activation mode
- `v2`: Full activation process, including verification code confirmation

## Wake Word Configuration

Voice wake-up configurations are located under `WAKE_WORD_OPTIONS`:

```json
"WAKE_WORD_OPTIONS": {
  "USE_WAKE_WORD": false,                                // Enable voice wake-up
  "MODEL_PATH": "models/vosk-model-small-cn-0.22",       // Wake-up model path
  "WAKE_WORDS": [                                        // List of wake words
   "Xiaozhi",
   "Xiaomei"
  ]
}
```

## Camera and Visual Recognition

Camera and visual recognition configurations are located under `CAMERA`:

```json
"CAMERA": {
  "camera_index": 0,                                     // Camera index
  "frame_width": 640,                                    // Frame width
  "frame_height": 480,                                   // Frame height
  "fps": 30,                                             // Frame rate
  "Loacl_VL_url": "https://open.bigmodel.cn/api/paas/v4/", // Zhipu API URL
  "VLapi_key": "your-api-key",                           // Zhipu visual model API key
  "models": "glm-4v-plus"                                // Visual model to use
}
```

## IoT Device Configuration

### Temperature Sensor

The temperature sensor connects via MQTT protocol, with configurations under `TEMPERATURE_SENSOR_MQTT_INFO`:

```json
"TEMPERATURE_SENSOR_MQTT_INFO": {
  "endpoint": "your-mqtt-address",                      // MQTT server address
  "port": 1883,                                         // MQTT server port
  "username": "admin",                                  // MQTT username
  "password": "123456",                                 // MQTT password
  "publish_topic": "sensors/temperature/command",       // Publish topic
  "subscribe_topic": "sensors/temperature/device_001/state" // Subscribe topic
}
```

Notes:
- `endpoint` must be a valid MQTT server address
- `port` defaults to 1883; for TLS encryption, typically use 8883
- `publish_topic` is used to send commands to the device
- `subscribe_topic` is used to receive device status

### Home Assistant Integration

Home Assistant smart home platform integration configurations are under `HOME_ASSISTANT`:

```json
"HOME_ASSISTANT": {
  "URL": "http://your-home-assistant-address:8123",  // Home Assistant server URL
  "TOKEN": "long-lived-access-token",               // Access token
  "DEVICES": []                                     // List of devices to integrate
}
```

This configuration allows control of various devices added to Home Assistant, including:
- Light devices (HomeAssistantLight)
- Switch devices (HomeAssistantSwitch)
- Numeric devices (HomeAssistantNumber)
- Button devices (HomeAssistantButton)

## Configuration Modification Guide

1. **First-Time Configuration**
  - Run the program directly; the system will automatically generate the default configuration file
  - To modify default values, edit `DEFAULT_CONFIG` in `config_manager.py`

2. **Change Server Configuration**
  - Open `/config/config.json`
  - Modify `SYSTEM_OPTIONS.NETWORK.WEBSOCKET_URL` to the new server address
  - Example:
    ```json
    "SYSTEM_OPTIONS": {
     "NETWORK": {
      "WEBSOCKET_URL": "ws://your-server-address:port/"
     }
    }
    ```

3. **Enable Voice Wake-Up**
  - Set `WAKE_WORD_OPTIONS.USE_WAKE_WORD` to `true`
  - Add or modify wake words in the `WAKE_WORD_OPTIONS.WAKE_WORDS` array

4. **Configure Camera and Visual Recognition**
  - Modify the relevant configurations under `CAMERA`
  - Set `VLapi_key` to the API key obtained from the Zhipu AI platform
  - Adjust resolution and frame rate as needed

5. **Configure Home Assistant Integration**
  - Create a long-lived access token in Home Assistant
  - Fill in `HOME_ASSISTANT.URL` and `HOME_ASSISTANT.TOKEN`
  - Devices will be automatically discovered and integrated

## Notes
- Restart the program after modifying configuration files for changes to take effect
- WebSocket URL must start with `ws://` or `wss://`
- CLIENT_ID is automatically generated on first run; manual modification is not recommended
- DEVICE_ID defaults to the device's MAC address but can be modified if needed
- Configuration files use UTF-8 encoding; use an editor that supports UTF-8 for modifications
- Keep sensitive information such as API keys and access tokens secure
- Ensure the network can access the Home Assistant server for integration to work properly
