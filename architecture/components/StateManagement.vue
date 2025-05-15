<template>
  <div class="bg-white rounded-lg relative mb-10">
    <div ref="stateChart" class="w-full h-[300px]"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div v-for="(state, index) in states" :key="index" class="bg-gray-50 p-4 rounded-lg border-l-4"
        :class="stateBorderColors[index]">
        <h4 class="font-bold mb-2">{{ state.name }}</h4>
        <p class="text-gray-700">{{ state.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// State management data
const states = [
  { name: 'IDLE', description: 'Idle state, waiting for user interaction or wake word' },
  { name: 'CONNECTING', description: 'Establishing connection' },
  { name: 'LISTENING', description: 'Listening for user input' },
  { name: 'SPEAKING', description: 'Playing voice response' }
];

const stateBorderColors = [
  'border-blue-500',
  'border-yellow-500',
  'border-green-500',
  'border-purple-500'
];

const stateChart = ref(null);

onMounted(() => {
  if (stateChart.value) {
    const chart = echarts.init(stateChart.value);
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [
        {
          type: 'graph',
          layout: 'circular',
          symbolSize: 60,
          roam: false,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 12
          },
          data: [
            { name: 'IDLE', itemStyle: { color: '#3b82f6' } },
            { name: 'CONNECTING', itemStyle: { color: '#eab308' } },
            { name: 'LISTENING', itemStyle: { color: '#22c55e' } },
            { name: 'SPEAKING', itemStyle: { color: '#a855f7' } }
          ],
          links: [
            { source: 'IDLE', target: 'CONNECTING', label: { show: true, formatter: 'Wake up' } },
            { source: 'CONNECTING', target: 'LISTENING', label: { show: true, formatter: 'Connection successful' } },
            { source: 'LISTENING', target: 'SPEAKING', label: { show: true, formatter: 'Response received' } },
            { source: 'SPEAKING', target: 'IDLE', label: { show: true, formatter: 'Playback finished' } },
            { source: 'LISTENING', target: 'IDLE', label: { show: true, formatter: 'Timeout' } },
            { source: 'CONNECTING', target: 'IDLE', label: { show: true, formatter: 'Connection failed' } }
          ],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.2
          }
        }
      ]
    });
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
});
</script>