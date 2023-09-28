<template>
  <div class="export-excel">
    <div class="export-option">
      <el-input style="width: 50%; min-width: 550px;" size="small" type="text" placeholder="请输入表格名称（默认list）"
        v-model="bookName">
        <template slot="prepend">
          <strong>Filename：</strong>
        </template>
        <i class="el-icon-edit el-input__icon" slot="prefix"></i>
        <template slot="append">
          <strong>Book Type：</strong>
          <el-select style="width: 100px;" v-model="bookType" placeholder="请选择文件类型（默认.xlsx）">
            <el-option v-for="item in bookTypeOption" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </template>
      </el-input>
      <el-button style="margin-left: 20px;border: none;" size="mini" type="success" icon="el-icon-download"
        :loading="exportLoading" @click="exportExcel">
        导出 Excel
      </el-button>
    </div>
    <div class="table-wrap">
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
        <el-table-column align="center" label="Id" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="作者" width="200" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="115" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | status">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布时间" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { getList } from "@/api/table";

export default {
  name: 'exportExcel',
  data() {
    return {
      listLoading: true,
      exportLoading: false,
      list: [],
      bookName: "",
      bookType: "xlsx",
      bookTypeOption: ["xlsx", "xls", "csv", "txt"],
    }
  },
  filters: {
    status(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      }
      return statusMap[status]
    }
  },
  created() {
    getList().then(res => {
      this.listLoading = true
      if (res.code === 20000) {
        this.list = res.data.items
        this.listLoading = false
      }
    })
  },
  methods: {
    /* 导出Excel */
    exportExcel() {
      this.exportLoading = true
      const workbook = XLSX.utils.book_new(); //创建一个工作簿
      const worksheet = XLSX.utils.json_to_sheet(this.list);//创建一个工作表
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); //然后将工作表添加到工作簿中
      XLSX.writeFile(workbook, this.bookName ? (this.bookName + '.' + this.bookType) : ('list.' + this.bookType), { bookType: this.bookType, type: 'binary', bookSST: false });// XLSX.writeFile()方法将工作簿写入到".xlsx"文件中
      const timer = setTimeout(() => {
        this.exportLoading = false;
        clearTimeout(timer);
      }, 500);
    },
  }
}
</script>

<style lang="scss" scoped>
.export-excel {
  padding: 20px;
}

.export-option {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>