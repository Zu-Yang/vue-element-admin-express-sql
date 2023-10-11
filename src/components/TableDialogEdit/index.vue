<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="operate" width="120">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="handleEdit(row)">edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Edit" :visible.sync="edit" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="Title" prop="title">
          <el-input type="textarea" v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
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
      listLoading: true,
      edit: false,
      list: null,
      form: {
        // author: "",
        // display_time: "",
        // id: "",
        // pageviews: null,
        // status: "",
        title: ""
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
          { min: 5, message: '长度在 > 3 个字符', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleEdit(row) {
      // Modifications to the new object will not affect the source object.
      this.form = Object.assign({}, row) // copy a obj 
      this.edit = true
    },
    confirmEdit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.edit = false
          const index = this.list.findIndex(item => item.id === this.form.id) // find index
          if (this.list[index].title === this.form.title) return // If the title has not been modified return
          update(this.form).then((res) => {
            if (res.code === 20000) {
              this.list.splice(index, 1, this.form) // Replace the value of the specified index position
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
          console.log('error confirmEdit!!');
          return false;
        }
      });
    }
  }
}
</script>
