---
title: Legacy User Guide
description: Legacy user guide for the py-xiaozhi project, providing usage instructions for earlier versions
outline: deep
---



# py-xiaozhi User Guide (Please read carefully)

![Image](https://github.com/user-attachments/assets/df8bd5d2-a8e6-4203-8084-46789fc8e9ad)

## Introduction
- The voice mode has two options: press-and-hold conversation and automatic conversation. The button in the bottom-right corner indicates the current mode.
- Press-and-hold conversation: Hold to speak, release to send.
- Automatic conversation: Click to start the conversation. When the interface shows "Listening," you can speak, and it will send automatically after you finish.
- GUI mode:
  - F2 key: Press and hold to speak.
  - F3 key: Interrupt the conversation.
- CLI mode:
  - F2 key: Press once to start automatic conversation.
  - F3 key: Interrupt the conversation.

## Configuration Instructions

### Basic Project Configuration

#### Configuration File Overview
The project uses two types of configuration files: an initial configuration template and a runtime configuration file.

1. **Initial Configuration Template**
   - Location: `/src/utils/config_manager.py`
   - Purpose: Provides default configuration templates. A configuration file is automatically generated during the first run.
   - Use Case: Modify this file for the first run or to reset configurations.

2. **Runtime Configuration File**
   - Location: `/config/config.json`
   - Purpose: Stores actual runtime configuration information.
   - Use Case: Modify this file for daily use.

#### Configuration Items
- Add any required configuration and retrieve it via `config_manager`. Refer to `websocket` or `iot\things\temperature_sensor.py` for examples.
- For instance, to retrieve the "endpoint" of "MQTT_INFO," use `config.get_config("MQTT_INFO.endpoint")`.

```json
{
  "CLIENT_ID": "Automatically generated client ID",
  "DEVICE_ID": "Device MAC address",
  "NETWORK": {
    "OTA_VERSION_URL": "OTA update URL",
    "WEBSOCKET_URL": "WebSocket server URL",
    "WEBSOCKET_ACCESS_TOKEN": "Access token"
  },
  "MQTT_INFO": {
    "endpoint": "MQTT server address",
    "client_id": "MQTT client ID",
    "username": "MQTT username",
    "password": "MQTT password",
    "publish_topic": "Publish topic",
    "subscribe_topic": "Subscribe topic"
  },
  "USE_WAKE_WORD": false,
  "WAKE_WORDS": [
    "Xiaozhi",
    "Hello Xiaoming"
  ],
  "WAKE_WORD_MODEL_PATH": "./models/vosk-model-small-cn-0.22",
  "TEMPERATURE_SENSOR_MQTT_INFO": {
    "endpoint": "Your MQTT address",
    "port": 1883,
    "username": "admin",
    "password": "dtwin@123",
    "publish_topic": "sensors/temperature/command",
    "subscribe_topic": "sensors/temperature/device_001/state"
  },
  "CAMERA": {
    "camera_index": 0,
    "frame_width": 640,
    "frame_height": 480,
    "fps": 30,
    "Loacl_VL_url": "https://open.bigmodel.cn/api/paas/v4/",
    "VLapi_key": "Your key"
  }
}
```

#### Configuration Modification Guide

1. **Initial Configuration**
   - Run the program directly; the system will automatically generate a default configuration file.
   - To modify default values, edit the `DEFAULT_CONFIG` in `config_manager.py`.

2. **Change Server Configuration**
   - Open `/config/config.json`.
   - Modify `NETWORK.WEBSOCKET_URL` to the new server address.
   - Example:
     ```json
     "NETWORK": {
       "WEBSOCKET_URL": "ws://your-server-address:port/"
     }
     ```

3. **Enable Voice Wake-Up**
   - Set `USE_WAKE_WORD` to `true`.
   - Add or modify wake-up words in the `WAKE_WORDS` array.

#### Notes
- Restart the program after modifying the configuration file for changes to take effect.
- WebSocket URLs must start with `ws://` or `wss://`.
- CLIENT_ID is auto-generated during the first run; manual modification is not recommended.
- DEVICE_ID defaults to the device MAC address but can be modified as needed.
- Use a UTF-8 compatible editor to modify the configuration file.

## Startup Instructions

### System Dependency Installation

#### Windows
1. **Install FFmpeg**
   ```bash
   # Method 1: Using Scoop (recommended)
   scoop install ffmpeg
   
   # Method 2: Manual installation
   # 1. Visit https://github.com/BtbN/FFmpeg-Builds/releases to download.
   # 2. Extract and add the bin directory to the system PATH.
   ```

2. **Opus Audio Codec Library**
   - The project automatically includes `opus.dll`, no manual installation required.
   - If issues arise, copy `/libs/windows/opus.dll` to one of the following locations:
     - Application directory
     - `C:\Windows\System32`

#### Linux (Debian/Ubuntu)
```bash
sudo apt-get update
sudo apt-get install python3-pyaudio portaudio19-dev ffmpeg libopus0 libopus-dev
sudo apt-get install pulseaudio-utils
sudo apt install build-essential python3-dev
```

#### macOS
```bash
brew install portaudio opus python-tk ffmpeg gfortran
brew upgrade tcl-tk
```

### Python Dependency Installation

#### Method 1: Using venv (recommended)
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple
```

#### Method 2: Using Conda
```bash
conda create -n py-xiaozhi python=3.12
conda activate py-xiaozhi
conda install conda-forge::libopus
conda install conda-forge::ffmpeg
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple
```

### Wake-Up Word Model
- [Download Wake-Up Word Model](https://alphacephei.com/vosk/models)
- Extract to the root directory under `/models`.

### IoT Functionality Overview

#### IoT Module Structure
```
├── iot                          # IoT device-related modules
│   ├── things                   # Specific device implementations
│   │   ├── lamp.py              # Smart lamp control
│   │   ├── music_player.py      # Music player
│   │   └── speaker.py           # Volume control
│   ├── thing.py                 # IoT device base class
│   └── thing_manager.py         # IoT device manager
```

#### IoT State Flow
```text
+----------------+    +----------------+    +----------------+
| User Command   | -> | Speech-to-Text | -> | IoT Command     |
+----------------+    +----------------+    +----------------+
```

#### Adding New IoT Devices
1. Create a new device class under `src/iot/things`.
2. Inherit the `Thing` base class and implement required methods.
3. Register the new device in `thing_manager.py`.

### Notes
1. Ensure server configurations are correct and accessible.
2. Add error handling and reconnection mechanisms for new devices/services.
3. Test communication stability before adding new devices.

### Running Modes
#### GUI Mode (default)
```bash
python main.py
```

#### CLI Mode
```bash
python main.py --mode cli
```

#### Packaging
```bash
python scripts/build.py
```

### Volume Control
- **Windows**: Uses `pycaw` and `comtypes`.
- **macOS**: Uses `applescript`.
- **Linux**: Uses `pactl`, `wpctl`, or `amixer`.

#### Usage
- **GUI Mode**: Adjust volume via the slider.
- **CLI Mode**: Use `v <value>` (e.g., `v 50` for 50%).

## Getting Help
1. Check `docs/exception_summary.md`.
2. Submit issues on GitHub.
3. Contact the author (details on the homepage).
