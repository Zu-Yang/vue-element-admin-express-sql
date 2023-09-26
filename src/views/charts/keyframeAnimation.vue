<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/KeyframeAnimation'

export default {
  name: 'KeyframeAnimation',
  components: { Chart }
}
</script>

<style lang="scss" scoped>
@import"@/styles/variables.scss";

.chart-container {
  position: relative;
  width: 100%;
  height: $appMainMinHeight;
}
</style>
