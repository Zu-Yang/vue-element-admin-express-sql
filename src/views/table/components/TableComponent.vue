<template>
  <div class="table-container">
    <div class="table-wrap">
      <el-table v-loading="listLoading" :data="orderList" element-loading-text="Loading..." border fit
        highlight-current-row>
        <!-- <el-table-column label="Id" width="50" align="center">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column> -->
        <el-table-column label="订单编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderNo }}
          </template>
        </el-table-column>
        <el-table-column label="客户名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.customerName }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.orderDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后修改时间" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.orderLastDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orderStatus | orderStatusMap">{{ scope.row.orderStatus }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column label="支付金额" align="center">
          <template slot-scope="scope">
            <count-to :start-val='0' :end-val='scope.row.orderAmount' :duration='3000' :decimals='2'
              prefix='¥ '></count-to>
          </template>
        </el-table-column>
        <el-table-column label="是否加急" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isUrgent ? 'success' : 'info'">{{ scope.row.isUrgent ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="配送快递" align="center">
          <template slot-scope="scope">
            {{ scope.row.express | expressMap }}
          </template>
        </el-table-column>
        <el-table-column label="配送地址">
          <template slot-scope="scope">
            {{ scope.row.deliveryAddress }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-close" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-dialog title="Edit" :visible.sync="edit" :close-on-click-modal="true">
      <el-form :model="orderForm" :rules="orderRules" ref="ruleForm" @validate="validate">
        <el-form-item label="客户：" prop="customerName">
          <span>{{ orderForm.customerName }}</span>
        </el-form-item>
        <el-form-item label="是否加急：" prop="isUrgent" required>
          <el-switch v-model="orderForm.isUrgent" active-color="#13ce66" active-text="是" inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item label="配送快递：" prop="express" required>
          <el-select v-model="orderForm.express" placeholder="请选择寄件快递">
            <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送地址：" prop="deliveryAddress">
          <el-input type="textarea" v-model="orderForm.deliveryAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" :disabled="disabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders, updateOrders, deleteOrders } from "@/api/table-example.js";
import countTo from 'vue-count-to';

export default {
  name: "TableComponent",
  components: { countTo },
  props: {
    orders: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      disabled: false,
      edit: false,
      listLoading: true,
      expressOptions: [
        {
          value: 0,
          label: '京东快递'
        },
        {
          value: 1,
          label: '圆通快递'
        },
        {
          value: 2,
          label: '申通快递'
        }
      ],
      orderList: [],
      orderForm: {
        'orderNo': '', // 订单号
        'customerName': '', // 客户姓名
        'orderDate': '', // 订单日期
        'orderLastDate': '', // 最后修改日期
        'orderAmount': '', // 订单金额
        'orderStatus': '', // 订单状态
        'isUrgent': '', // 是否加急
        'deliveryAddress': '', // 配送地址
        'express': 0 // 配送快递 默认0:京东
      },
      orderRules: {
        deliveryAddress: [
          { required: true, message: '请输入配送地址', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    orders: {
      handler() {
        this.listLoading = true;
        let t = setTimeout(() => {
          this.listLoading = false;
          this.orderList = this.orders
          clearTimeout(t)
        }, 500) // 模拟请求时间
      }
    }
  },
  filters: {
    orderStatusMap(orderStatus) {
      const statusMap = {
        '待付款': 'info',
        '待发货': 'warning',
        '已发货': 'danger',
        '已完成': 'success'
      }
      return statusMap[orderStatus]
    },
    expressMap(express) {
      const statusMap = {
        '0': '京东快递',
        '1': '圆通快递',
        '2': '申通快递',
      }
      return statusMap[express]
    }
  },
  created() { this.getOrderList() },
  mounted() { },
  methods: {
    /* 获取订单列表 */
    getOrderList() {
      const filterForm = this.$store.getters.filterForm
      getOrders(filterForm).then((res) => {
        if (res.code === 20000) {
          this.$emit('get-order-list', { list: res.data.data, total: res.data.total }) // 初始化分页数据
          this.orderList = res.data.data
          this.listLoading = false
        }
      })
    },
    /* 编辑订单 */
    handleEdit(row) {
      this.orderForm = Object.assign({}, row)
      this.edit = true
    },
    /* 删除订单 */
    handleDelete(row) {
      this.listLoading = true
      deleteOrders(row).then(res => {
        if (res.code === 20000) {
          let t = setTimeout(() => {
            this.getOrderList();
            clearTimeout(t)
            this.$notify({
              title: 'Delete',
              message: 'delete Successfully',
              type: 'success',
              duration: 2000
            })
          }, 1000) // 模拟请求时间
        } else {
          this.$notify({
            title: 'Delete',
            message: 'delete Failed',
            type: 'error',
            duration: 2000
          })
          console.log('error!!');
        }
      })
    },
    /* 修改完毕 */
    confirmEdit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.listLoading = true
          updateOrders(this.orderForm).then(res => {
            if (res.code === 20000) {
              this.edit = false
              let t = setTimeout(() => {
                this.getOrderList();
                clearTimeout(t)
                this.$notify({
                  title: 'Edit',
                  message: 'edit Successfully',
                  type: 'success',
                  duration: 2000
                })
              }, 1000) // 模拟请求时间
            }
          })
        } else {
          this.listLoading = false
          this.$notify({
            title: 'Edit',
            message: 'edit Failed',
            type: 'error',
            duration: 2000
          })
          console.log('error edit!!');
          return false;
        }
      });
    },
    /* 任一表单项被校验后触发 */
    validate(prop) {
      console.log(prop);
    }
  }
}
</script>

<style lang="scss" scoped></style>