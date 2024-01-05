import store from '@/store'

export default {
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
      return store.getters.sidebar.opened
    },
  },
  mounted() {
    this.viewportWidth = window.innerWidth
    this.offsetTop = this.$refs.boxContainer.offsetTop;
    this.offsetLeft = this.$refs.boxContainer.offsetLeft;
    this.$refs.boxContainer.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  updated() {
    this.$once('hook:mounted', () => {
      this.offsetTop = this.$refs.boxContainer.offsetTop;
      this.offsetLeft = this.$refs.boxContainer.offsetLeft;
      this.viewportWidth = window.innerWidth
    })
  },
  beforeDestroy() {
    this.$refs.boxContainer.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }
}