 <template>
  <div class="list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <el-table :data="postsList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="create_date" label="创建日期" width="250">
        <template slot-scope="scope">{{scope.row.create_date | timeFormat}}</template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">{{scope.row.type|typeTransfer}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" @click="$router.push(`/editPost?id=${scope.row.id}`)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
             </el-tooltip>
             <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
             </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="sizes"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getPostList } from '@/api/post.js'
export default {
  data () {
    return {
      total: 0,
      pageIndex: 1,
      sizes: [2, 4, 6, 8],
      pageSize: 2,
      postsList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getPostList({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex

      }).then(res => {
        // console.log(res)

        if (res.status === 200) {
          this.postsList = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    }
  },
  filters: {
    timeFormat: (time, spe) => {
      spe = spe || '-'
      time = new Date(time)
      // 实现时间格式化
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = time.getDate()
      // 返回格式化的结果
      return year + spe + month + spe + day
    },
    typeTransfer (type) {
      if (type === 1) {
        return '文章'
      } else {
        return '视频'
      }
    }
  }
}
</script>

 <style>
</style>
