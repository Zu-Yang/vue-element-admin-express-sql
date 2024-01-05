<template>
  <div class="drag-wrap">
    <!-- VUE2 官方文档 -->
    <div style="text-align: center;margin-bottom: 15px;">
      <el-link href="https://www.itxst.com/vue-draggable/tutorial.html" target="_blank">vue2.draggable中文文档</el-link>
    </div>


    <div class="col-1">
      <div class="drag">
        <h3>Draggable 1</h3>
        <div class="checkbox">
          <el-checkbox v-model="groupA.put">拖入</el-checkbox>
          <el-checkbox v-model="groupA.pull">拖出</el-checkbox>
        </div>
        <draggable class="list-group" :list="list1" animation="500" force-fallback="true" :group="groupA" @change="log">
          <div class="list-group-item" v-for="(element, index) in list1" :key="element.name">
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
      <div class="drag">
        <h3>Draggable 2</h3>
        <div class="checkbox">
          <el-checkbox v-model="groupB.put">拖入</el-checkbox>
          <el-checkbox v-model="groupB.pull">拖出</el-checkbox>
        </div>
        <draggable class="list-group" :list="list2" animation="500" force-fallback="true" :group="groupB" @change="log">
          <div class="list-group-item" v-for="(element, index) in list2" :key="element.name">
            {{ element.name }} {{ index }}
          </div>
        </draggable>
      </div>
    </div>

    <div class="col-2">
      <codemirror :data="list1" theme="" />

      <codemirror :data="list2" theme="" />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import codemirror from "@/components/VueCodemirror/index";

export default {
  name: "DragMultipleLists",
  components: {
    draggable,
    codemirror
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      groupA: {
        name: 'site', // 相同 name 的组之间可以相互拖拽
        pull: true, // 可以拖出
        put: true // 可以拖入
      },
      groupB: {
        name: 'site',
        pull: true,
        put: true
      },
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
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
.drag-wrap {
  width: 1000px;
  margin: 20px;
}

.col-1,
.col-2 {
  display: flex;
  justify-content: center;

  .drag,
  .codemirror-wrap {
    width: 500px;
  }
}

.col-1 {

  .drag {
    // border: 1px solid #e4e7ed;
    // padding: 0 10px;
  }

  .checkbox {
    margin-bottom: 20px;
  }
}

/*被拖拽对象的样式*/
.list-group {
  min-height: 100px; // //当有个数组为空时，需要设置 draggable 的高度才能拖入这个空数组
}

.list-group-item {
  cursor: move;
  list-style: none;
  background-color: #f4f4f5;
  margin: 10px;
  padding: 5px;
}

.list-group-item i {
  cursor: pointer;
}
</style>