
# Volume Control Feature

## Overview

This application supports adjusting the system volume and requires different dependencies for different operating systems. The application will automatically check for these dependencies at startup. If any dependencies are missing, corresponding installation instructions will be displayed.

## Platform Support

The system provides different volume control implementations for various operating systems:

1. **Windows**: Uses `pycaw` and `comtypes` to control system volume.
2. **macOS**: Uses `applescript` to control system volume.
3. **Linux**: Depending on the system environment, uses `pactl` (PulseAudio), `amixer` (ALSA), or `alsamixer` to control volume.

## Dependency Installation

### Windows
```bash
pip install pycaw comtypes
```

### macOS
For macOS, install the `applescript` module:
```bash
pip install applescript
```

### Linux
Install one of the following dependencies based on your audio system:

```bash
# PulseAudio tools (recommended)
sudo apt-get install pulseaudio-utils

# Or ALSA tools
sudo apt-get install alsa-utils

# If using alsamixer, also install expect
sudo apt-get install alsa-utils expect
```

## Usage

### GUI Mode
- Use the volume slider in the interface to adjust the volume directly.
- The slider updates the system volume 300 milliseconds after being moved (debounce design).
- You can control the volume using voice commands, such as "Increase volume" or "Set volume to 50%."

### CLI Mode
- Use the `v <volume>` command to adjust the volume. For example, `v 50` sets the volume to 50%.
- Supported commands:
    - `v <value>`: Sets the volume to the specified value (0-100).

### Voice Control
Using IoT functionality, you can control the volume with voice commands:
- "Set volume to 50%"
- "Lower the volume"
- "Increase the volume"
- "Set volume to 80"

## Architecture Design

The volume control feature uses a layered design, including:

1. **VolumeController Class** - Low-level implementation for cross-platform volume operations.
2. **BaseDisplay.update_volume** - Middleware layer bridging the application and the low-level controller.
3. **Speaker IoT Device** - High-level abstraction providing a voice command interface.

## Internal Implementation

### 1. VolumeController Class

The `VolumeController` class is a cross-platform implementation for controlling volume on Windows, macOS, and Linux:

```python
# src/utils/volume_controller.py
class VolumeController:
        """Cross-platform volume controller"""
        
        def __init__(self):
                self.system = platform.system()
                # Initialize controller based on the operating system
                if self.system == "Windows":
                        self._init_windows()
                elif self.system == "Darwin":  # macOS
                        self._init_macos()
                elif self.system == "Linux":
                        self._init_linux()
        
        def get_volume(self):
                """Get the current volume (0-100)"""
                # Platform-specific implementation to get volume
                
        def set_volume(self, volume):
                """Set the volume (0-100)"""
                # Platform-specific implementation to set volume
```

### 2. BaseDisplay Volume Control

The `BaseDisplay` class provides a volume control interface, inherited by CLI and GUI display classes:

```python
# src/display/base_display.py
class BaseDisplay(ABC):
        def __init__(self):
                self.current_volume = 70  # Default volume value
                self.volume_controller = None
                
                # Initialize volume controller
                try:
                        from src.utils.volume_controller import VolumeController
                        if VolumeController.check_dependencies():
                                self.volume_controller = VolumeController()
                                self.current_volume = self.volume_controller.get_volume()
                except Exception as e:
                        # Error handling...
        
        def get_current_volume(self):
                """Get the current volume"""
                if self.volume_controller:
                        try:
                                self.current_volume = self.volume_controller.get_volume()
                        except Exception:
                                pass
                return self.current_volume

        def update_volume(self, volume: int):
                """Update system volume"""
                volume = max(0, min(100, volume))
                self.current_volume = volume
                
                if self.volume_controller:
                        try:
                                self.volume_controller.set_volume(volume)
                        except Exception:
                                # Error handling...
                                pass
```

### 3. Speaker IoT Device

The `Speaker` class is an IoT device that allows volume control via voice commands:

```python
# src/iot/things/speaker.py
from src.application import Application
from src.iot.thing import Thing, Parameter, ValueType

class Speaker(Thing):
        def __init__(self):
                super().__init__("Speaker", "The speaker of the current AI robot")
                
                # Get the current display instance's volume as the initial value
                try:
                        app = Application.get_instance()
                        self.volume = app.display.current_volume
                except Exception:
                        # Use default value if retrieval fails
                        self.volume = 100  # Default volume

                # Define volume property
                self.add_property("volume", "Current volume value", lambda: self.volume)

                # Define method to set volume
                self.add_method(
                        "SetVolume", 
                        "Set volume",
                        [Parameter("volume", "An integer between 0 and 100", ValueType.NUMBER, True)],
                        lambda params: self._set_volume(params["volume"].get_value())
                )

        def _set_volume(self, volume):
                """Implementation of setting volume"""
                if 0 <= volume <= 100:
                        self.volume = volume
                        try:
                                app = Application.get_instance()
                                app.display.update_volume(volume)
                                return {"success": True, "message": f"Volume set to: {volume}"}
                        except Exception as e:
                                return {"success": False, "message": f"Failed to set volume: {e}"}
                else:
                        raise ValueError("Volume must be between 0 and 100")
```

### 4. Registering in Application

The volume control device is registered when the application starts:

```python
# src/application.py (partial code)
def _initialize_iot_devices(self):
        """Initialize IoT devices"""
        from src.iot.thing_manager import ThingManager
        from src.iot.things.speaker import Speaker
        
        # Get the IoT device manager instance
        thing_manager = ThingManager.get_instance()

        # Add the volume control device
        thing_manager.add_thing(Speaker())
```

## FAQ

1. **Unable to adjust volume**
     - Check if the required dependencies for your operating system are installed.
     - Windows users should ensure `pycaw` and `comtypes` are installed.
     - macOS users should ensure the `applescript` module is installed.
     - Linux users should ensure the appropriate audio control tools (`pactl` or `amixer`) are installed.

2. **Volume adjustment commands not responding**
     - Ensure the IoT module is running correctly.
     - Check if the system audio device is functioning properly.
     - Try restarting the application.

3. **Volume adjustment is inaccurate**
     - This may be due to precision issues with different audio interfaces.
     - Try using larger adjustment increments.

4. **GUI slider and actual volume are out of sync**
     - In some cases, the system volume may be changed by other applications.
     - Restarting the application will refresh the current system volume.
 