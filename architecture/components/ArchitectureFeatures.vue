<script setup lang="ts">
import {
  PuzzlePieceIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  ShareIcon
} from '@heroicons/vue/24/solid';
// Architecture Features
const architectureFeatures = [
  {
    title: 'Modular Design',
    description: 'Highly decoupled functional modules for easy maintenance and expansion',
    icon: CubeIcon
  },
  {
    title: 'Protocol Abstraction',
    description: 'Supports multiple communication protocols via abstract interfaces',
    icon: ArrowsRightLeftIcon
  },
  {
    title: 'Event Driven',
    description: 'Asynchronous processing mechanism based on events',
    icon: BoltIcon
  },
  {
    title: 'State Machine Pattern',
    description: 'Clear state transition logic',
    icon: ShareIcon
  },
  {
    title: 'Pluggable IoT Devices',
    description: 'Unified device interface, supports dynamic device loading',
    icon: PuzzlePieceIcon
  }
];

const featureColors = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500'
];
</script>

<template>
  <div class="bg-white rounded-lg relative mb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(feature, index) in architectureFeatures" :key="index"
          class="bg-white rounded-lg p-6 hover:shadow-xl transition-shadow">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            :class="featureColors[index % featureColors.length]">
            <component :is="feature.icon" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-700">{{ feature.description }}</p>
        </div>
      </div>
    </div>
</template>

<style scoped>
/* Architecture feature card style optimization */
.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3 > div {
  transition: all 0.3s ease;
  height: 100%;
}

.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3 > div:hover {
  transform: translateY(-5px);
}
</style>