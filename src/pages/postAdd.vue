<template>
  <div class="add">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top:30px">
      <!-- 表单 -->
      <el-form v-model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" v-if="addForm.type===1">
          <VueEditor :config="config" ref="wusuowei" />
        </el-form-item>
        <el-form-item label="内容" v-if="addForm.type===2">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :on-success="videoSuccess"
            :headers="getToken()"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- 栏目 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCate" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面:">
          <el-upload
            action="http://127.0.0.1:3000/upload"
            list-type="picture-card"
            :headers="getToken()"
            :on-success="imgSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即发布</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCateList } from '@/api/post.js'
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  components: {
    VueEditor
  },
  data () { //
    return {
      addForm: {
        title: '',
        type: 1,
        content: '', // 如果是文章，这个属性存储文章的内容，如果是视频，这个属性存储视频上传好的服务器端路径
        categories: [], // 存储当前用户所选择的栏目id
        cover: []
      },
      config: {
        uploadImage: {
          url: 'http://localhost:3000/upload',
          headers: this.getToken(),
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      },
      cateList: [], // 所有的栏目列表数组
      checkedCate: [], // 被用户选择复选框的数组
      isIndeterminate: true,
      checkAll: false
    }
  },
  methods: {
    // 视频上传成功的钩子函数
    videoSuccess (response) {
      // console.log(response)

      if (this.addForm.type === 2) {
        this.addForm.content = response.data.url
      }
    },
    imgSuccess (response) {
      this.addForm.cover.push({ id: response.data.id })
    },
    // 栏目全选选择
    handleCheckAllChange (val) {
      this.checkedCate = val ? this.cateList.map(value => {
        return value.id
      })
        : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange () {

    },
    // token的添加函数
    getToken () {
      return {
        Authorization: localStorage.getItem('heima_backstage_37_token')
      }
    }
  },
  mounted () {
    // 获得栏目列表
    getCateList().then(res => {
      if (res.status === 200) {
        this.cateList = res.data.data.splice(2)
        // console.log(this.cateList)
      }
    })
  }
}
</script>

<style>
</style>
