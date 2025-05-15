<template>
  <div class="bg-white rounded-lg relative mb-10">
    <div ref="architectureChart" class="w-full h-[500px]"></div>
    <p class="text-gray-600 mt-4 text-center">
      Core Architecture Diagram: Shows the relationships between the application core, communication protocol layer, audio processing system, user interface system, IoT device management, and other modules.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const architectureChart = ref(null);

onMounted(() => {
  if (architectureChart.value) {
    const chart = echarts.init(architectureChart.value);
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['Core', 'Main Module', 'Submodule']
      },
      series: [
        {
          name: 'Architecture Diagram',
          type: 'graph',
          layout: 'force',
          data: [
            { name: 'Application Core', value: 'Application', category: 0, symbolSize: 70 },
            { name: 'Communication Protocol Layer', value: 'Protocols', category: 1, symbolSize: 50 },
            { name: 'Audio Processing System', value: 'Audio Processing', category: 1, symbolSize: 50 },
            { name: 'User Interface System', value: 'UI System', category: 1, symbolSize: 50 },
            { name: 'IoT Device Management', value: 'IoT Management', category: 1, symbolSize: 50 },
            { name: 'WebSocket', value: 'WebSocket', category: 2, symbolSize: 30 },
            { name: 'MQTT', value: 'MQTT', category: 2, symbolSize: 30 },
            { name: 'Audio Codec', value: 'Audio Codecs', category: 2, symbolSize: 30 },
            { name: 'VAD Detection', value: 'VAD', category: 2, symbolSize: 30 },
            { name: 'Wake Word Detection', value: 'Wakeword', category: 2, symbolSize: 30 },
            { name: 'GUI', value: 'GUI', category: 2, symbolSize: 30 },
            { name: 'CLI', value: 'CLI', category: 2, symbolSize: 30 },
            { name: 'Device Abstraction', value: 'Device Abstract', category: 2, symbolSize: 30 },
            { name: 'Smart Home', value: 'Smart Home', category: 2, symbolSize: 30 }
          ],
          links: [
            { source: 'Application Core', target: 'Communication Protocol Layer' },
            { source: 'Application Core', target: 'Audio Processing System' },
            { source: 'Application Core', target: 'User Interface System' },
            { source: 'Application Core', target: 'IoT Device Management' },
            { source: 'Communication Protocol Layer', target: 'WebSocket' },
            { source: 'Communication Protocol Layer', target: 'MQTT' },
            { source: 'Audio Processing System', target: 'Audio Codec' },
            { source: 'Audio Processing System', target: 'VAD Detection' },
            { source: 'Audio Processing System', target: 'Wake Word Detection' },
            { source: 'User Interface System', target: 'GUI' },
            { source: 'User Interface System', target: 'CLI' },
            { source: 'IoT Device Management', target: 'Device Abstraction' },
            { source: 'IoT Device Management', target: 'Smart Home' }
          ],
          categories: [
            { name: 'Core' },
            { name: 'Main Module' },
            { name: 'Submodule' }
          ],
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 3
            }
          },
          force: {
            repulsion: 300,
            edgeLength: 120
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