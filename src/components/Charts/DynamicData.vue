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
      chart: null,
      timer: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    clearInterval(this.timer)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      var app = {};
      const categories = (function () {
        let now = new Date();
        let res = [];
        let len = 10;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(+now - 2000);
        }
        return res;
      })();
      const categories2 = (function () {
        let res = [];
        let len = 10;
        while (len--) {
          res.push(10 - len - 1);
        }
        return res;
      })();
      const data = (function () {
        let res = [];
        let len = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })();
      const data2 = (function () {
        let res = [];
        let len = 0;
        while (len < 10) {
          res.push(+(Math.random() * 10 + 5).toFixed(1));
          len++;
        }
        return res;
      })();
      this.chart = echarts.init(this.$refs[this.id]);
      var option = {
        backgroundColor: "#B0C4DE",
        grid: {
          left: "10%",
          top: "15%",
          right: "10%",
        },
        title: {
          left: "2%",
          top: "2%",
          text: 'Dynamic Data'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#999'
            }
          }
        },
        legend: {
          top: "5%"
        },
        /* 工具 */
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        /* 区域缩放 */
        // dataZoom: {
        //   show: true,
        //   start: 0,
        //   end: 100
        // },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: categories
          },
          {
            type: 'category',
            boundaryGap: true,
            data: categories2
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: 'Price',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            name: 'Order',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: 'Dynamic Bar',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data
          },
          {
            name: 'Dynamic Line',
            type: 'line',
            data: data2
          }
        ],
      };
      app.count = 11;
      this.timer = setInterval(() => {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        data.shift();
        data.push(Math.round(Math.random() * 1000));
        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));
        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(app.count++);
        this.chart.setOption({
          xAxis: [
            {
              data: categories
            },
            {
              data: categories2
            }
          ],
          series: [
            {
              data: data
            },
            {
              data: data2
            }
          ]
        });
      }, 2000);
      option && this.chart.setOption(option);
    }
  }
}
</script>
