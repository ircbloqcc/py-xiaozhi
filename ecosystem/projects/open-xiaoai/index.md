---
title: open-xiaoai
description: An open-source project that lets your XiaoAI Speaker "hear your voice" and unlocks unlimited possibilities
---

# open-xiaoai

<div class="project-header">
  <div class="project-logo">
    <img src="https://avatars.githubusercontent.com/u/35302658?s=48&v=4" alt="open-xiaoai Logo">
  </div>
  <div class="project-badges">
    <span class="badge platform">Cross-platform</span>
    <span class="badge language">Rust/Python/Node.js</span>
    <span class="badge status">Experimental</span>
  </div>
</div>

<div class="project-banner">
  <img src="./images/logo.png" alt="Open-XiaoAI Project Banner">
</div>

## Project Overview

Open-XiaoAI is an open-source project that lets your XiaoAI Speaker "hear your voice" and seamlessly integrates it with the XiaoZhi AI ecosystem. The project directly takes over the "ears" and "mouth" of the XiaoAI Speaker, fully unleashing its potential through multimodal large models and AI Agent technology, unlocking unlimited possibilities.

In 2017, when the world's first smart speaker with tens of millions of sales was born, we thought we had touched the future. But soon we realized these devices were trapped in a "command-response" cage:

- It can hear decibels, but not understand emotions
- It can execute commands, but not think proactively
- It has millions of users, but only one way of thinking

The "Jarvis"-level AI we imagined has become just an "alarm clock + music player" in reality.

**True intelligence should not be bound by preset code logic, but should evolve through interaction like a living being.**

