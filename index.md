---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "PY-XIAOZHI"
  tagline: py-xiaozhi is a Python-based XiaoZhi voice client designed for learning through code and experiencing AI XiaoZhi's voice features without hardware requirements.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/00_Documentation_Index
    - theme: alt
      text: View Source Code
      link: https://github.com/huangjunsen0406/py-xiaozhi

features:
  - title: AI Voice Interaction
    details: Supports voice input and recognition, enabling intelligent human-computer interaction with natural and smooth conversations.
  - title: Visual Multimodality
    details: Supports image recognition and processing, providing multimodal interaction capabilities to understand image content.
  - title: IoT Device Integration
    details: Supports smart home device control, including lights, volume, temperature sensors, and more. Integrates with the Home Assistant smart home platform, offers a timer feature, and includes various virtual and physical device drivers for easy expansion.
  - title: Online Music Playback
    details: A high-performance music player based on pygame, supporting play/pause/stop, progress control, lyrics display, and local caching for a more stable music playback experience.
  - title: Voice Wake-Up
    details: Supports wake word activation for interaction, eliminating the need for manual operation (disabled by default, requires manual activation).
  - title: Automatic Conversation Mode
    details: Enables continuous conversation for a smoother user interaction experience.
  - title: Graphical User Interface
    details: Provides an intuitive and user-friendly GUI with XiaoZhi expressions and text display for enhanced visual experience.
  - title: Command-Line Mode
    details: Supports CLI operation, suitable for embedded devices or environments without a GUI.
  - title: Cross-Platform Support
    details: Compatible with Windows 10+, macOS 10.15+, and Linux systems for use anytime, anywhere.
  - title: Volume Control
    details: Supports volume adjustment to suit different environmental needs with a unified sound control interface.
  - title: Session Management
    details: Effectively manages multi-turn conversations to maintain interaction continuity.
  - title: Encrypted Audio Transmission
    details: Supports the WSS protocol to ensure the security of audio data and prevent information leakage.
  - title: Automatic CAPTCHA Handling
    details: Automatically copies the CAPTCHA and opens the browser during the first use, simplifying user operations.
  - title: Automatic MAC Address Retrieval
    details: Avoids MAC address conflicts and improves connection stability.
  - title: Modular Code
    details: Splits the code into classes with clear responsibilities, making it easier for secondary development.
  - title: Stability Optimization
    details: Fixes multiple issues, including reconnection and cross-platform compatibility.

---

<div class="developers-section">
  <p>Thanks to the following developers for their contributions to py-xiaozhi</p>
  
  <div class="contributors-wrapper">
    <a href="https://github.com/huangjunsen0406/py-xiaozhi/graphs/contributors" class="contributors-link">
      <img src="https://contrib.rocks/image?repo=huangjunsen0406/py-xiaozhi&max=1000" alt="contributors" class="contributors-image"/>
    </a>
  </div>
  
  <div class="developers-actions">
    <a href="/py-xiaozhi/contributors" class="dev-button">View Special Contributors</a>
    <a href="/py-xiaozhi/contributing" class="dev-button outline">How to Contribute</a>
  </div>

</div>

<style>
.developers-section {
  text-align: center;
  max-width: 960px;
  margin: 4rem auto 0;
  padding: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.developers-section h2 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.contributors-wrapper {
  margin: 2rem auto;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.contributors-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.contributors-link {
  display: block;
  text-decoration: none;
  background-color: var(--vp-c-bg-soft);
}

.contributors-image {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s ease;
}

.developers-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.developers-actions a {
  text-decoration: none;
}

.dev-button {
  display: inline-block;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.dev-button:not(.outline) {
  background-color: var(--vp-c-brand);
  color: white;
}

.dev-button.outline {
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.dev-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .developers-actions {
    flex-direction: column;
  }
  
  .contributors-wrapper {
    margin: 1.5rem auto;
  }
}

.join-message {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.join-message h3 {
  margin-bottom: 1rem;
}
</style>
