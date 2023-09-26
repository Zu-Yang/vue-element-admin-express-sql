<template>
  <div>
    <el-upload class="upload" action="#" drag :limit="1" :show-file-list="true" :before-upload="upload"
      :http-request="customUpload" :on-exceed="exceed" :on-remove="remove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传 .xlsx/.xls/.csv 文件</div>
    </el-upload>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'uploadExcel',
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    onRemove: Function,
  },
  data() {
    return {
      excelData: {
        tableHeader: null,
        tableData: null
      }
    }
  },
  methods: {
    /* 文件列表移除文件时的钩子 */
    remove() {
      this.onRemove && this.onRemove()
    },
    /* 超出文件列表的最大数 */
    exceed(files, fileList) {
      this.$message({
        message: 'Exceeded the maximum number of uploads',
        type: 'error'
      })
      return false
    },
    /* 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传,反之上传成功。 */
    upload(file) {
      /* 上传前回调 */
      this.beforeUpload && this.beforeUpload(file)
      const tableFileRegex = /\.(csv|xlsx?)$/i;
      if (!tableFileRegex.test(file.name)) {
        this.$message({
          message: 'Please upload a table type file',
          type: 'error'
        })
        return false
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result; //data二进制数据
          const datajson = XLSX.read(data, { type: 'binary', });
          const firstSheet = datajson.SheetNames[0]; // 所有的Sheet表格名字
          const header = this.getHeaderRow(datajson.Sheets[firstSheet]) // 获取表头数据
          const result = XLSX.utils.sheet_to_json(datajson.Sheets[firstSheet]); //表格数据转化为我们需要的数据格式
          this.excelData.tableHeader = header
          this.excelData.tableData = result
          resolve()
        };
        reader.readAsBinaryString(file);
      });
    },
    /* 获取excel表头 */
    getHeaderRow(sheet) {
      if (sheet && sheet['!ref']) {
        const header = []
        const range = sheet['!ref'] && XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
          /* find the cell in the first row */
          let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          header.push(hdr)
        }
        return header
      }
    },
    /* 覆盖默认的上传行为，自定义上传的实现 */
    customUpload() {
      this.onSuccess && this.onSuccess(this.excelData)
    },
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  margin: 0px auto 0px;

  ::v-deep div {
    width: 100%;
  }
}
</style>