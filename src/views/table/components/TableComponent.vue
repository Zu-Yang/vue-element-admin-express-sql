<template>
  <div class="table-container">
    <div class="table-wrap">
      <el-table v-loading="listLoading" :data="orderList" element-loading-text="Loading..." border fit
        highlight-current-row>
        <el-table-column align="center" label="Id" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderNo }}
          </template>
        </el-table-column>
        <el-table-column label="客户名称" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.customerName }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.orderDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近修改时间" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.orderDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orderStatus | orderStatusMap">{{ scope.row.orderStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" width="100" align="center">
          <template slot-scope="scope">
            ${{ scope.row.orderAmount }}
          </template>
        </el-table-column>
        <el-table-column label="是否加急" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.isUrgent }}
          </template>
        </el-table-column>
        <el-table-column label="配送快递" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.express }}
          </template>
        </el-table-column>
        <el-table-column label="配送地址">
          <template slot-scope="scope">
            {{ scope.row.deliveryAddress }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-close">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrders } from "@/api/table-example.js";
export default {
  name: "TableComponent",
  data() {
    return {
      listLoading: true,
      orderList: []
    }
  },
  filter: {
    orderStatusMap(orderStatus) {
      const statusMap = {
        '待付款': 'info',
        '待发货': 'warning',
        '已发货': 'danger',
        '已完成': 'success'
      }
      return statusMap[orderStatus]
    }
  },
  created() { this.getOrderList() },
  mounted() { },
  methods: {
    getOrderList() {
      getOrders().then((res) => {
        if (res.code === 20000) {
          this.orderList = res.data.data
          this.listLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>