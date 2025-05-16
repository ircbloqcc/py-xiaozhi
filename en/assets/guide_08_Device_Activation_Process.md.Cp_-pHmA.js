import{_ as a,c as i,o as n,ae as p}from"./chunks/framework.BGWP4WZ_.js";const c=JSON.parse('{"title":"Device Activation Process v2","description":"","frontmatter":{},"headers":[],"relativePath":"guide/08_Device_Activation_Process.md","filePath":"guide/08_Device_Activation_Process.md"}'),l={name:"guide/08_Device_Activation_Process.md"};function t(e,s,h,k,o,E){return n(),i("div",null,s[0]||(s[0]=[p(`<h1 id="device-activation-process-v2" tabindex="-1">Device Activation Process v2 <a class="header-anchor" href="#device-activation-process-v2" aria-label="Permalink to &quot;Device Activation Process v2&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>This document describes the v2 version of the Xiaozhi device authentication process.</p><h2 id="activation-process" tabindex="-1">Activation Process <a class="header-anchor" href="#activation-process" aria-label="Permalink to &quot;Activation Process&quot;">​</a></h2><p>Each device has a unique Serial Number (SN) and HMAC Key for authentication and secure communication. When a new device is used for the first time, it must go through the following activation process:</p><ol><li>The client sends device information to the server, including the serial number, MAC address, and client ID.</li><li>The server checks if the device is already activated:</li></ol><ul><li>If activated, the client operates normally.</li><li>If not activated, the server returns an activation request containing a verification code and a challenge.</li></ul><ol start="3"><li>The client displays the verification code and prompts the user to visit xiaozhi.me to enter the code.</li><li>The client signs the challenge using the HMAC key and sends it to the server for verification.</li><li>The client polls the server for the verification result:</li></ol><ul><li>If successful, the device is activated.</li><li>If failed or timed out, the activation fails.</li></ul><h3 id="xiaozhi-esp32-device-activation-flowchart" tabindex="-1">Xiaozhi ESP32 Device Activation Flowchart <a class="header-anchor" href="#xiaozhi-esp32-device-activation-flowchart" aria-label="Permalink to &quot;Xiaozhi ESP32 Device Activation Flowchart&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────────────┐</span></span>
<span class="line"><span>│     Device Start   │</span></span>
<span class="line"><span>└──────────┬─────────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>┌────────────────────┐</span></span>
<span class="line"><span>│ Initialize Modules │</span></span>
<span class="line"><span>│ Connect to WiFi    │</span></span>
<span class="line"><span>└──────────┬─────────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>┌────────────────────┐</span></span>
<span class="line"><span>│ Call CheckVersion  │</span></span>
<span class="line"><span>│ Access OTA Server  │──→ POST /xiaozhi/ota/</span></span>
<span class="line"><span>└──────────┬─────────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>┌────────────────────┐</span></span>
<span class="line"><span>│ Parse Server Reply │</span></span>
<span class="line"><span>└──────────┬─────────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>    ┌─────┴─────┐</span></span>
<span class="line"><span>    ↓           ↓</span></span>
<span class="line"><span>┌─────────┐ ┌─────────┐</span></span>
<span class="line"><span>│New Version?│ │Activation Needed?│</span></span>
<span class="line"><span>└─────┬───┘ └─────┬───┘</span></span>
<span class="line"><span>    │           │</span></span>
<span class="line"><span>┌─────▼───┐       └───┬─── No ──┐</span></span>
<span class="line"><span>│Upgrade FW│           ↓         ↓</span></span>
<span class="line"><span>└─────────┘  ┌─────────────┐ ┌─────────────┐</span></span>
<span class="line"><span>         │Activation Code?│ │Init Protocol│</span></span>
<span class="line"><span>         └──────┬──────┘ │MQTT/WebSocket│</span></span>
<span class="line"><span>              │        └─────────────┘</span></span>
<span class="line"><span>          ┌────▼───┐</span></span>
<span class="line"><span>          │   Yes   │</span></span>
<span class="line"><span>          └────┬───┘</span></span>
<span class="line"><span>             ↓</span></span>
<span class="line"><span>      ┌──────────────────┐</span></span>
<span class="line"><span>      │Display Code to User│</span></span>
<span class="line"><span>      │Play Voice Prompt   │</span></span>
<span class="line"><span>      └────────┬─────────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>      ┌──────────────────┐</span></span>
<span class="line"><span>      │ Start Activation │</span></span>
<span class="line"><span>      └────────┬─────────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>┌────────────────────────────────┐</span></span>
<span class="line"><span>│        Check Serial Number     │</span></span>
<span class="line"><span>└───────────────┬────────────────┘</span></span>
<span class="line"><span>           ↓</span></span>
<span class="line"><span>      ┌──────┴───────┐</span></span>
<span class="line"><span>      ↓              ↓</span></span>
<span class="line"><span>   ┌─────────┐    ┌─────────┐</span></span>
<span class="line"><span>   │  Has SN  │    │ No SN   │</span></span>
<span class="line"><span>   └─────┬────┘    └────┬────┘</span></span>
<span class="line"><span>       │              │</span></span>
<span class="line"><span>┌─────────▼────────┐    │</span></span>
<span class="line"><span>│Construct JSON Payload│ │</span></span>
<span class="line"><span>│- serial_number    │    │</span></span>
<span class="line"><span>│- challenge        │    │</span></span>
<span class="line"><span>│- hmac signature   │    │</span></span>
<span class="line"><span>└─────────┬─────────┘    │</span></span>
<span class="line"><span>       │              │</span></span>
<span class="line"><span>       └──────┬───────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>   ┌───────────────────────┐</span></span>
<span class="line"><span>   │POST to Activation API │──→ POST /xiaozhi/ota/activate</span></span>
<span class="line"><span>   └────────────┬──────────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>    ┌───────────┴───────────┐</span></span>
<span class="line"><span>    ↓           ↓           ↓</span></span>
<span class="line"><span>┌─────────┐ ┌─────────┐ ┌─────────┐</span></span>
<span class="line"><span>│Status 200│ │Status 202│ │Other Status│</span></span>
<span class="line"><span>│Activated │ │Retry     │ │Failed      │</span></span>
<span class="line"><span>└────┬────┘ └────┬────┘ └────┬────┘</span></span>
<span class="line"><span>    │           │           │</span></span>
<span class="line"><span>    │      ┌────▼─────┐     │</span></span>
<span class="line"><span>    │      │Retry Later│     │</span></span>
<span class="line"><span>    │      │Max 10 Times│     │</span></span>
<span class="line"><span>    │      └────┬─────┘     │</span></span>
<span class="line"><span>    │           │           │</span></span>
<span class="line"><span>    └───────────┼───────────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>      ┌──────────────────┐</span></span>
<span class="line"><span>      │Set Activation Flag│</span></span>
<span class="line"><span>      └────────┬─────────┘</span></span>
<span class="line"><span>            ↓</span></span>
<span class="line"><span>      ┌──────────────────┐</span></span>
<span class="line"><span>      │ Continue Normal   │</span></span>
<span class="line"><span>      │ MQTT/WS Protocol  │</span></span>
<span class="line"><span>      └──────────────────┘</span></span></code></pre></div><h3 id="detailed-activation-data-flow" tabindex="-1">Detailed Activation Data Flow <a class="header-anchor" href="#detailed-activation-data-flow" aria-label="Permalink to &quot;Detailed Activation Data Flow&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────┐                      ┌────────────┐                      ┌────────────┐</span></span>
<span class="line"><span>│            │                      │            │                      │            │</span></span>
<span class="line"><span>│  Device    │                      │   Server   │                      │   Browser  │</span></span>
<span class="line"><span>│            │                      │            │                      │            │</span></span>
<span class="line"><span>└─────┬──────┘                      └─────┬──────┘                      └─────┬──────┘</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Request Device Status (MAC, ID, SN) │                                   │</span></span>
<span class="line"><span>    │ ────────────────────────────────&gt; │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Return Activation Request (Code, Challenge) │                         │</span></span>
<span class="line"><span>    │ &lt;──────────────────────────────── │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Display Code                      │                                   │</span></span>
<span class="line"><span>    │ ┌─────────────┐                   │                                   │</span></span>
<span class="line"><span>    │ │Visit Website │                   │                                   │</span></span>
<span class="line"><span>    │ │Code: 123456  │                   │                                   │</span></span>
<span class="line"><span>    │ └─────────────┘                   │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │                                   │ User Visits xiaozhi.me            │</span></span>
<span class="line"><span>    │                                   │ &lt;─────────────────────────────────│</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │                                   │ User Enters Code 123456           │</span></span>
<span class="line"><span>    │                                   │ &lt;─────────────────────────────────│</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Compute HMAC Signature            │                                   │</span></span>
<span class="line"><span>    │ ┌─────────────┐                   │                                   │</span></span>
<span class="line"><span>    │ │ HMAC(Key,   │                   │                                   │</span></span>
<span class="line"><span>    │ │ Challenge)  │                   │                                   │</span></span>
<span class="line"><span>    │ └─────────────┘                   │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Send Activation Request (SN, Challenge, HMAC) │                       │</span></span>
<span class="line"><span>    │ ────────────────────────────────&gt; │                                   │</span></span>
<span class="line"><span>    │                                   │ ┌───────────────┐                │</span></span>
<span class="line"><span>    │                                   │ │ Wait for Code │                │</span></span>
<span class="line"><span>    │                                   │ │ Timeout: 202  │                │</span></span>
<span class="line"><span>    │                                   │ └───────────────┘                │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Poll for Result (HTTP Long Polling) │                                 │</span></span>
<span class="line"><span>    │ ────────────────────────────────&gt; │                                   │</span></span>
<span class="line"><span>    │ HTTP 202 (Pending)               │                                   │</span></span>
<span class="line"><span>    │ &lt;──────────────────────────────── │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Continue Polling...              │                                   │</span></span>
<span class="line"><span>    │ ────────────────────────────────&gt; │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │                                   │ Code Verified Successfully        │</span></span>
<span class="line"><span>    │                                   │───────────────────────────────────│</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ Activation Success (HTTP 200)    │                                   │</span></span>
<span class="line"><span>    │ &lt;──────────────────────────────── │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span>
<span class="line"><span>    │ ┌─────────────┐                   │                                   │</span></span>
<span class="line"><span>    │ │Activation OK │                   │                                   │</span></span>
<span class="line"><span>    │ └─────────────┘                   │                                   │</span></span>
<span class="line"><span>    │                                   │                                   │</span></span></code></pre></div><h2 id="device-server-communication-details" tabindex="-1">Device-Server Communication Details <a class="header-anchor" href="#device-server-communication-details" aria-label="Permalink to &quot;Device-Server Communication Details&quot;">​</a></h2><h3 id="_1-device-info-request-post-xiaozhi-ota" tabindex="-1">1. Device Info Request (POST /xiaozhi/ota/) <a class="header-anchor" href="#_1-device-info-request-post-xiaozhi-ota" aria-label="Permalink to &quot;1. Device Info Request (POST /xiaozhi/ota/)&quot;">​</a></h3><p><strong>Headers</strong>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Activation-Version: 2  // Indicates support for serial number activation</span></span>
<span class="line"><span>Device-Id: AA:BB:CC:DD:EE:FF  // MAC address</span></span>
<span class="line"><span>Client-Id: xxxx-xxxx-xxxx-xxxx  // Device UUID</span></span>
<span class="line"><span>User-Agent: BOARD_NAME/1.0.0  // Board name and firmware version</span></span>
<span class="line"><span>Content-Type: application/json</span></span></code></pre></div><p><strong>Request Body</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;flash_size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16777216</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;psram_size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8388608</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;minimum_free_heap_size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7265024</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;mac_address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;your_mac_address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;uuid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;your_client_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;chip_model_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;esp32s3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;chip_info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;cores&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;revision&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;features&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;application&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xiaozhi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.6.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;compile_time&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2025-04-16T12:00:00Z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;idf_version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;v5.3.2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;partition_table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nvs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;subtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">36864</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">24576</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;otadata&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;subtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">61440</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8192</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;subtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">65536</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1966080</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;subtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2031616</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1966080</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;spiffs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;subtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">130</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3997696</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;size&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1966080</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;ota&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;label&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;app0&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;board&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lc-esp32-s3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;LC ESP32-S3 Dev Board&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;features&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wifi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ble&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;psram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;octal_flash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;ip&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;your_ip_address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;mac&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;your_mac_address&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_2-server-response" tabindex="-1">2. Server Response <a class="header-anchor" href="#_2-server-response" aria-label="Permalink to &quot;2. Server Response&quot;">​</a></h3><p><strong>Response Body</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;firmware&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;activation&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;message&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Please visit xiaozhi.me and enter the activation code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;challenge&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;randomstring123456&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;timeout_ms&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;mqtt&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;endpoint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mqtt.xiaozhi.me&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;client_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;device123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;username&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;password&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pass123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;publish_topic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;websocket&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wss://api.tenclass.net/xiaozhi/v1/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test-token&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_3-device-activation-request-post-xiaozhi-ota-activate" tabindex="-1">3. Device Activation Request (POST /xiaozhi/ota/activate) <a class="header-anchor" href="#_3-device-activation-request-post-xiaozhi-ota-activate" aria-label="Permalink to &quot;3. Device Activation Request (POST /xiaozhi/ota/activate)&quot;">​</a></h3><p><strong>Request Body</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;Payload&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;algorithm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hmac-sha256&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;serial_number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;SN-5CD8467B47FB4920&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;challenge&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dac852d6-4ac4-4650-ba1a-c2a5bf00a766&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;hmac&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ada4775e3ed93cf9c0eb9ed00444138554ba416af41283a0e5603c77681a8022&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-activation-response" tabindex="-1">4. Activation Response <a class="header-anchor" href="#_4-activation-response" aria-label="Permalink to &quot;4. Activation Response&quot;">​</a></h3><ul><li><strong>Success</strong>: Status Code 200</li><li><strong>Pending User Input</strong>: Status Code 202</li><li><strong>Failure</strong>: Status Code 4xx (e.g., 401 for unauthorized, 400 for bad request)</li></ul><p><strong>Response Body</strong> (on failure):</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;error&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Description of the error&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="security-mechanisms" tabindex="-1">Security Mechanisms <a class="header-anchor" href="#security-mechanisms" aria-label="Permalink to &quot;Security Mechanisms&quot;">​</a></h2><p>The v2 device activation process employs the following security measures:</p><ol><li><strong>Unique Device Identifier</strong>: Each device has a unique Serial Number (SN).</li><li><strong>HMAC Signature Verification</strong>: Uses HMAC-SHA256 to sign the challenge, ensuring device authenticity.</li><li><strong>Verification Code</strong>: Requires users to enter a code on the website to prevent automated activation attacks.</li><li><strong>Polling Mechanism</strong>: Uses HTTP Long Polling to wait for server verification results, accommodating various network conditions.</li></ol>`,32)]))}const d=a(l,[["render",t]]);export{c as __pageData,d as default};
