# Local TTS Feature Description for Xiaozhi AI

## Feature Overview

Xiaozhi AI now supports local Text-to-Speech (TTS) functionality, allowing users to directly read specified text in the command-line interface. This feature is based on Pyttsx3 and can be used offline, providing high-quality Chinese speech synthesis.

## Technical Implementation

- Uses the Pyttsx3 engine to generate speech
- Supports quick triggering in the command line
- Speech data is sent to the local audio device for playback
- Enables fully local text reading functionality

## Usage Instructions

### Using in Command-Line Mode

In command-line mode, use the following command to trigger the TTS feature:

```
Your desired text to send
```

For example:
```
Hello, Xiaozhi
```

After execution, the system will convert the input text into speech and play it.

### Usage Tips

1. **Long Text Reading**: Supports reading longer texts, including punctuation marks.
2. **Volume Control**: Adjust the volume using the `v number` command, e.g., `v 80`.
3. **Interrupt Reading**: To interrupt the current reading, use the `x` command.
4. **Concurrency Control**: If the current reading is not finished, new TTS requests will automatically queue.

## Dependency Information

This feature depends on the following Python libraries:
- edge-tts: Python interface for Microsoft Edge TTS engine
- soundfile: Audio file processing
- pydub: Audio conversion and processing
- numpy: Data processing

## Common Issues

1. **No Sound Playback**:
   - Check if the system audio device is functioning properly.
   - Ensure the volume is set appropriately (adjust using commands like `v 80`).
   - Verify that the necessary audio drivers are installed on the system.

2. **Slow TTS Generation**:
   - The first use may require downloading the voice model, which can take some time.
   - Ensure a stable network connection (Edge TTS requires internet access).
   - Processing longer texts may take more time.

3. **Sound Quality Issues**:
   - The default voice is "zh-CN-XiaoxiaoNeural" female voice from Microsoft Edge TTS.
   - To use other voices, modify the `voice` parameter in the source code.
