/* sql语句 数据行操作 sqlMap.js——SQL 语句映射文件，供 API 调用  */

// 新增数据
// insert into 表名(列名,列名) values(值,值);
// insert into 表名(列名,列名) values(值,值),(值,值),(值,值);
const insert = function (tbName, values) {
  if (tbName && values)
    return `insert into ${tbName} values ${values}`
};

// 删除表数据
// delete from tb7 where id = 3;
// delete from tb7 where id > 4;
// delete from tb7 where id >= 4;
// delete from tb7 where id != 4;
// delete from tb7 where id in (1,5);
// delete from tb7 where id = 4 and name="xxx";
// delete from tb7 where id = 4 or name="xxx";
const del = function (tbName, where) {
  if (tbName && where)
    return `delete from ${tbName} where ${where}`
};

// 修改数据
// update 表名 set 列=值;
// update 表名 set 列=值,列=值;
// update 表名 set 列=值 where 条件;
const update = function (tbName, colVal, where) {
  if (tbName && colVal && where) {
    if (where) {
      return `update ${tbName} set ${colVal} where ${where}`
    }
  }
};

// 查询数据
// select * from 表名称;
// select 列名称,列名称 from 表名称;
// select 列名称,列名称 from 表名称 where id > 3;
// select 列名称,列名称 from 表名称 where name = "xx" and password = "xx";
const query = function (colName, tbName, where) {
  if (colName && tbName) {
    if (where) {
      return `select ${colName} from ${tbName} where ${where}`
    } else {
      return `select ${colName} from ${tbName}`
    }
  }
};

module.exports = { insert, del, update, query }


