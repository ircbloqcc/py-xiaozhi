
# Visual Recognition Feature

## Overview

py-xiaozhi provides camera control and visual recognition features, supporting voice commands to turn the camera on/off and perform intelligent analysis on the captured frames.

## Configuration Instructions

The visual recognition feature requires the following settings in the configuration file:

```json
"CAMERA": { 
   "camera_index": 0,         // Camera index, 0 is usually the built-in camera
   "frame_width": 640,        // Frame width
   "frame_height": 480,       // Frame height
   "fps": 30,                 // Frame rate
   "Loacl_VL_url": "https://open.bigmodel.cn/api/paas/v4/", // Zhipu API URL
   "VLapi_key": "your_key",   // Zhipu Vision Model API key
   "models": "glm-4v-plus"    // Vision model to use
}
```

## Zhipu Vision Model Configuration

1. Visit [Zhipu AI Open Platform](https://open.bigmodel.cn/)
2. Register an account and create an API key
3. Configure the obtained API key in the `CAMERA.VLapi_key` field of `config.json`
4. Select the model to use, default is `glm-4v-plus`

## Usage Instructions

### Voice Command Control

The system supports the following voice commands to control the camera and visual recognition features:

- **Turn on the camera**: Activates the system camera and starts capturing video
- **Turn off the camera**: Stops the camera capture
- **Recognize the frame**: Performs intelligent visual analysis on the current camera frame
- **Analyze the image**: Provides a detailed visual analysis of the current frame
- **What do you see**: Asks what the camera currently sees

### GUI Control

In graphical interface mode, you can control the camera features using the relevant buttons on the interface.

## Internal Implementation

The visual recognition feature is implemented through the CameraVL device class in the IoT module, consisting of two main components: Camera and VL.

1. **Camera Component**: Handles basic camera controls such as turning on/off and capturing video frames
2. **VL (Vision Language) Component**: Performs intelligent analysis on images by calling the Zhipu Vision Model API

Implementation structure:

```
CameraVL                 # Integrated camera and visual recognition device
├── Camera.py            # Camera control module
└── VL.py                # Vision language analysis module
```

## Workflow

1. The user issues a voice command to turn on the camera
2. The system activates the camera and displays the video stream on the interface
3. The user requests recognition of the current frame
4. The system captures the current frame and sends the image to the Zhipu Vision Model
5. The analysis result is returned and provided to the user via voice or text feedback

## Privacy Notice

The visual recognition feature uses your camera and processes frame content. Please note:

1. Frames captured by the camera are used only for local analysis or sent to the Zhipu API for analysis
2. When not controlled by voice commands, the camera remains off
3. You can modify camera settings or completely disable this feature in the configuration

## FAQ

1. **The camera cannot be turned on**
    - Ensure your device has a functional camera
    - Check if the camera is being used by another application
    - Verify that the application has permission to access the camera

2. **Visual recognition is unresponsive**
    - Check if the Zhipu API key is correctly configured
    - Ensure the network connection is stable
    - Verify if the API call limit has been exceeded

3. **Recognition results are inaccurate**
    - Improve lighting conditions for the camera
    - Ensure the target object is clearly visible in the frame
    - Consider upgrading the Zhipu Vision Model version

4. **Camera frame is lagging**
    - Lower the resolution or frame rate in the configuration
    - Close other applications consuming system resources
    - Update the camera driver
 