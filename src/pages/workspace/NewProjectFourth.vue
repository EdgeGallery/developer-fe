<template>
  <div class="fourthstep">
    <div id="programTools">
      <img
        src="../../assets/images/newProject-fourth-icon1.png"
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
          src="../../assets/images/newProject-fourth-icon2.png"
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
          src="../../assets/images/newProject-fourth-icon3.png"
          alt=""
        >
        <p>{{ $t('workspace.sampleCode') }}</p>
      </el-link>
    </div>
  </div>
</template>

<script>
import { downloadFile } from '../../tools/tool.js'
export default {
  name: '',
  data () {
    return {
      apiFileIdArr: []
    }
  },
  created () {
  },
  mounted () {
    // this.getApiFileId()
  },
  methods: {
    getApiFileId () {
      this.apiFileIdArr = JSON.parse(sessionStorage.getItem('apiFileIdArr'))
      this.getSampleCode(this.apiFileIdArr)
      // console.log(this.apiFileIdArr)
    },
    getSampleCode (apiFileIdArr) {
      let params = {
        url: 'mec/developer/v1/files/samplecode',
        params: apiFileIdArr
      }
      downloadFile(params)
    }
  }
}
</script>

<style lang="less">
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

    .el-row{
      margin-bottom: 15px;
      .el-col-6{
        text-align: right;
      }
    }
  }
</style>
