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
    getApiFileId () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '?userId=' + this.userId
      Get(url).then(res => {
        let data = res.data.capabilityList
        // console.log(data)
        let groupIdArr = []
        data.forEach(dataItem => {
          groupIdArr.push(dataItem.groupId)
        })
        // console.log(groupIdArr)
        groupIdArr.forEach(groupId => {
          let url = 'mec/developer/v1/capability-groups/' + groupId
          Get(url).then(res => {
            let data = res.data
            data.capabilityDetailList.forEach(service => {
              this.apiFileIdArr.push(service.apiFileId)
            })
          })
        })
        // console.log(this.apiFileIdArr)
        if (this.apiFileIdArr) {
          this.getSampleCode(this.apiFileIdArr)
        } else {
          // console.log('No choice capability')
        }
      })
    },
    // getApiFileId () {
    //   this.apiFileIdArr = JSON.parse(sessionStorage.getItem('apiFileIdArr'))
    //   if (this.apiFileIdArr) {
    //     this.getSampleCode(this.apiFileIdArr)
    //   } else {
    //     console.log('No choice capability')
    //   }
    // },
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
