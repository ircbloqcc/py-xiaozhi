<template>
  <div class="bg-white rounded-lg relative mb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div v-for="(module, index) in modules" :key="index" class="module-card">
        <div class="flex items-start">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center"
            :class="moduleColors[index % moduleColors.length]">
            <component :is="module.icon" class="w-6 h-6 text-white" />
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-lg font-semibold mb-2">{{ module.name }}</h3>
            <ul class="space-y-2">
              <li v-for="(feature, featureIndex) in module.features" :key="featureIndex" class="flex items-start">
                <CheckCircleIcon class="w-5 h-5 text-green-500 mt-1 mr-2" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  CogIcon, 
  ArrowsRightLeftIcon,
  DocumentIcon,
  SpeakerXMarkIcon,
  ComputerDesktopIcon,
  ServerIcon,
  LightBulbIcon,
  WrenchIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/solid';

// Module details
const modules = [
  {
    name: 'src/application.py',
    icon: CogIcon,
    features: [
      'Main application class, coordinates all subsystems',
      'Implements singleton pattern, manages global state',
      'Handles event dispatching and state transitions'
    ]
  },
  {
    name: 'src/protocols/',
    icon: ArrowsRightLeftIcon,
    features: [
      'Abstract interfaces and concrete implementations for communication protocols',
      'WebSocket protocol: for real-time bidirectional communication',
      'MQTT protocol: for IoT device communication'
    ]
  },
  {
    name: 'src/audio_codecs/',
    icon: DocumentIcon,
    features: [
      'Audio codecs for compressing/decompressing audio data',
      'Supports Opus encoding format'
    ]
  },
  {
    name: 'src/audio_processing/',
    icon: SpeakerXMarkIcon,
    features: [
      'Voice activity detection: determines if the user is speaking',
      'Wake word detection: recognizes specified wake words'
    ]
  },
  {
    name: 'src/display/',
    icon: ComputerDesktopIcon,
    features: [
      'User interface abstraction and implementation',
      'GUI: graphical interface based on PyQt5',
      'CLI: command-line interaction interface'
    ]
  },
  {
    name: 'src/iot/',
    icon: ServerIcon,
    features: [
      'IoT device management framework',
      'Device abstract classes and concrete implementations',
      'Supports smart home device control'
    ]
  },
  {
    name: 'src/iot/things/',
    icon: LightBulbIcon,
    features: [
      'Implementations of specific IoT devices',
      'Music player, temperature sensor',
      'Lighting control, camera, etc.'
    ]
  },
  {
    name: 'src/utils/',
    icon: WrenchIcon,
    features: [
      'Various utility functions and helper classes',
      'Log management, configuration management, etc.'
    ]
  }
];

const moduleColors = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-purple-600',
  'bg-pink-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-yellow-600',
  'bg-green-600'
];
</script>

<style scoped>
.module-card {
  transition: all 0.3s ease;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>