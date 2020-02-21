<template>
    <div class="local">
        <el-breadcrumb separator="/" class="bread-crumb">
            <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">{{$t('breadCrumb.mecDeveloper')}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">API</el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('breadCrumb.applicationApi')}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="iframe_div" v-loading="apiDataLoading">
          <el-col :span="4">
            <div>
              <el-tree
                :data="treeData"
                :props="defaultProps"
                @node-click="handleNodeClick"
                node-key="id"
                :highlight-current="true"
                :current-node-key="0">
              </el-tree>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="iframe">
              <iframe
                id="iframe"
                :src="apiHtml"
                frameborder="0"
              ></iframe>
            </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
export default {
  name: 'local',
  data () {
    return {
      apiDataLoading: true,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      apiHtml: ''
    }
  },
  mounted () {
    function iframeHeight () {
      const oIframe = document.getElementById('iframe')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = (Number(deviceHeight) - 230) + 'px'
    }
    iframeHeight()
    window.onresize = function () {
      iframeHeight()
    }
    this.getApiUrl()
  },
  methods: {
    getApiUrl () {
      Get('mec/developer/v1/localapi').then(res => {
        let treeDataTemp = res.data.swaggers
        for (let i in treeDataTemp) {
          let obj = {
            id: 0,
            label: '',
            url: ''
          }
          obj.id = i
          obj.label = treeDataTemp[i].name
          obj.url = treeDataTemp[i].url
          this.treeData.push(obj)
        }
        this.handleNodeClick(this.treeData[0])
        this.apiDataLoading = false
      })
    },
    handleNodeClick (data) {
      let apiUrl = data.url
      this.apiHtml = 'http://159.138.146.235:8080/swagger#' + apiUrl
    }
  }
}
</script>
<style lang="less">
.local{
  .iframe_div{
    background-color: #fff;
    padding: 20px 10px 10px;
  }
  .iframe{
    height: 100%;
     iframe{
      width: 100%;
    }
  }
  .is-current .el-tree-node__content{
    background-color: blue;
  }
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
    span{
      padding-left: 20px;
    }
  }
  .el-tree-node__content span:first-child{
    display: none;
  }
}
</style>
