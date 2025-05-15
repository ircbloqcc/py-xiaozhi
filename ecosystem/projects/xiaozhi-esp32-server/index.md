---
title: xiaozhi-esp32-server
description: Lightweight and efficient voice interaction server based on ESP32
---

# xiaozhi-esp32-server

<div class="project-header">
  <div class="project-logo">
    <img src="./images/logo.png" alt="xiaozhi-esp32-server Logo" onerror="this.src='/py-xiaozhi/images/logo.png'; this.onerror=null;">
  </div>
  <div class="project-badges">
    <span class="badge platform">ESP32</span>
    <span class="badge language">Python</span>
    <span class="badge status">Active Development</span>
  </div>
</div>

<div class="project-intro">
  <p>xiaozhi-esp32-server is a backend service for the open-source smart hardware project <a href="https://github.com/78/xiaozhi-esp32" target="_blank">xiaozhi-esp32</a>. It is implemented in Python according to the <a href="https://ccnphfhqs21z.feishu.cn/wiki/M0XiwldO9iJwHikpXD5cEx71nKh" target="_blank">Xiaozhi Communication Protocol</a>, helping you quickly set up your own Xiaozhi server.</p>
</div>

## Target Audience

This project is intended for use with ESP32 hardware devices. If you have already purchased ESP32 hardware, successfully connected to the backend service deployed by Xiage, and want to set up your own independent `xiaozhi-esp32` backend, this project is for you.

<div class="warning-box">
  <h3>⚠️ Important Notice</h3>
  <ol>
    <li>This project is open-source software and has no commercial relationship with any third-party API service providers (including but not limited to speech recognition, LLMs, TTS platforms, etc.). It does not guarantee the quality or financial security of their services. Users are advised to choose providers with proper business licenses and carefully read their service agreements and privacy policies. This software does not host any account keys, does not participate in financial transactions, and does not bear any risk of fund loss.</li>
    <li>This project is relatively new and has not passed network security assessments. Do not use it in production environments. If you deploy this project on a public network for learning purposes, be sure to enable protection in the <code>config.yaml</code> configuration file.</li>
  </ol>
</div>

## Core Features

<div class="features-container">
  <div class="feature-item">
    <div class="feature-icon">🔄</div>
    <h3>Communication Protocol</h3>
    <p>Based on the <code>xiaozhi-esp32</code> protocol, data exchange via WebSocket</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">💬</div>
    <h3>Dialogue Interaction</h3>
    <p>Supports wake-up dialogue, manual dialogue, real-time interruption, and auto-sleep after inactivity</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🧠</div>
    <h3>Intent Recognition</h3>
    <p>Supports LLM-based intent recognition and function call, reducing hardcoded intent logic</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🌐</div>
    <h3>Multilingual Recognition</h3>
    <p>Supports Mandarin, Cantonese, English, Japanese, Korean (default: FunASR)</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🤖</div>
    <h3>LLM Module</h3>
    <p>Flexible LLM module switching. Default: ChatGLMLLM. Also supports Alibaba Bailian, DeepSeek, Ollama, etc.</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🔊</div>
    <h3>TTS Module</h3>
    <p>Supports EdgeTTS (default), Doubao TTS, and more, meeting various speech synthesis needs</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">📝</div>
    <h3>Memory Function</h3>
    <p>Supports long-term memory, local summary memory, and no-memory modes for different scenarios</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🏠</div>
    <h3>IOT Functionality</h3>
    <p>Manage registered IOT devices and control smart home devices based on dialogue context</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🖥️</div>
    <h3>Smart Console</h3>
    <p>Web management interface for agent management, user management, system configuration, etc.</p>
  </div>
</div>

## Deployment Methods

This project provides two deployment methods. Choose according to your needs:

<div class="deployment-table">
  <table>
    <thead>
      <tr>
        <th>Deployment Method</th>
        <th>Features</th>
        <th>Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Minimal Installation</strong></td>
        <td>Smart dialogue, IOT functionality, data stored in config files</td>
        <td>Low-resource environments, no database required</td>
      </tr>
      <tr>
        <td><strong>Full Module Installation</strong></td>
        <td>Smart dialogue, IOT, OTA, Smart Console, data stored in database</td>
        <td>Full feature experience</td>
      </tr>
    </tbody>
  </table>
</div>

