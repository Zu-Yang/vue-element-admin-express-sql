<template>
  <div class="table-example">
    <!-- 搜索组件 -->
    <filter-component />
    <!-- table组件 -->
    <table-component />
    <!-- 分页组件 -->
    <pagination-component />
    <!-- 其他组件 -->
  </div>
</template>

<script>
import FilterComponent from "./components/FilterComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import PaginationComponent from "./components/PaginationComponent.vue";

export default {
  name: "TableExample",
  components: { FilterComponent, TableComponent, PaginationComponent, },
  data() {
    return {}
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style lang="scss" scoped>
/* 外部引入 */
</style>