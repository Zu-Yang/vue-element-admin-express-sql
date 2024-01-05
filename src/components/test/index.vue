<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }}
      <!-- 调用自身name -->
      <index-chird :list="item.children" v-if="item.children" />
      <input type="text" v-model="msg.name" v-on:input="changeHandler">
    </li>
  </ul>
</template>

<script>

export default {
  name: "index-chird", // 自身组件
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      msg: { name: '北京' },
    };
  },
  methods: {
    changeHandler(e) {
      console.log(e);
    }
  },
  mounted() {

  },


};
</script>

<style lang="scss" scoped></style>