# Voice Interaction Mode Description

![Image](./images/system_interface.png)

## Project Overview

py-xiaozhi is an intelligent voice interaction assistant that supports various operation modes and features, including voice conversation, IoT device control, visual recognition, and more. This document primarily introduces the basic usage of voice interaction.

## Voice Interaction Modes

Voice interaction supports two modes. You can choose the appropriate mode based on your needs:

### 1. Press-and-Hold Conversation Mode

- **How to Use**: Press and hold the talk button, release to send
- **Suitable Scenarios**: Short exchanges, precise control of conversation start and end times
- **Advantages**: Avoids accidental triggers, precise control
- **Shortcut Key**: Alt+Shift+V (Press and hold to talk)

### 2. Automatic Conversation Mode

- **How to Use**: Click to start the conversation, the system automatically detects and sends voice
- **Suitable Scenarios**: Long exchanges, no manual control required
- **Advantages**: Hands-free, natural communication
- **Interface Prompt**: Displays "Listening" to indicate the system is receiving your voice
- **Shortcut Key**: Alt+Shift+A (Start automatic conversation)

### Mode Switching

- The current mode is displayed in the bottom-right corner of the GUI
- Click the button to switch modes
- Use the Alt+Shift+M shortcut key to switch modes
- The default mode can be set via the configuration file

## Conversation Control

### Interrupt Function

When the system is replying with voice, you can interrupt at any time:
- **GUI Mode**: Use Alt+Shift+X or the interrupt button on the interface
- **CLI Mode**: Use the F3 key

## System Tray

The GUI mode supports system tray functionality:

- **Status Indicator**: The tray icon color reflects the current system status
  - Green: Started/Idle
  - Yellow: Listening
  - Blue: Speaking
  - Red: Error
  - Gray: Disconnected
- **Minimize**: Automatically minimizes to the system tray when the window is closed
- **Exit**: Right-click the tray icon and select "Exit Program" to fully exit the application

### State Transitions

The voice interaction system has the following states:

```
                        +----------------+
                        |                |
                        v                |
+------+  Wake Word/   +------------+   |   +------------+
| IDLE |   Button     | CONNECTING | --+-> | LISTENING  |
+------+ ------------> +------------+       +------------+
   ^                                            |
   |                                            | Voice recognition complete
   |          +------------+                    v
   +--------- |  SPEAKING  | <-----------------+
     Playback +------------+
```

- **IDLE**: Idle state, waiting for a wake word or button trigger
- **CONNECTING**: Connecting to the server
- **LISTENING**: Listening to user voice
- **SPEAKING**: System is replying with voice

## Shortcut Key Summary

| Function       | Shortcut Key   | Description                                      |
|----------------|----------------|--------------------------------------------------|
| Press to Talk  | Alt+Shift+V    | Press and hold to record, release to send (manual mode only) |
| Auto Talk      | Alt+Shift+A    | Start automatic conversation (auto-detect and send voice) |
| Interrupt      | Alt+Shift+X    | Interrupt the current AI reply                  |
| Switch Mode    | Alt+Shift+M    | Switch between manual and automatic modes       |

## Voice Commands

The system supports various voice commands. Below are common examples:

### Basic Interaction
- "Hello"/"Who are you" - Basic greetings and identity inquiries
- "Thank you"/"Goodbye" - Polite expressions

### IoT Control
- "Turn on/off the living room light" - Control lighting
- "Play Chrysanthemum Terrace on the IoT music player" - Start playing music

### Visual Recognition
- "Open the camera" - Turn on the camera
- "Analyze the scene" - Analyze the current scene
- "What do you see" - AI describes the recognized content
- "Close the camera" - Turn off the camera

## Run Modes

### GUI Mode (Default)
```bash
python main.py
```

### CLI Mode
```bash
python main.py --mode cli
```

### Build and Package

Use PyInstaller to package into an executable file:

```bash
# Universal command for all platforms
python scripts/build.py
```

## Platform Compatibility

- **Windows**: Fully supports all features
- **macOS**: 
  - System tray appears in the top status bar instead of the taskbar
  - Shortcut keys may require system permission authorization
- **Linux**: 
  - System tray support may vary depending on the desktop environment (GNOME/KDE/Xfce, etc.)
  - Some distributions may require additional system tray support packages

## Best Practices

1. **Clear Pronunciation**: Ensure clear pronunciation in a quiet environment
2. **Pause Appropriately**: Pausing between sentences helps with system recognition
3. **Use Wake Words**: Enable wake word functionality to avoid accidental triggers
4. **Check Feedback**: Pay attention to interface status prompts to understand the system's current state
5. **Concise Commands**: Use concise and clear commands for better recognition results

## Getting Help

If you encounter issues:

1. First, check the `docs/error_summary.md` document
2. Submit an issue via GitHub Issues
3. Seek help from the AI assistant
4. Contact the author (WeChat available on the homepage). Please prepare a Todesk link and explain your purpose. The author handles requests on weekday evenings.
