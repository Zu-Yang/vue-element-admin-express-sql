<template>
  <div class="excel-to-json">
    <excelToJSON />
  </div>
</template>

<script>
import excelToJSON from "@/components/Excel/excelToJSON.vue";
export default {
  name: "ExcelToJSON",
  components: { excelToJSON }
}
</script>

<style lang="scss" scoped>
.excel-to-json {
  padding: 20px;
}

::v-deep .CodeMirror {
  min-height: calc(100vh - 350px);
}

::v-deep .CodeMirror-scroll {
  min-height: calc(100vh - 350px);
}

::v-deep .el-upload-list__item {
  transition: none
}
</style>