Building on the previous [MiGPT](https://github.com/idootop/mi-gpt) project, Open-XiaoAI evolves again, providing a new way for the XiaoZhi ecosystem to interact with the XiaoAI Speaker.

## Core Features

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">🎤</div>
    <h3>Voice Input Takeover</h3>
    <p>Directly captures the XiaoAI Speaker's microphone input, bypassing original speech recognition limitations</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🔊</div>
    <h3>Audio Output Control</h3>
    <p>Fully takes over the speaker, allowing playback of custom audio and TTS content</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🧠</div>
    <h3>AI Model Integration</h3>
    <p>Supports integration with XiaoZhi AI, ChatGPT, and other large models for natural conversation</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🌐</div>
    <h3>Cross-platform Support</h3>
    <p>Client is developed in Rust; Server supports Python and Node.js implementations</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛠️</div>
    <h3>Extensible Architecture</h3>
    <p>Modular design makes it easy for developers to add custom features and integrate other services</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🎮</div>
    <h3>Developer Friendly</h3>
    <p>Detailed documentation and tutorials help developers get started quickly and customize features</p>
  </div>
</div>

## Demo Videos

<div class="demo-videos">
  <div class="video-item">
    <a href="https://www.bilibili.com/video/BV1NBXWYSEvX" target="_blank" class="video-link">
      <div class="video-thumbnail">
        <img src="https://raw.githubusercontent.com/idootop/open-xiaoai/main/docs/images/xiaozhi.jpg" alt="XiaoAI Speaker with XiaoZhi AI">
      </div>
      <div class="video-title">
        <span class="video-icon">▶️</span>
        <span>XiaoAI Speaker with XiaoZhi AI Demo</span>
      </div>
    </a>
  </div>
  
  <div class="video-item">
    <a href="https://www.bilibili.com/video/BV1N1421y7qn" target="_blank" class="video-link">
      <div class="video-thumbnail">
        <img src="https://github.com/idootop/open-xiaoai/raw/main/docs/images/migpt.jpg" alt="XiaoAI Speaker with MiGPT">
      </div>
      <div class="video-title">
        <span class="video-icon">▶️</span>
        <span>XiaoAI Speaker with MiGPT Demo</span>
      </div>
    </a>
  </div>
</div>

## Quick Start

<div class="important-notice">
  <div class="notice-icon">⚠️</div>
  <div class="notice-content">
    <strong>Important Notice</strong>
    <p>This tutorial is only applicable to <strong>XiaoAI Speaker Pro (LX06)</strong> and <strong>Xiaomi Smart Speaker Pro (OH2P)</strong>. <strong>Do not use</strong> with other models!</p>
  </div>
</div>

The Open-XiaoAI project consists of a Client and a Server. You can get started quickly by following these steps:

### Installation Steps

<div class="steps">
  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h4>XiaoAI Speaker Firmware Update</h4>
      <p>Flash the patched firmware to your XiaoAI Speaker, enable SSH, and connect to the speaker</p>
      <a href="https://github.com/idootop/open-xiaoai/blob/main/docs/flash.md" target="_blank" class="step-link">View detailed tutorial</a>
    </div>
  </div>
  
  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h4>Client Deployment</h4>
      <p>Compile the Client patch program on your computer, then copy it to the speaker and run it</p>
      <a href="https://github.com/idootop/open-xiaoai/blob/main/packages/client-rust/README.md" target="_blank" class="step-link">View detailed tutorial</a>
    </div>
  </div>
  
  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h4>Server Deployment</h4>
      <p>Run the Server demo program on your computer to experience the new capabilities of the XiaoAI Speaker</p>
      <ul class="step-options">
        <li><a href="https://github.com/idootop/open-xiaoai/blob/main/packages/server-python/README.md" target="_blank">Python Server - XiaoAI Speaker with XiaoZhi AI</a></li>
        <li><a href="https://github.com/idootop/open-xiaoai/blob/main/packages/server-node/README.md" target="_blank">Node.js Server - XiaoAI Speaker with MiGPT-Next</a></li>
      </ul>
    </div>
  </div>
</div>

## How It Works

Open-XiaoAI works as follows:

1. **Firmware Patch**: Modifies the XiaoAI Speaker firmware to allow SSH access and low-level system control
2. **Audio Stream Hijacking**: The client program directly captures microphone input and controls speaker output
3. **Network Communication**: The client and server establish a WebSocket connection for real-time communication
4. **AI Processing**: The server receives voice input, processes it with an AI model, and returns the response
5. **Custom Features**: Developers can implement various custom features and integrations on the server

## Related Projects

If you don't want to flash firmware or don't have a XiaoAI Speaker Pro, the following projects may be useful:

- [MiGPT](https://github.com/idootop/mi-gpt) - The original project to connect ChatGPT to XiaoAI Speaker
- [MiGPT-Next](https://github.com/idootop/migpt-next) - The next generation of MiGPT
- [XiaoGPT](https://github.com/yihong0618/xiaogpt) - Another ChatGPT integration for XiaoAI Speaker
- [XiaoMusic](https://github.com/hanxi/xiaomusic) - Enhanced music playback for XiaoAI Speaker

## Technical References

If you want to learn more technical details, the following links may help:

- [xiaoai-patch](https://github.com/duhow/xiaoai-patch) - XiaoAI Speaker firmware patch
- [open-lx01](https://github.com/jialeicui/open-lx01) - Open-source project for XiaoAI Speaker LX01
- [XiaoAI FM Research](https://javabin.cn/2021/xiaoai_fm.html) - Research on XiaoAI Speaker FM functionality
- [Xiaomi Device Security Research](https://github.com/yihong0618/gitblog/issues/258) - Xiaomi IoT device security analysis
- [XiaoAI Speaker Exploration](https://xuanxuanblingbling.github.io/iot/2022/09/16/mi/) - Technical exploration of XiaoAI Speaker

## Disclaimer

<div class="disclaimer">
  <h4>Scope of Use</h4>
  <p>This project is a non-profit open-source project, intended only for technical research, security vulnerability verification, and non-commercial personal use. It is strictly prohibited to use for commercial services, network attacks, data theft, system destruction, or any scenarios that violate the Cybersecurity Law or the laws of your jurisdiction.</p>
  
  <h4>Unofficial Statement</h4>
  <p>This project is independently developed by third-party developers and has no affiliation, cooperation, authorization, or technical support from Xiaomi Group or its affiliates ("the rights holder"). All rights to trademarks, firmware, and cloud services mentioned in the project belong to Xiaomi Group. If the rights holder asserts their rights, users should immediately stop using and delete this project.</p>
  
  <p>By continuing to use this project, you acknowledge that you have read and agree to the <a href="https://github.com/idootop/open-xiaoai/blob/main/agreement.md" target="_blank">User Agreement</a>. Otherwise, please stop using and delete this project immediately.</p>
</div>

## License

This project uses the [MIT](https://github.com/idootop/open-xiaoai/blob/main/LICENSE) License © 2024-PRESENT Del Wang

<style>
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
  background-color: rgba(139, 92, 246, 0.2);
  color: rgb(139, 92, 246);
}

.project-banner {
  width: 100%;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.project-banner img {
  width: 100%;
  height: auto;
  display: block;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--vp-c-brand);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.demo-videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.video-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.video-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.video-thumbnail {
  width: 100%;
  height: 180px;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.video-icon {
  color: var(--vp-c-brand);
}

.important-notice {
  background-color: rgba(234, 179, 8, 0.1);
  border-left: 4px solid rgba(234, 179, 8, 0.8);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
}

.notice-icon {
  font-size: 1.5rem;
}

.notice-content strong {
  display: block;
  margin-bottom: 0.5rem;
}

.steps {
  margin: 2rem 0;
}

.step {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.step-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.step-link:hover {
  text-decoration: underline;
}

.step-options {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.architecture-diagram {
  text-align: center;
  margin: 2rem 0;
}

.architecture-diagram img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.disclaimer {
  background-color: rgba(239, 68, 68, 0.1);
  border-left: 4px solid rgba(239, 68, 68, 0.8);
  border-radius: 0 8px 8px 0;
  padding: 1.5rem;
  margin: 2rem 0;
}

.disclaimer h4 {
  margin-top: 0;
  color: rgba(239, 68, 68, 0.8);
  margin-bottom: 0.5rem;
}

.disclaimer p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .project-logo {
    margin-bottom: 1rem;
  }
  
  .demo-videos {
    grid-template-columns: 1fr;
  }
}
</style> 