<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="{$index}">
          {{ $index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="{row}">
          <span v-show="!row.edit">
            {{ row.title }}
          </span>
          <div class="title-edit" v-show="row.edit">
            <el-input type="textarea" v-model="row.title" />
            <el-button size="mini" type="primary" icon="el-icon-close" @click="cancelEdit(row)">cancel</el-button>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Author" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="{row}">
          {{ row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="{row}">
          <i class="el-icon-time" />
          <span>{{ row.display_time }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="operate" width="120">
        <template slot-scope="{row}">
          <el-button v-show="!row.edit" size="mini" type="primary" plain icon="el-icon-edit"
            @click="row.edit = true">edit</el-button>
          <el-button v-show="row.edit" size="mini" type="success" plain icon="el-icon-check"
            @click="confirmEdit(row)">success</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, update } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /* 确认修改 */
    confirmEdit(row) {
      row.edit = false
      if (row.originalTitle === row.title) return
      row.originalTitle = row.title
      update(row).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    /* 取消修改 */
    cancelEdit(row) {
      row.edit = false
      row.title = row.originalTitle
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.map(item => {
          this.$set(item, 'edit', false) //this.$set()添加响应式数据更新,修改该属性会触发响应式更新
          item['originalTitle'] = item.title; // 不需要响应式更新
          return item
        })
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title-edit {
  display: flex;
  align-items: center;

  ::v-deep .el-button {
    margin-left: 20px;
  }
}

::v-deep .el-button {
  margin: 0;
}
</style>