<template>
  <div class="table-edit">
    <el-tabs type="border-card">
      <el-tab-pane label="tabel-inline-edit">
        <TabelInlineEdit />
      </el-tab-pane>
      <el-tab-pane label="table-dialog-edit">
        <TableDialogEdit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabelInlineEdit from "@/components/TabelInlineEdit/index.vue";
import TableDialogEdit from "@/components/TableDialogEdit/index.vue";

export default {
  name: 'TableEdit',
  components: { TabelInlineEdit, TableDialogEdit }
}
</script>

<style lang="scss" scoped>
.table-edit {
  padding: 20px;
}
</style>