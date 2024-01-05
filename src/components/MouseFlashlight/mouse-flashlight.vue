<template>
  <div class="box-container" ref="boxContainer" @mousemove="mousemove">
    <div class="line" v-for="(line, lineIndex) in dataList">
      <div class="item" v-bubbleButton v-for="(item, itemIndex) in line" :style="{
        '--width': styles.width + 'px',
        '--height': styles.height + 'px',
        '--margin': `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`,
        '--mouseX': mouseX - (itemIndex * (styles.width + styles.marginLeft + styles.marginRight)) + 'px',
        '--mouseY': mouseY - (lineIndex * (styles.height + styles.marginTop + styles.marginBottom)) + 'px',
        '--beforeR': beforeR + 'px',
        '--afterR': afterR + 'px',
        '--borderSize': borderSize + 'px'
      }">
        <div class="border">
          <div class="back">
            <slot>
              <span class="default">第 {{ item.title }} 个</span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 匹配的数据格式 */
export default {
  name: 'MouseFlashlight',
  props: {
    /* 前背景半径 */
    beforeR: {
      type: Number,
      default: 100
    },
    /* 后边框半径 */
    afterR: {
      type: Number,
      default: 150
    },
    // /* 行数 */
    // rows: {
    //   type: Number,
    //   default: 1
    // },
    // /* 列数 */
    // cols: {
    //   type: Number,
    //   default: 1
    // },
    /* 内容盒子 border (边框大小) */
    borderSize: {
      type: Number,
      default: 1
    },
    /* 盒子的基本样式 */
    styles: {
      type: Object,
      default: function () {
        return {
          width: 150,
          height: 150,
          marginTop: 0,
          marginRight: 5,
          marginBottom: 5,
          marginLeft: 0,
        }
      }
    },
    dataList: {
      type: Array,
      default: function () {
        return [
          /* 第一行 */
          [
            {
              title: "1"
            },
            {
              title: "2"
            },
            {
              title: "3"
            }
          ],
          /* 第二行 */
          [
            {
              title: "4"
            },
            {
              title: "5"
            },
            {
              title: "6"
            }
          ],
          /* 第三行 */
          [
            {
              title: "7"
            },
            {
              title: "8"
            },
            {
              title: "9"
            }
          ],
        ]
      }
    }
  },
  data() {
    return {
      mouseX: 0, // 鼠标X轴位移
      mouseY: 0, // 鼠标Y轴位移
      offsetTop: 0, // 容器距离带有相对定位父元素的上偏移
      offsetLeft: 0, // 容器距离带有相对定位父元素的左偏移
      scrollTop: 0, // 容器垂直滚动条的滚动位置
      scrollLeft: 0, // 容器水平滚动条的滚动位置
      viewportWidth: 0, // 视口宽度
      showSidebarWidth: 210, // 打开菜单时的宽度
      hideSidebarWidth: 50, // 隐藏菜单时的宽度
      responseWidth: 992, // 响应宽度,参照 layout/mixin/ResizeHandler.js
    }
  },
  methods: {
    mousemove(event) {
      const { pageX, pageY } = event // 获取鼠标在此页面的x/y轴偏移量
      this.mouseY = pageY - this.offsetTop + this.scrollTop
      if (this.viewportWidth < this.responseWidth) {
        this.mouseX = pageX - this.offsetLeft + this.scrollLeft
      }
      else if (this.viewportWidth > this.responseWidth && this.sidebar) {
        this.mouseX = pageX - this.offsetLeft + this.scrollLeft - this.showSidebarWidth
      }
      else if (this.viewportWidth > this.responseWidth && !this.sidebar) {
        this.mouseX = pageX - this.offsetLeft + this.scrollLeft - this.hideSidebarWidth
      }
    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
      this.scrollLeft = event.target.scrollLeft;
    },
    handleResize(event) {
      this.offsetTop = this.$refs.boxContainer.offsetTop;
      this.offsetLeft = this.$refs.boxContainer.offsetLeft;
      this.viewportWidth = event.target.innerWidth
    }
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar.opened
    },
  },
  created() { },
  mounted() {
    this.viewportWidth = window.innerWidth
    this.offsetTop = this.$refs.boxContainer.offsetTop;
    this.offsetLeft = this.$refs.boxContainer.offsetLeft;
    this.$refs.boxContainer.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  updated() {
    /* 修复初始化时拿不到偏移量问题 */
    this.offsetTop > 0 || (this.offsetTop = this.$refs.boxContainer.offsetTop)
    this.offsetLeft > 0 || (this.offsetLeft = this.$refs.boxContainer.offsetLeft);
  },
  beforeDestroy() {
    this.$refs.boxContainer.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>

<style lang="scss">
.box-container {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  margin: 0 auto;
  background-color: #000;

  .line {
    /* 不能换行 */
    width: min-content;
    display: -webkit-box;

    .item {
      position: relative;
      overflow: hidden;
      width: var(--width);
      height: var(--height);
      margin: var(--margin);

      /* 前景色 */
      // &::before {
      //   z-index: 2;
      //   position: absolute;
      //   content: "";
      //   bottom: 0px;
      //   left: 0px;
      //   right: 0px;
      //   top: 0px;
      //   transition: background 1s ease;
      //   user-select: none;
      //   pointer-events: none;
      //   background: radial-gradient(circle var(--beforeR) at var(--mouseX) var(--mouseY),
      //       rgba(255, 255, 255, 0.3),
      //       rgba(255, 255, 255, 0.2),
      //       rgba(255, 255, 255, 0.1) 100%,
      //       rgba(255, 255, 255, 0.1) 100%);
      //   // 浏览器就可以提前知道哪些元素的属性将会改变，提前做好准备，从而避免卡顿等问题。
      //   will-change: background;
      // }

      /* 边框色 */
      .border {
        z-index: 1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        /* 内容盒子 border/margin 边框大小 */
        border: var(--borderSize) solid transparent;

        // &:hover {
        //   border: var(--borderSize) solid #fff;
        // }

        /* 背景样式适配 */
        .back {
          width: 100%;
          height: 100%;
          padding: 10px;
          word-wrap: break-word;
          box-sizing: border-box;
          overflow: hidden;
          background-color: #606266; // 盒子背景
          transition: background 1s ease;

          /* 通过盒子透明度显示伪类after的背景色 效果比直接显示前前景好 */
          &:hover {
            background-color: rgb(96 98 102 / 90%);
          }
        }
      }

      /* 背景色 */
      &::after {
        z-index: 0;
        position: absolute;
        content: '';
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        transition: background 1s ease;
        user-select: none;
        pointer-events: none;
        background: radial-gradient(circle var(--afterR) at var(--mouseX) var(--mouseY),
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, .8),
            rgba(255, 255, 255, .6),
            rgba(255, 255, 255, .4),
            rgba(255, 255, 255, .2));
        // 浏览器就可以提前知道哪些元素的属性将会改变，提前做好准备，从而避免卡顿等问题。
        will-change: background;
      }
    }
  }
}
</style>