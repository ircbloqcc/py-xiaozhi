# System Dependency Installation

⚠️ Please follow the installation order in the guide to install software and tools.

⚠️ It is recommended to use a conda environment for installation. PyQt5 and OpenCV can be installed using precompiled versions from conda. Using pip on arm64 devices with 4GB or less memory may result in compilation failures for PyQt5 and OpenCV.

## System Dependency Installation

### Windows

1. **Install FFmpeg**
   ```bash
   # Method 1: Install using Scoop (Recommended)
   scoop install ffmpeg
   
   # Method 2: Manual Installation
   # 1. Visit https://github.com/BtbN/FFmpeg-Builds/releases to download
   # 2. Extract and add the bin directory to the system PATH
   ```

2. **Opus Audio Codec Library**
   - The project will automatically include `opus.dll` by default, no manual installation is required.
   - If issues occur, copy `/libs/windows/opus.dll` to one of the following locations:
     - Application directory
     - `C:\Windows\System32`

### Linux (Debian/Ubuntu)

```bash
# Install system dependencies
sudo apt-get update
# Required
sudo apt-get install python3-pyaudio portaudio19-dev ffmpeg libopus0 libopus-dev build-essential python3-venv

# Install volume control dependencies (choose one of the following)
# 1. PulseAudio tools (Recommended)
sudo apt-get install pulseaudio-utils

# 2. Or ALSA tools
sudo apt-get install alsa-utils

# 3. If using alsamixer, also install expect
sudo apt-get install alsa-utils expect
```

### macOS

```bash
# Install system dependencies using Homebrew
brew install portaudio opus python-tk ffmpeg gfortran
brew upgrade tcl-tk
```

---

## Python Dependency Installation

### Method 1: Using Miniconda (Recommended)

1. **Download Miniconda Installer**

   Choose the appropriate installer for your system architecture or operating system:

   | System / Architecture | Download Command |
   |:-----------------------|:-----------------|
   | **Linux - x86_64** (PC/Server) | ```bash wget -O Miniconda3-latest-Linux-x86_64.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh ``` |
   | **Linux - aarch64** (ARM64, e.g., Raspberry Pi) | ```bash wget -O Miniconda3-latest-Linux-aarch64.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh ``` |
   | **Linux - ppc64le** (IBM Power Server) | ```bash wget -O Miniconda3-latest-Linux-ppc64le.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-ppc64le.sh ``` |
   | **Windows - x86_64** (Standard Windows PC) | [Click to Download](https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe) |
   | **Windows - arm64** (ARM Windows devices) | [Click to Download](https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-arm64.exe) |
   | **macOS - x86_64** (Intel Mac) | ```bash wget -O Miniconda3-latest-MacOSX-x86_64.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh ``` |
   | **macOS - arm64** (Apple Silicon, e.g., M1/M2/M3) | ```bash wget -O Miniconda3-latest-MacOSX-arm64.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh ``` |

2. **Add Execution Permission (Linux/macOS Only)**

   ```bash
   chmod +x Miniconda3-latest-*.sh
   ```

3. **Run the Installer (Linux/macOS Only)**

   ```bash
   ./Miniconda3-latest-*.sh
   ```

   ⚡ *Note: Do not use `sudo` for installation on Linux/macOS.*

4. **Follow Installation Steps**

   - Accept the license agreement by typing `yes`.
   - Choose the installation path (default: `$HOME/miniconda3`).
   - Initialize Miniconda by typing `yes` (recommended).

5. **Configure Environment Variables (If Not Automatically Configured)**

   Add the following to your `.bashrc` (Linux/macOS):

   ```bash
   export PATH="$HOME/miniconda3/bin:$PATH"
   ```

   Apply changes:

   ```bash
   source ~/.bashrc
   ```

6. **Verify Installation**

   ```bash
   conda --version
   ```

   If you see a version number, the installation was successful.

7. **Optional: Disable Auto-Activation of Base Environment**

   ```bash
   conda config --set auto_activate_base false
   ```

8. **Switch to the Fastest Pip Mirror**

   Use the [chsrc tool](https://github.com/RubyMetric/chsrc) to switch pip mirrors for faster downloads.

   ```bash
   # Windows (Run in PowerShell as Administrator)
   winget install RubyMetric.chsrc --source winget

   # Linux/macOS
   wget -O- aslant.top/chsrc.sh | sudo bash
   chsrc set pip
   ```

---

### Install Project Dependencies

1. **Create Conda Environment**

   ```bash
   conda create -n py-xiaozhi python=3.10 -y
   ```

2. **Activate Environment**

   ```bash
   conda activate py-xiaozhi
   ```

3. **Install Python Dependencies**

   ```bash
   # Windows/Linux
   pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple
   # macOS
   pip install -r requirements_mac.txt -i https://mirrors.aliyun.com/pypi/simple
   ```

4. **Install Additional Dependencies**

   ```bash
   # PyQt5
   conda install pyqt=5.15.10 -y

   # OpenCV
   conda install opencv=4.10.0 -y

   # Windows-specific dependency
   pip install wmi
   ```

---

### Method 2: Using venv (Not Recommended)

1. **Create Virtual Environment**

   ```bash
   python -m venv .venv
   ```

2. **Activate Virtual Environment**

   ```bash
   # Windows
   .venv\Scripts\activate
   # Linux/macOS
   source .venv/bin/activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple
   ```

4. **Install Additional Dependencies**

   ```bash
   pip install PyQt5==5.15.9 opencv-python==4.11.0.86 wmi==1.5.1 -i https://mirrors.aliyun.com/pypi/simple
   ```

---

## Notes

1. Use Python 3.9.13+ (Recommended: 3.10, Max: 3.12).
2. Windows users do not need to manually install `opus.dll`.
3. Ensure ffmpeg and Opus are installed when using Conda.
4. Do not share the same Conda environment with `esp32-server`.
5. Use domestic mirrors for faster dependency installation.
6. macOS users should use `requirements_mac.txt`.
7. Install system dependencies before Python dependencies.
