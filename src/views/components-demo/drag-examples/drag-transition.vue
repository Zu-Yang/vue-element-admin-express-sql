<template>
  <div class="drag-wrap">
    <!-- VUE2 官方文档 -->
    <div style="text-align: center;margin-bottom: 15px;">
      <el-link href="https://www.itxst.com/vue-draggable/tutorial.html" target="_blank">vue2.draggable中文文档</el-link>
    </div>

    <div class="col-1">
      <button class="btn btn-secondary button" @click="sort">
        To original order
      </button>
    </div>

    <div class="col-2">
      <h3>Transition</h3>
      <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" @start="drag = true" @end="drag = false"
        :move="onMove">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li class="list-group-item" v-for="element in list" :key="element.order">
            <!-- <i :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              " @click="element.fixed = !element.fixed" aria-hidden="true"></i> -->
            {{ element.name }}
          </li>
        </transition-group>
      </draggable>
    </div>

    <div class="col-3">
      <codemirror :data="list" theme="" />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import codemirror from "@/components/VueCodemirror/index";

const message = [
  "vue.draggable(不允许停靠)",
  "draggable(不许拖拽不许停靠)",
  "component",
  "for(不允许拖拽)",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  name: "DragTransition",
  components: {
    draggable,
    codemirror
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false
    };
  },
  methods: {
    /* 重置 */
    sort() {
      // a.order - b.order 表示按照元素的 order 属性进行比较。如果 a.order 小于 b.order，则返回一个负数，表示 a 应该排在 b 前面；如果 a.order 大于 b.order，则返回一个正数，表示 a 应该排在 b 后面；如果 a.order 等于 b.order，则返回 0，表示 a 和 b 的顺序不变。
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    /* 自定义回调方法 */
    onMove(e, originalEvent) {
      // console.log(e);
      /* e对象结构 */
      // draggedContext: 被拖拽的元素
      // index: 被拖拽的元素的序号
      // element: 被拖拽的元素对应的对象
      // futureIndex: 预期位置、目标位置
      // relatedContext: 将停靠的对象
      // index: 目标停靠对象的序号
      // element: 目标的元素对应的对象
      // list: 目标数组
      // component: 将停靠的vue组件对象
      //不允许停靠
      if (e.relatedContext.element.order == 1) return false;
      //不许拖拽不许停靠
      if (e.relatedContext.element.order == 2) return false;
      if (e.draggedContext.element.order == 2) return false;
      //不允许拖拽
      if (e.draggedContext.element.order == 4) return false;
      //false表示阻止拖拽
      return true;
    },
  },
  computed: {
    // 属性名称 说明
    // group :group = "name"，相同的组之间可以相互拖拽或者 { name: "...", pull: [true, false, 'clone', array, function], put: [true, false, array, function] }
    // sort :sort = "true", 是否开启内部排序, 如果设置为false, 它所在组无法排序，在其他组可以拖动排序
    // delay :delay = "0", 鼠标按下后多久可以拖拽
    // touchStartThreshold	鼠标移动多少px才能拖动元素
    // disabled :disabled = "true", 是否启用拖拽组件
    // animation	拖动时的动画效果，还是很酷的, 数字类型。如设置animation = 1000表示1秒过渡动画效果
    // handle :handle = ".mover" 只有当鼠标移动到css为mover类的元素上才能拖动
    // filter :filter = ".unmover" 设置了unmover样式的元素不允许拖动
    // draggable :draggable = ".item" 那些元素是可以被拖动的
    // ghostClass :ghostClass = "ghostClass" 设置拖动元素的占位符类名, 你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
    // chosenClass :ghostClass = "hostClass" 被选中目标的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
    // dragClass :dragClass = "dragClass"拖动元素的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
    // dataIdAttr	dataIdAttr: 'data-id'
    // forceFallback	默认false，忽略HTML5的拖拽行为，因为h5里有个属性也是可以拖动，你要自定义ghostClass chosenClass dragClass样式时，建议forceFallback设置为true
    // fallbackClass	默认false，克隆的DOM元素的类名
    // allbackOnBody	默认false，克隆的元素添加到文档的body中
    // fallbackTolerance	拖拽之前应该移动的px
    // scroll	默认true, 有滚动区域是否允许拖拽
    // scrollFn	滚动回调函数
    // scrollSensitivity	距离滚动区域多远时，滚动滚动条
    // scrollSpeed	滚动速度
    dragOptions() {
      return {
        draggable: '.list-group-item', // 设置这些元素(类名)是可以被拖动
        animation: 200, // 拖动时的动画效果
        group: "description", // 相同的组之间可以相互拖拽
        disabled: false, // 是否启用拖拽组件
        ghostClass: "ghost", // 设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
        chosenClass: "chosen", // 被选中目标的样式,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
        dragClass: "drag", // 被选中目标的样式,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
      };
    }
  }
};
</script>

<style lang="scss" scoped>
/* 自定义编辑器样式 S */
::v-deep .CodeMirror-gutters {
  display: none;
}

::v-deep .CodeMirror-gutter-elt {
  display: none;
}

::v-deep .CodeMirror {
  height: auto;
}

::v-deep .CodeMirror-scroll {
  height: auto;
}


/* 自定义编辑器样式 E */
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.drag-wrap {
  padding: 20px;
}

/*占位元素样式*/
.ghost {
  opacity: 0.5;
}

/*选中元素样式*/
.chosen {
  opacity: 0.5;
}

/*拖拽中元素样式*/
.drag {
  opacity: 0.5;
}

.list-group {
  padding: 0;
  min-height: 100px;
}

/*被拖拽对象的样式*/
.list-group-item {
  cursor: move;
  list-style: none;
  background-color: #f4f4f5;
  margin-bottom: 10px;
  padding: 5px 10px;
}

.list-group-item i {
  cursor: pointer;
}
</style>