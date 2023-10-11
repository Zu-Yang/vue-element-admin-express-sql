<template>
  <div class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
      :hide-on-single-page="false" :page-sizes="[10, 30, 50, 100]" :page-size="10"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getOrders } from "@/api/table-example.js";

export default {
  name: "PaginationComponent",
  props: { total: Number },
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    /* 修改每页数量 */
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      let filterForm = this.$store.getters.filterForm
      filterForm.limit = val
      getOrders(filterForm).then(res => {
        this.$emit('get-order-list', { list: res.data.data, total: res.data.total })
      })
    },
    /* 改变页数 */
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      let filterForm = this.$store.getters.filterForm
      filterForm.page = val
      getOrders(filterForm).then(res => {
        this.$emit('get-order-list', { list: res.data.data, total: res.data.total })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  text-align: center;
  padding-top: 20px;
}
</style>