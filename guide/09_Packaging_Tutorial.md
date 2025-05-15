# Project Packaging Guide

## Overview

UnifyPy is a powerful automation solution that packages Python projects into cross-platform standalone executables and installers. The XiaoZhi client is pre-configured with the necessary packaging configuration files. This guide will walk you through the process of using UnifyPy for packaging.

## Prerequisites

### 1. Install Project Dependencies

First, ensure that all project dependencies are installed:

```bash
# Windows
pip install -r requirements.txt

# macOS
pip install -r requirements_mac.txt

# Linux
pip install -r requirements.txt
```

### 2. Clone the UnifyPy Repository

```bash
git clone https://github.com/huangjunsen0406/UnifyPy.git
cd UnifyPy
pip install -r requirements.txt
```

### 3. Install Platform-Specific Tools

#### Windows
- Install [Inno Setup](https://jrsoftware.org/isdl.php) (used for creating installers).
- After installation, configure the Inno Setup path in `build.json` or set the `INNO_SETUP_PATH` environment variable.

#### macOS
- Install `create-dmg` (used for creating DMG images):
   ```bash
   brew install create-dmg
   ```

#### Linux
Install the required tools based on the desired packaging format:

```bash
# DEB format (Debian/Ubuntu)
sudo apt-get install dpkg-dev

# RPM format (Fedora/CentOS)
sudo dnf install rpm-build

# AppImage format (generic Linux)
wget -c https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod a+x appimagetool-x86_64.AppImage
sudo mv appimagetool-x86_64.AppImage /usr/local/bin/appimagetool
```

## Packaging Configuration Details

The XiaoZhi client provides a pre-configured `build.json` file. Below is a detailed explanation of its configuration options:

### Basic Configuration

```json
{
      "name": "xiaozhi",                  // Application name, used for executable and installer names
      "version": "1.0.0",                 // Application version
      "publisher": "Junsen",              // Publisher name
      "entry": "main.py",                 // Program entry file
      "icon": "assets/xiaozhi_icon.ico",  // Application icon path
      "hooks": "hooks",                   // PyInstaller hooks directory
      "onefile": false,                   // Whether to generate a single-file executable
      
      // General PyInstaller arguments, applicable to all platforms
      "additional_pyinstaller_args": "--add-data assets;assets --add-data libs;libs --add-data src;src --add-data models;models --hidden-import=PyQt5",
      
      // Inno Setup path (required for Windows)
      "inno_setup_path": "E:\\application\\Inno Setup 6\\ISCC.exe",
      
      // Other configurations...
}
```

> **Note**: JSON files do not support comments. The comments in the example above are for explanation purposes only and should not be included in the actual configuration file.

### Platform-Specific Configuration

#### Windows

```json
"windows": {
      "format": "exe",                  // Output format
      "additional_pyinstaller_args": "--add-data assets;assets --add-data libs;libs --add-data src;src --add-data models;models --hidden-import=PyQt5 --noconsole",
      "desktop_entry": true,            // Whether to create a desktop shortcut
      "installer_options": {
            "languages": ["ChineseSimplified", "English"],  // Supported installer languages
            "license_file": "LICENSE",                      // License file
            "readme_file": "README.md",                     // Readme file
            "create_desktop_icon": true,                    // Whether to create a desktop icon
            "allow_run_after_install": true                 // Allow running the application after installation
      }
}
```

#### Linux

```json
"linux": {
      "format": "deb",                  // Output format: deb, rpm, or appimage
      "desktop_entry": true,            // Whether to create a desktop shortcut
      "categories": "Utility;Development;",  // Application categories
      "description": "XiaoZhi AI Client",    // Application description
      "requires": "libc6,libgtk-3-0,libx11-6,libopenblas-dev",  // Dependencies
      "additional_pyinstaller_args": "--add-data assets:assets --add-data libs:libs --add-data src:src --add-data models:models --hidden-import=PyQt5"
}
```

#### macOS

```json
"macos": {
      "format": "app",                  // Output format: app or dmg
      "additional_pyinstaller_args": "--add-data assets:assets --add-data libs:libs --add-data src:src --add-data models:models --hidden-import=PyQt5 --windowed",
      "app_bundle_name": "XiaoZhi.app", // Application bundle name
      "bundle_identifier": "com.junsen.xiaozhi",  // Bundle identifier
      "sign_bundle": false,             // Whether to sign the application bundle
      "create_dmg": true,               // Whether to create a DMG image
      "installer_options": {
            "license_file": "LICENSE",    // License file
            "readme_file": "README.md"    // Readme file
      }
}
```

### Other Important Configuration Options

```json
"build_installer": true  // Whether to build an installer; set to false to generate only the executable
```

### Custom Installer Template

When packaging a Windows installer, UnifyPy uses the `setup.iss.template` file as the Inno Setup script template. Note that the `AppId` in the template must be replaced with your unique identifier:

```
[Setup]
; Application Information
AppId={{05DBB87C-AE34-4F2F-AEC5-3CD2AFE9DC90}}  ; Replace with your own GUID
```

> **Important**: Do not use the example `AppId` directly, as it may conflict with other applications. Use an online GUID generator (e.g., [Online GUID Generator](https://www.guidgenerator.com/)) to create your unique identifier.

## Packaging Execution

### Basic Packaging Command

```bash
# Navigate to the UnifyPy directory
cd to the current py-xiaozhi project directory

# Execute the packaging command
# UnifyPy_path/main.py is the path to the UnifyPy project
# . represents the current project directory
# --config build.json specifies the configuration file in the current directory
python UnifyPy_path/main.py . --config build.json 
```

### Platform-Specific Packaging Commands

#### Windows
```bash
python C:\path\to\UnifyPy\main.py . --config build.json
```

#### macOS
```bash
python /path/to/UnifyPy/main.py . --config build.json
```

#### Linux

For Linux, there are two main packaging formats: DEB and AppImage. Choose one based on your needs.

##### DEB Packaging (for Debian/Ubuntu)

1. **Prepare the Environment**

    ```bash
    # Update the system and install necessary dependencies
    sudo apt update
    sudo apt install -y build-essential python3-dev python3-pip python3-setuptools libopenblas-dev liblapack-dev gfortran patchelf autoconf automake libtool cmake libssl-dev libatlas-base-dev
    ```

2. **Execute Packaging**

    Ensure `linux.format` in `build.json` is set to `"deb"`, then run:

    ```bash
    python3 /path/to/UnifyPy/main.py . --config build.json
    ```

##### AppImage Packaging (for Generic Linux)

AppImage packaging requires special attention to the NumPy library compilation. Follow these steps:

1. **Upgrade pip and Build Tools**

    ```bash
    python -m pip install --upgrade pip setuptools wheel
    ```

2. **Install Necessary System Dependencies**

    ```bash
    sudo apt update
    sudo apt install -y build-essential python3-dev python3-pip python3-setuptools libopenblas-dev liblapack-dev gfortran patchelf autoconf automake libtool cmake libssl-dev libatlas-base-dev
    ```

3. **Install Meson and Ninja Build Systems**

    ```bash
    pip install meson ninja
    sudo apt install -y meson ninja-build
    ```

4. **Prepare NumPy Compilation Environment**

    ```bash
    # Uninstall existing NumPy
    pip uninstall numpy -y
    
    # Set environment variables
    export BLAS=openblas
    export LAPACK=openblas
    export NPY_NUM_BUILD_JOBS=$(nproc)  # Use all CPU cores for faster compilation
    
    # Compile and install NumPy from source
    pip install numpy==1.26.4 --no-binary :all:
    ```

5. **Execute Packaging**

    Ensure `linux.format` in `build.json` is set to `"appimage"`, then run:

    ```bash
    python3 /path/to/UnifyPy/main.py . --config build.json
    ```

## Packaging Output

After successful packaging, the packaged application can be found in the `dist` folder in the project root directory:

- **Windows**: 
   - Executable (.exe) in the `dist/xiaozhi` directory
   - Installer in the `dist/installer` directory, named `xiaozhi-1.0.0-setup.exe`

- **macOS**: 
   - Application bundle (.app) in the `dist/xiaozhi` directory
   - Disk image (.dmg) in the `dist/installer` directory, named `xiaozhi-1.0.0.dmg`

- **Linux**: 
   - Executable in the `dist/xiaozhi` directory
   - Installer in the `dist/installer` directory:
      - DEB format: `xiaozhi-1.0.0.deb`
      - RPM format: `xiaozhi-1.0.0.rpm`
      - AppImage format: `xiaozhi-1.0.0.AppImage`

## Best Practices

1. **Clean the Project**: Remove temporary files, caches, and unnecessary large files before packaging.
2. **Test Dependencies**: Ensure all dependencies are correctly installed and importable.
3. **Verify File Paths**: Check that file paths in the code use relative paths or resource paths.
4. **Validate Configuration**: Ensure the `build.json` configuration matches your environment.
5. **Cross-Platform Testing**: If possible, test the packaged application on multiple platforms.
6. **Save Configurations**: Save different versions of configuration files for various packaging scenarios.
7. **Version Management**: Update the version number before each release to maintain consistency.
