<template>
  <div>
    <uploadExcel :on-success="onSuccess" :on-remove="onRemove" />
    <VueCodemirror v-show="tableData" :data="tableData" theme="default" />
  </div>
</template>

<script>
import uploadExcel from "@/components/Excel/uploadExcel.vue";
import VueCodemirror from "@/components/VueCodemirror/index.vue";
export default {
  name: "ExcelToJSON",
  components: {
    uploadExcel,
    VueCodemirror
  },
  data() {
    return {
      tableData: null
    }
  },
  methods: {
    onSuccess(table) {
      const { tableData } = table
      this.tableData = tableData
    },
    onRemove() {
      this.tableData = null
    }
  }
}
</script>

<style></style>