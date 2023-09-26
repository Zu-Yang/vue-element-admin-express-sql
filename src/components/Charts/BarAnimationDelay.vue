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

      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 30; i++) {
        xAxisData.push('A' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
      var option = {
        backgroundColor: "#C5CAE9",
        grid: {
          left: "10%",
          top: "15%",
          right: "10%",
        },
        title: {
          left: "2%",
          top: "2%",
          text: 'Bar Animation Delay'
        },
        legend: {
          top: "5%",
          data: ['bar', 'bar2']
        },
        /* 工具 */
        // toolbox: {
        //   y: 'bottom',
        //   feature: {
        //     magicType: {
        //       type: ['stack']
        //     },
        //     dataView: {},
        //     saveAsImage: {
        //       pixelRatio: 2
        //     }
        //   }
        // },
        tooltip: {},
        xAxis: {
          data: xAxisData
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#4a657a'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#08263f'
            }
          },
          axisTick: {
            show: false
          }
        },
        /* 区域缩放 */
        dataZoom: [
          {
            type: 'inside',
            start: 0,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            end: 100
          },
          {
            type: 'slider',
          },
        ],
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10;
            },
            z: 2,
            showSymbol: false,
            animationEasing: 'linear',
            animationDuration: 1200,
            itemStyle: {
              opacity: 1,
              borderRadius: 5,
              // shadowBlur: 3,
              // shadowColor: '#111'
            },
            lineStyle: {
              color: 'transparent',
              borderRadius: 5,
            },
            areaStyle: {
              color: '#08263a',
              shadowBlur: 50,
              shadowColor: '#000'
            },
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#B39DDB' // 0% 处的颜色
              }, {
                offset: 1, color: '#512DA8' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
          },
          {
            name: 'bar2',
            type: 'bar',
            data: data2,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            z: 1,
            itemStyle: {
              opacity: 1,
              borderRadius: 5,
              // shadowBlur: 3,
              // shadowColor: '#111'
            },
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#F8BBD0' // 0% 处的颜色
              }, {
                offset: 1, color: '#AD1457' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
          }
        ],

        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };

      option && this.chart.setOption(option);

    }
  }
}
</script>
