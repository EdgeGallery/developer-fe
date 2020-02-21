<template>
  <div class="api">
    <el-row :gutter="20" v-loading='apiDataLoading'>
          <el-col :span="6">
            <el-tree
              ref="treeList"
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              node-key="id"
              :highlight-current="true"
              :default-expanded-keys='defaultExpandKeys'
              :current-node-key="0">
            </el-tree>
          </el-col>
          <el-col :span="18">
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
import { Get, URL_PREFIX } from '../../../tools/tool.js'
export default {
  data () {
    return {
      apiDataLoading: true,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandKeys: [],
      apiHtml: ''
    }
  },
  methods: {
    getProjectDetail () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Get('mec/developer/v1/projects/' + projectId).then(res => {
        let treeDataTemp = []
        treeDataTemp = res.data.capabilityList
        let userId = res.data.userId
        for (let i in treeDataTemp) {
          let obj = {
            label: '',
            children: []
          }
          let type = treeDataTemp[i].type
          obj.label = treeDataTemp[i].name
          let serviceTemp = treeDataTemp[i].capabilityDetailList
          let hasService = false
          for (let j in serviceTemp) {
            let subHasService = false
            let subObj = {
              id: 0,
              label: '',
              apiFileId: '',
              userId: '',
              type: ''
            }
            subObj.id = j
            subObj.label = serviceTemp[j].service
            subObj.userId = userId
            subObj.type = type
            if (subObj.label) {
              subHasService = true
              hasService = true
            }
            subObj.apiFileId = serviceTemp[j].apiFileId
            if (subHasService) obj.children.push(subObj)
          }
          if (hasService) this.treeData.push(obj)
        }
        this.defaultExpandKeys.push(this.treeData[0].children[0].id)
        this.handleNodeClick(this.treeData[0].children[0])
        this.$nextTick(function () {
          this.$refs.treeList.setCurrentKey(0)
        })
        this.apiDataLoading = false
      })
    },
    handleNodeClick (data) {
      // console.log(data)
      if (!data.children) {
        let apiUrl = URL_PREFIX + 'mec/developer/v1/files/' + data.apiFileId + '?userId=' + data.userId + '&type=' + data.type
        this.apiHtml = 'http://159.138.146.235:8080/swagger#' + apiUrl
      }
    }
  },
  created () {
    this.getProjectDetail()
  },
  mounted () {
    function iframeHeight () {
      const oIframe = document.getElementById('iframe')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = Number(deviceHeight) - 330 + 'px'
    }
    iframeHeight()
    window.onresize = function () {
      iframeHeight()
    }
  }
}

</script>
<style lang='less' scoped>
</style>
