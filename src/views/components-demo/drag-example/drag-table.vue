<template>
  <div class="drag-wrap">
    <!-- 官方文档 -->
    <div style="text-align: center;margin-bottom: 15px;">
      <el-link href="https://www.itxst.com/sortablejs/neuinffi.html" target="_blank">sortable.js中文文档：</el-link>
      <el-tag size="mini" type="info">适用于嵌套的组件</el-tag>
    </div>

    <div style="margin-bottom: 15px;">
      <el-tag size="mini">thead默认顺序:</el-tag> {{ theadOld }}
    </div>
    <div style="margin-bottom: 15px;">
      <el-tag size="mini">thead拖拽后顺序:</el-tag> {{ theadNew }}
    </div>

    <!--请注意， row-key="id"是获得正确行键顺序所必需的. -->
    <el-table ref="dragTable" :data="list" row-key="id" style="width: 100%">
      <el-table-column v-if="isResetRender" class-name="move-head" v-for="(head, index) in thead" :key="index"
        :prop="head" :label="head">
      </el-table-column>
      <el-table-column class-name="no-move-head" align="center" label="Drag(不许停靠不许拖拽)">
        <template>
          <svg-icon class="move" icon-class="drag" />
        </template>
      </el-table-column>
    </el-table>

    <div class="sort">
      <el-tag size="mini">tbody默认顺序:</el-tag> {{ tbodyOld }}
    </div>
    <div class="sort">
      <el-tag size="mini">tbody拖拽后顺序:</el-tag> {{ tbodyNew }}
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: "DragTable",
  components: {},
  data() {
    return {
      isResetRender: true, // ***解决 sortablejs影响element ui表格列的拖动问题, 使用v-if 或者 改变key 重渲染，主要是有分组表头情况下，表头渲染会有问题
      thead: ['id', 'date', 'name', 'address'],
      list: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 号'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 号'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 号'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 号'
      }],
      tbodyOld: [],
      tbodyNew: [],
      theadOld: [],
      theadNew: []
    };
  },
  created() {
    this.tbodyOld = this.list.map(v => v.id)
    this.tbodyNew = this.tbodyOld.slice()

    this.theadOld = this.thead.map(head => head)
    this.theadNew = this.theadOld

    this.$nextTick(() => {
      this.setSortableTbody()
      this.setSortableThead()
    })
  },
  watch: {
    isResetRender: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            // 在el-table标签上让其更新渲染可为 :key="isResetRender" 或者 v-if="isResetRender",tbody也需要重新渲染,否则拖动列之后行拖动会失效
            // 在el-table-column标签上为 v-if="isResetRender",tbody不需要重新渲染,可自行选择
            // this.setSortableTbody()
            this.setSortableThead()
          })
        }
      }
    }
  },
  mounted() { },
  methods: {
    setSortableTbody() {
      //获取对象
      const el_tbody = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      //设置配置
      var ops = {
        //一个网页存在多个分组时设置 or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
        //设置方式一，直接设置组名
        // group: 'name',
        //设置方式，object，也可以通过自定义函数function实现复杂的逻辑
        group: {
          name: 'tbody',//组名为itxst
          // pull: true, //true或false或 'clone'或array或function,是否允许拖从当前组
          // put: true //true或false或array或function,是否允许拖入当前组
        },
        //是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        sort: true,
        // 按下鼠标后多久可以拖拽 1000表示1秒
        delay: 0,
        //如果为false按下鼠标不动才计算延时，移动则无效
        delayOnTouchOnly: false,
        //当按下鼠标移动了n个像素时会取消延迟delay事件，即可超过了这个范围无法拖动元素了
        touchStartThreshold: 0,
        //启用禁用拖拽
        disabled: false,
        //Store
        store: null,
        //动画效果
        animation: 200,
        // Easing 动画 默认null. See https://easings.net/ for examples.
        easing: "cubic-bezier(1, 0, 0, 1)",
        //句柄，点击指定class样式的对象才能拖拽元素
        handle: "",
        //忽略class为ignore-elements的元素不能拖动,或者通过函数来实现过滤不允许拖动的对象
        filter: ".ignore-elements",
        //触发filter时调用`event.preventDefault()`
        preventOnFilter: true,
        //指定那些元素可以被拖拽
        draggable: ".el-table__row",
        //指定获取拖动后排序的data属性
        dataIdAttr: 'data-id',
        //停靠位置的自定义样式
        ghostClass: "ghost",
        //选中元素的自定义样式
        chosenClass: "sortable-chosen",
        //拖拽时的自定义样式
        dragClass: "sortable-drag",
        //交互区大小，A元素到B元素内多深的距离触发替换位置
        swapThreshold: 1,
        //如果设置为true，将始终使用反向交换区域
        invertSwap: false,
        // 反向交换区域的阈值（默认情况下将设置为swapThreshold值）
        invertedSwapThreshold: 1,
        //拖拽方向(默认会自动判断方向)
        direction: 'horizontal',
        //忽略HTML5原生拖拽行为
        forceFallback: false,
        //拖拽时被克隆元素的样式名称
        fallbackClass: "sortable-fallback",
        //将克隆的DOM元素追加到文档的正文中
        fallbackOnBody: false,
        // 以像素为单位指定鼠标在被视为拖动之前应移动的距离
        fallbackTolerance: 0,
        // 拖拽气泡
        dragoverBubble: false,
        // 在克隆元素不显示时将其删除，而不仅仅是隐藏它
        removeCloneOnHide: true,
        // px, 距离鼠标必须从空开始排序才能将拖动元素插入其中
        emptyInsertThreshold: 5,
        setData: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) => {
          dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
        },
        //点击选中元素事件
        onChoose: (/**Event*/evt) => {
          evt.oldIndex;  // element index within parent
        },
        //取消选中事件
        onUnchoose: (/**Event*/evt) => {
          // same properties as onEnd
        },
        //开始拖拽事件
        onStart: (/**Event*/evt) => {
          evt.oldIndex;  // element index within parent
        },
        //结束拖拽事件
        onEnd: (/**Event*/evt) => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          const tempIndex = this.tbodyNew.splice(evt.oldIndex, 1)[0]
          this.tbodyNew.splice(evt.newIndex, 0, tempIndex)
        },
        //被拖拽的元素加入到其他列表时的事件
        onAdd: (/**Event*/evt) => {
          // same properties as onEnd
        },
        //排序发生改变时的事件
        onUpdate: (/**Event*/evt) => {
          // same properties as onEnd
        },
        // 由任何更改调用（添加/更新/删除）
        onSort: (/**Event*/evt) => {
          // same properties as onEnd
        },
        //元素从列表中删除到另一个列表中
        onRemove: (/**Event*/evt) => {
          // same properties as onEnd
        },
        // 尝试拖动筛选的元素
        onFilter: (/**Event*/evt) => {
          var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
        },
        // 在列表中或列表之间移动项目时发生的事件
        onMove: (/**Event*/evt, /**Event*/originalEvent) => {
          /*
              evt.dragged; // 被拖拽的对象
              evt.draggedRect; // 被拖拽的对象所在区域 {left, top, right, bottom}
              evt.related; // 被替换的对象
              evt.relatedRect; // DOMRect
              evt.willInsertAfter; // 是在被替换对象的前面还是后面
              originalEvent.clientY; // 鼠标的位置
            */
          // return false; — for cancel
          // return -1; — insert before target
          // return 1; — insert after target
        },
        // 在创建元素的克隆时调用
        onClone: (/**Event*/evt) => {
          var origEl = evt.item; // 源元素
          var cloneEl = evt.clone; // 克隆元素
        },
        // 当拖动元素更改位置时调用
        onChange: (/**Event*/evt) => {
          //使用此事件的最可能原因是获取拖动元素的当前索引
          //与onEnd相同的属性
          evt.newIndex
        }
      };
      //初始化
      Sortable.create(el_tbody, ops);
    },
    setSortableThead() {
      //获取对象
      const el_thead = this.$refs.dragTable.$el.querySelectorAll('.el-table__header-wrapper > table > thead > tr')[0]
      //设置配置
      var ops = {
        //一个网页存在多个分组时设置
        //or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
        //设置方式一，直接设置组名
        // group: 'name',
        //设置方式，object，也可以通过自定义函数function实现复杂的逻辑
        group: {
          name: 'thead',//组名为itxst
          // pull: true, //true或false或 'clone'或array或function,是否允许拖从当前组
          // put: true //true或false或array或function,是否允许拖入当前组
        },
        //是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        sort: true,
        // 按下鼠标后多久可以拖拽 1000表示1秒
        delay: 0,
        //如果为false按下鼠标不动才计算延时，移动则无效
        delayOnTouchOnly: false,
        //当按下鼠标移动了n个像素时会取消延迟delay事件，即可超过了这个范围无法拖动元素了
        //px, how many pixels the point should move before cancelling a delayed drag event
        touchStartThreshold: 0,
        //启用禁用拖拽
        disabled: false,
        //Store
        store: null,
        //动画效果
        animation: 0,
        // Easing 动画 默认null. See https://easings.net/ for examples.
        easing: "cubic-bezier(1, 0, 0, 1)",
        //句柄，点击指定class样式的对象才能拖拽元素
        handle: "",
        //忽略class为ignore-elements的元素不能拖动,或者通过函数来实现过滤不允许拖动的对象
        //不会导致拖动的选择器（字符串或函数）
        filter: ".no-move-head",
        //触发filter时调用`event.preventDefault()`
        // Call `event.preventDefault()` when triggered `filter`
        preventOnFilter: true,
        //指定那些元素可以被拖拽
        draggable: ".move-head",
        //指定获取拖动后排序的data属性
        dataIdAttr: 'data-id',
        //停靠位置的自定义样式
        // Class name for the drop placeholder
        ghostClass: "ghost",
        //选中元素的自定义样式
        // Class name for the chosen item
        chosenClass: "sortable-chosen",
        //拖拽时的自定义样式
        // Class name for the dragging item
        dragClass: "sortable-drag",
        //交互区大小，A元素到B元素内多深的距离触发替换位置
        //Threshold of the swap zone
        swapThreshold: 1,
        // Will always use inverted swap zone if set to true
        invertSwap: false,
        // Threshold of the inverted swap zone (will be set to swapThreshold value by default)
        invertedSwapThreshold: 1,
        //拖拽方向(默认会自动判断方向)
        direction: 'horizontal',
        //忽略HTML5原生拖拽行为
        forceFallback: false,
        //拖拽时被克隆元素的样式名称
        // Class name for the cloned DOM Element when using forceFallback
        fallbackClass: "sortable-fallback",
        // Appends the cloned DOM Element into the Document's Body
        fallbackOnBody: false,
        // Specify in pixels how far the mouse should move before it's considered as a drag.
        fallbackTolerance: 0,
        dragoverBubble: false,
        // Remove the clone element when it is not showing, rather than just hiding it
        removeCloneOnHide: true,
        // px, distance mouse must be from empty sortable to insert drag element into it
        emptyInsertThreshold: 5,
        setData: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) => {
          dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
        },
        //点击选中元素事件
        // Element is chosen
        onChoose: (/**Event*/evt) => {
          evt.oldIndex;  // element index within parent
        },
        //取消选中事件
        // Element is unchosen
        onUnchoose: (/**Event*/evt) => {
          // same properties as onEnd
        },
        //开始拖拽事件
        // Element dragging started
        onStart: (/**Event*/evt) => {
          evt.oldIndex;  // element index within parent
        },
        //结束拖拽事件
        // Element dragging ended
        onEnd: (/**Event*/evt) => {
          // console.log(evt);
          /* 表格数据更新 S */

          //这一句，是判断相同时不移动，也是解决，列宽拖动的问题
          if (evt.newIndex === evt.oldIndex) return
          const targetColumn = this.thead.splice(evt.oldIndex, 1)[0] // 获取移动目标列
          this.thead.splice(evt.newIndex, 0, targetColumn) // 在newIndex索引下添加targetColumn
          this.theadNew = this.thead // thead拖拽后顺序

          this.isResetRender = false;
          this.$nextTick(() => {
            this.isResetRender = true;
          })
          /* 表格数据更新 E */

          // var itemEl = evt.item;  // dragged HTMLElement
          // evt.to;    // target list
          // evt.from;  // previous list
          // evt.oldIndex;  // element's old index within old parent
          // evt.newIndex;  // element's new index within new parent
          // evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
          // evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
          // evt.clone // the clone element
          // evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        },
        // 被拖拽的元素加入到其他列表时的事件
        // Element is dropped into the list from another list
        onAdd: (/**Event*/evt) => {
          // same properties as onEnd
          // console.log("被拖拽的元素加入到其他列表时的事件");
        },
        // 排序发生改变时的事件
        // Changed sorting within list
        onUpdate: (/**Event*/evt) => {
          // console.log("排序发生改变时的事件");
          // same properties as onEnd
          // let temp_thead = this.thead.map(item => item)
          // const targetColumn = temp_thead.splice(evt.oldIndex, 1)[0] // 获取移动目标列
          // temp_thead.splice(evt.newIndex, 0, targetColumn) // 在newIndex索引下添加targetColumn
          // this.thead = temp_thead
          // this.theadNew = temp_thead // thead拖拽后顺序
        },
        // Called by any change to the list (add / update / remove)
        onSort: (/**Event*/evt) => {
          // same properties as onEnd
        },
        // Element is removed from the list into another list
        onRemove: (/**Event*/evt) => {
          // same properties as onEnd
        },
        // Attempt to drag a filtered element
        onFilter: (/**Event*/evt) => {
          var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
        },
        // 在列表中或列表之间移动项目时发生的事件
        onMove: (/**Event*/evt, /**Event*/originalEvent) => {
          // console.log(evt);
          // console.log("在列表中或列表之间移动项目时发生的事件");
          /*
              evt.dragged; // 被拖拽的对象
              evt.draggedRect; // 被拖拽的对象所在区域 {left, top, right, bottom}
              evt.related; // 被替换的对象
              evt.relatedRect; // DOMRect
              evt.willInsertAfter; // 是在被替换对象的前面还是后面
              originalEvent.clientY; // 鼠标的位置
            */
          // return false; //for cancel //false表示阻止拖拽
          return true; // true表示允许拖拽
          // return -1; // insert before target 在目标之前插入
          // return 1; // insert after target 在目标之后插入
        },
        // Called when creating a clone of element
        onClone: (/**Event*/evt) => {
          var origEl = evt.item;
          var cloneEl = evt.clone;
        },
        // Called when dragging element changes position
        onChange: (/**Event*/evt) => {
          // console.log("当拖动元素更改位置时调用");
          // let temp_thead = this.thead.map(item => item)
          // const targetColumn = temp_thead.splice(evt.oldIndex, 1)[0] // 获取移动目标列
          // temp_thead.splice(evt.newIndex, 0, targetColumn) // 在newIndex索引下添加targetColumn
          // this.thead = temp_thead
          // this.theadNew = temp_thead // thead拖拽后顺序
          // same properties as onEnd
        }
      };
      //初始化
      Sortable.create(el_thead, ops);
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-wrap {
  padding: 20px;
}

::v-deep .sortable-ghost {
  opacity: .7;
  background-color: #42b983;
}

::v-deep .flip-list-move {
  transition: transform 0.5s;
}

::v-deep .no-move {
  transition: transform 0s;
}

::v-deep .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.move {
  width: 20px;
  height: 20px;
  cursor: move;
}

.sort {
  margin-top: 15px;
}
</style>