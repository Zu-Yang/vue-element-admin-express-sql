<template>
  <div class="table-example">
    <!-- 搜索组件 -->
    <filter-component @get-order-list="getOrderList" />
    <!-- table组件 -->
    <table-component :orders="orderList" @get-order-list="getOrderList" />
    <!-- 分页组件 -->
    <pagination-component :total="orderTotal" @get-order-list="getOrderList" />
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
    return {
      orderList: [],
      orderTotal: undefined
    }
  },
  created() { },
  mounted() { },
  methods: {
    getOrderList({ list, total }) {
      this.orderList = list
      this.orderTotal = total
    }
  }
}
</script>

<style lang="scss" scoped>
/* 外部引入 */
.table-example {
  padding: 20px;
}
</style>