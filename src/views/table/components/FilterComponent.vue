<template>
  <div class="filter-container">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label-width="100px" label="订单号：">
        <el-input v-model.trim="filterForm.orderNo" v-only-number clearable placeholder="请输入订单号(纯数字)"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="关键字：">
        <el-input v-model.trim="filterForm.keywords" clearable placeholder="请输入关键字(地址/名称)"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="配送快递：">
        <el-select style="width: 300px;" v-model="filterForm.express" multiple allow-create clearable
          placeholder="请选择配送快递">
          <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px" label="订单日期：">
        <el-date-picker v-model="filterForm.timestamp" type="daterange" align="right" unlink-panels range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="100px" label="是否加急：">
        <el-select v-model="filterForm.isUrgent" multiple allow-create clearable placeholder="请选择配送快递">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filterList">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrders } from "@/api/table-example.js";
export default {
  name: "FilterComponent",
  data() {
    return {
      filterForm: {
        page: 1,
        limit: 10,
        orderNo: undefined, // 单号
        timestamp: undefined, // 下单时间
        isUrgent: undefined, // 是否加急
        express: undefined, // 配送快递
        keywords: undefined // 关键字
      },
      /* 快捷选项 */
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  directives: {
    /* 只能输入数字 */
    'only-number': {
      bind(el) {
        el.addEventListener('input', function (e) {
          const input = e.target;
          const value = input.value;
          input.value = value.replace(/\D/g, '');
        });
      }
    }
  },
  computed: {
    /* 支持的快递配送方式 */
    expressOptions() {
      return [
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
      ]
    }
  },
  created() { },
  mounted() { },
  methods: {
    filterList() {
      getOrders(this.filterForm).then(res => {
        this.$store.commit('table/CHANGE_FILTERFORM', this.filterForm) // 储存筛选数据,供筛选之后的分页使用
        this.$emit("get-order-list", { list: res.data.data, total: res.data.total })
      })
    },
    reset() {
      this.filterForm = {
        page: 1,
        limit: 10,
        orderNo: undefined,
        timestamp: undefined,
        isUrgent: undefined,
        express: undefined,
        keywords: undefined
      }
      this.$store.commit("table/CHANGE_FILTERFORM", this.filterForm)
      this.filterList()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding: 20px 20px 0 20px;
}
</style>