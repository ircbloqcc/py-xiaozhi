<template>
  <div class="bg-white rounded-lg relative mb-10">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="(tech, index) in techStack" :key="index"
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mb-3"
            :class="techColors[index % techColors.length]">
            <component :is="tech.icon" class="w-8 h-8 text-white" />
          </div>
          <h4 class="font-semibold text-center">{{ tech.name }}</h4>
          <p class="text-sm text-gray-600 text-center mt-1">{{ tech.description }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { 
  CodeBracketIcon,
  WindowIcon,
  DocumentIcon,
  SpeakerWaveIcon as AudioIcon,
  PuzzlePieceIcon,
  SignalIcon,
  ArrowPathIcon,
  ArrowsUpDownIcon,
  MusicalNoteIcon as MusicIcon
} from '@heroicons/vue/24/solid';

// Technology stack
const techStack = [
  {
    name: 'Python',
    description: '3.9-3.12',
    icon: CodeBracketIcon
  },
  {
    name: 'PyQt5',
    description: 'GUI framework',
    icon: WindowIcon
  },
  {
    name: 'OpusLib',
    description: 'Audio codec',
    icon: DocumentIcon
  },
  {
    name: 'PyAudio',
    description: 'Audio processing',
    icon: AudioIcon
  },
  {
    name: 'WebSocket',
    description: 'Communication protocol',
    icon: PuzzlePieceIcon
  },
  {
    name: 'MQTT',
    description: 'IoT communication',
    icon: SignalIcon
  },
  {
    name: 'AsyncIO',
    description: 'Asynchronous processing',
    icon: ArrowPathIcon
  },
  {
    name: 'Threading',
    description: 'Concurrent processing',
    icon: ArrowsUpDownIcon
  },
  {
    name: 'Pygame',
    description: 'Music playback',
    icon: MusicIcon
  }
];

const techColors = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-teal-500'
];
</script>

<style scoped>
/* Technology stack icon hover effect */
.grid-cols-2.md\:grid-cols-3.lg\:grid-cols-6 > div {
  transition: all 0.2s ease;
}

.grid-cols-2.md\:grid-cols-3.lg\:grid-cols-6 > div:hover {
  transform: translateY(-3px);
}
</style>