<template>
  <el-row>
    <el-col :span="12">
      <el-button type="primary" icon="plus" size="small" class="add" @click="dialogVisible = true">添加</el-button>
    </el-col>
    <!-- 表格 -->
    <el-table :data="tableData.list" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
      <el-table-column label="#" type="index" />
      <el-table-column prop="cat_name" label="分类名称" width="200" />
      <el-table-column label="是否有效">
        <template #default="scope">
          <el-icon :color="scope.row.cat_deleted ? 'red' : 'green'">
            <CircleCheck />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template #default="scope">
          <el-button type="primary" size="small" plain v-if="scope.row.cat_level == 0">一级</el-button>
          <el-button type="primary" size="small" plain v-if="scope.row.cat_level == 1">二级</el-button>
          <el-button type="primary" size="small" plain v-if="scope.row.cat_level == 2">三级</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" icon="delete" size="small" @click="del(scope.row.cat_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:current-page="listData.pagenum" v-model:page-size="listData.pagesize" :page-sizes="[2, 3, 5]"
      layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="添加功能" width="50%" :before-close="handleClose">
      <el-form>
        <el-form-item label="分类名称">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader v-model="addForm.cat_pid" :options="tableData.list" :props="props" @change="handleChange" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addGoods">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" title="编辑功能">
      <el-form>
        <el-form-item label="分类名称">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-button @click="edit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-row>
</template>
<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { queryCategoriesApi, addGoodsApi, delGoodsApi } from '../api'
import { ElMessage } from 'element-plus'

const tableData = reactive<any>({
  list: []
})
const listData = reactive<any>({
  type: 3,
  pagenum: 1,
  pagesize: 2
})
// 获取分页数据的方法
const getList = async () => {
  let res = await queryCategoriesApi(listData)
  console.log(res, 'listData');
  tableData.list = res.data.result;
  total.value = res.data.total
}
getList()

// 分页
const total = ref(0)

const handleSizeChange = (val: number) => {
  listData.pagesize = val
  getList()
}
const handleCurrentChange = (val: number) => {
  listData.pagenum = val
  getList()
}
// 对话框
import { ElMessageBox } from 'element-plus'

// 
const addForm = reactive({
  cat_name: '',
  cat_level: 0,
  cat_pid: 0

})
const value = ref([])

watch(value, (newVal) => {
  console.log(value.value);
  // value.value最后一位就是cat_pid
  addForm.cat_pid = value.value[value.value.length - 1]

  // 长度就是级别
  addForm.cat_level = value.value.length
})


const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// 


// 默认的是label和value
// 后端返回的是cat_name和cat_id
// 需要把后端返回的数据映射到前端的数据
const props = {
  expandTrigger: 'hover' as const,
  label: 'cat_name',
  value: 'cat_id'
}

const handleChange = (value: any) => {
  console.log(value)
}

// 添加请求功能
const addGoods = () => {
  addGoodsApi(addForm).then((res: any) => {
    console.log(res, 'addForm');
    ElMessage.success('添加成功')
    dialogVisible.value = false
    getList()
  })
}

// 删除
const del = (id: any) => {
  delGoodsApi(id).then((res: any) => {
    console.log(res);
    ElMessage.error('删除成功')
    getList()
  })
}

// 编辑
const editForm = reactive({
  cat_pid: 0,
  cat_name: '',
})
const drawer = ref(false)
const handleEdit = (row: any) => {
  // 抽屉打开
  drawer.value = true;
  // 实现回显
  editForm.cat_id=row.cat_id
  editForm.cat_name=row.cat_name
}
const edit = ()=>{
  // 提交编辑

}





</script>
<style lang='scss' scoped>
.add {
  margin: 20px 0;
}
</style>