For detailed deployment documentation, see:
- [Docker Deployment Guide](https://github.com/xinnan-tech/xiaozhi-esp32-server/blob/main/docs/Deployment.md)
- [Source Code Deployment Guide](https://github.com/xinnan-tech/xiaozhi-esp32-server/blob/main/docs/Deployment_all.md)

## Supported Platforms

xiaozhi-esp32-server supports a wide range of third-party platforms and components:

### LLM Language Models

<div class="platform-item">
  <h4>API Integration</h4>
  <p><strong>Supported Platforms:</strong> Alibaba Bailian, Doubao, DeepSeek, Zhipu ChatGLM, Gemini, Ollama, Dify, Fastgpt, Coze</p>
  <p><strong>Free Platforms:</strong> Zhipu ChatGLM, Gemini</p>
  <p><em>Any LLM supporting the OpenAI API can be integrated</em></p>
</div>

### TTS Speech Synthesis

<div class="platform-item">
  <h4>API Integration</h4>
  <p><strong>Supported Platforms:</strong> EdgeTTS, Doubao TTS, Tencent Cloud, Alibaba Cloud TTS, CosyVoiceSiliconflow, TTS302AI, CozeCnTTS, GizwitsTTS, ACGNTTS, OpenAITTS</p>
  <p><strong>Free Platforms:</strong> EdgeTTS, CosyVoiceSiliconflow (partial)</p>
  
  <h4>Local Services</h4>
  <p><strong>Supported Platforms:</strong> FishSpeech, GPT_SOVITS_V2, GPT_SOVITS_V3, MinimaxTTS</p>
  <p><strong>Free Platforms:</strong> FishSpeech, GPT_SOVITS_V2, GPT_SOVITS_V3, MinimaxTTS</p>
</div>

### ASR Speech Recognition

<div class="platform-item">
  <h4>API Integration</h4>
  <p><strong>Supported Platforms:</strong> DoubaoASR</p>
  
  <h4>Local Services</h4>
  <p><strong>Supported Platforms:</strong> FunASR, SherpaASR</p>
  <p><strong>Free Platforms:</strong> FunASR, SherpaASR</p>
</div>

### More Components

- **VAD Voice Activity Detection**: Supports SileroVAD (local, free)
- **Memory Storage**: Supports mem0ai (1000 times/month), mem_local_short (local summary, free)
- **Intent Recognition**: Supports intent_llm (LLM-based intent recognition), function_call (intent via LLM function call)

## Contributing

xiaozhi-esp32-server is an active open-source project. Contributions and feedback are welcome:

- [GitHub Repository](https://github.com/xinnan-tech/xiaozhi-esp32-server)
- [Issue Tracker](https://github.com/xinnan-tech/xiaozhi-esp32-server/issues)
- [Open Letter to Developers](https://github.com/xinnan-tech/xiaozhi-esp32-server/blob/main/docs/contributor_open_letter.md)

<style>
/* (CSS remains unchanged) */
.project-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.project-logo {
  width: 100px;
  height: 100px;
  margin-right: 1.5rem;
}

.project-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge.platform {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.badge.language {
  background-color: rgba(59, 130, 246, 0.2);
  color: rgb(59, 130, 246);
}

.badge.status {
  background-color: rgba(16, 185, 129, 0.2);
  color: rgb(16, 185, 129);
}

.project-intro {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.warning-box {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(234, 179, 8, 0.1);
  border-left: 4px solid rgba(234, 179, 8, 0.8);
  border-radius: 8px;
}

.warning-box h3 {
  color: rgb(234, 179, 8);
  margin-top: 0;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  color: var(--vp-c-brand);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.deployment-table {
  margin: 2rem 0;
  overflow-x: auto;
}

.deployment-table table {
  width: 100%;
  border-collapse: collapse;
}

.deployment-table th, 
.deployment-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.deployment-table th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 500;
}

.platform-item {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.platform-item h4 {
  color: var(--vp-c-brand);
  margin-top: 0;
  margin-bottom: 1rem;
}

.platform-item p {
  margin: 0.5rem 0;
}

.demo-videos {
  margin: 2rem 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.video-item {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: var(--vp-c-bg-soft);
}

.video-item:hover {
  transform: translateY(-5px);
}

.video-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-item:hover .video-thumbnail img {
  transform: scale(1.05);
}

.video-title {
  padding: 1rem;
  font-weight: 500;
}

.demo-more {
  text-align: center;
  margin-top: 1.5rem;
}

.demo-more a {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.demo-more a:hover {
  background-color: var(--vp-c-brand-dark);
}

.related-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.project-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  color: var(--vp-c-brand);
  margin-top: 0;
  margin-bottom: 1rem;
}

.project-link {
  margin-top: auto;
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.project-link:hover {
  background-color: var(--vp-c-brand-dark);
}

.contributors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.contributor {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.contributor img {
  width: 120px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.contributor h4 {
  color: var(--vp-c-brand);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .project-logo {
    margin-bottom: 1rem;
  }
  
  .contributors {
    grid-template-columns: 1fr;
  }
  
  .related-projects {
    grid-template-columns: 1fr;
  }
  
  .features-container {
    grid-template-columns: 1fr;
  }
}
</style> 