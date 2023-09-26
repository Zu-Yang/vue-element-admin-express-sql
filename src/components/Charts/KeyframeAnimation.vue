<template>
  <div :ref="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    text: {
      type: String,
      default: "KeyframeAnimation"
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs[this.id]);
      var option = {
        // backgroundColor: "#B3E5FC",
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: this.text,
                fontSize: 30,
                // fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#0277BD', //描边颜色
                lineWidth: 1 //描边宽度
              },
              keyframeAnimation: {
                duration: 3000,
                loop: false, //是否循环
                keyframes: [
                  // {
                  //   percent: 0.7,
                  //   style: {
                  //     fill: '#fff',
                  //     lineDashOffset: 200,
                  //     lineDash: [200, 0]
                  //   }
                  // },
                  // {
                  //   // Stop for a while.
                  //   percent: 0.8,
                  //   style: {
                  //     fill: '#fff'
                  //   }
                  // },
                  {
                    percent: 1,
                    style: {
                      fill: '#0277BD', //结束的颜色
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  }
                ]
              }
            }
          ]
        }
      };
      option && this.chart.setOption(option);
    }
  }
}
</script>
