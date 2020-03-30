<template>
  <div class="project-link">
    <div class="fourthstep">
      <div id="programTools">
        <img
          src="../../../assets/images/newProject-fourth-icon1.png"
          alt=""
        >
        <p>{{ $t('workspace.programTools') }}</p>
      </div>
      <div id="programPlugin">
        <el-link
          type="info"
          href="https://159.138.129.53:30092/#/mecDeveloper/plugin/list#1"
          target="_blank"
        >
          <img
            src="../../../assets/images/newProject-fourth-icon2.png"
            alt=""
          >
          <p>{{ $t('workspace.programPlugin') }}</p>
        </el-link>
      </div>
      <div id="sampleCode">
        <el-link
          type="info"
          @click="getApiFileId"
        >
          <img
            src="../../../assets/images/newProject-fourth-icon3.png"
            alt=""
          >
          <p>{{ $t('workspace.sampleCode') }}</p>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, downloadFile } from '../../../tools/tool.js'
export default {
  data () {
    return {
      apiFileIdArr: [],
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    async getApiFileId () {
      this.apiFileIdArr = []
      let projectId = sessionStorage.getItem('mecDetailID')
      let getGroupid = async (url) => {
        await Get(url).then(res => {
          let data = res.data
          data.capabilityDetailList.forEach(service => {
            this.apiFileIdArr.push(service.apiFileId)
          })
        })
        this.getSampleCode(this.apiFileIdArr)
      }

      let url = 'mec/developer/v1/projects/' + projectId
      await Get(url).then(res => {
        let data = res.data.capabilityList
        data.forEach(dataItem => {
          let groupIdUrl = 'mec/developer/v1/capability-groups/' + dataItem.groupId
          getGroupid(groupIdUrl)
        })
      })
    },
    getSampleCode (apiFileIdArr) {
      let params = {
        url: 'mec/developer/v1/files/samplecode',
        params: apiFileIdArr
      }
      downloadFile(params)
    }
  },
  mounted () {}
}

</script>
<style lang='less' scoped>
.project-link{

  .fourthstep{
    width: 100%;
    display: flex;
    color: #909399;
    div{
      flex-grow: 1;
      text-align: center;
      margin-top: 20px;
      img{
        width:46px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
