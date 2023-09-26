<template>
  <div class="upload-excel">
    <uploadExcel :before-upload="beforeUpload" :on-success="onSuccess" :on-remove="onRemove" />
    <el-table v-show="excelData.tableData" :data="excelData.tableData" border style="width: 100%;">
      <el-table-column type="index" width="50" />
      <el-table-column v-for="header in excelData.tableHeader" :key="header" :prop="header" :label="header" />
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line vue/max-attributes-per-line
import uploadExcel from "@/components/Excel/uploadExcel.vue";

export default {
  name: 'UploadExcel',
  components: { uploadExcel },
  data() {
    return {
      excelData: {
        tableHeader: null,
        tableData: null
      }
    }
  },
  methods: {
    beforeUpload(file) {
      // 如判断文件的大小是否大于 1 兆？若大于 1 兆则停止
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      } else {
        this.$message({
          message: 'Please do not upload files larger than 1M in size.',
          type: 'warning'
        })
        return false
      }
    },
    onSuccess(table) {
      const { tableData, tableHeader } = table
      this.excelData.tableHeader = tableHeader
      this.excelData.tableData = tableData
    },
    onRemove() {
      this.excelData = {
        tableHeader: null,
        tableData: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel {
  padding: 20px;
}

::v-deep .el-upload-list__item {
  transition: none
}
</style>