<template>
  <div class="create-application">
    <div
      class="common-div-bg create-application-Dlg"
      v-if="!isShowAppFormDlg"
    >
      <div class="app-warning-content">
        <img
          src="../../../assets/images/application/app_warning_icon.png"
          alt="warning_icon"
        >
        <p>
          此类内容需在项目中查看
        </p>
        <div class="tip-btn-group">
          <el-button
            class="tip-btn"
            @click="returnIndexPage()"
          >
            返回
          </el-button>
          <el-button
            class="tip-btn"
            @click="isShowAppFormDlg=true"
          >
            新建项目
          </el-button>
        </div>
      </div>
    </div>
    <div
      class="common-div-bg create-application-form"
      v-if="isShowAppFormDlg"
    >
      <createApplicationComp />
    </div>
  </div>
</template>

<script>
import createApplicationComp from './CreateApplicationForm.vue'
export default {
  name: 'CreateApplication',
  components: {
    createApplicationComp
  },
  data () {
    return {
      isShowAppFormDlg: true
    }
  },
  methods: {
    returnIndexPage () {
      this.$router.push('/EG/developer/home')
    }
  },
  mounted () {
    if (sessionStorage.getItem('isCreate') === '0') {
      this.isShowAppFormDlg = false
    } else {
      this.isShowAppFormDlg = true
    }
    this.$store.commit('changeZoom', '1')
  }
}
</script>

<style lang="less">
  .create-application-Dlg{
    position: absolute;
    top: 25%;
    left: 35%;
    width: 30%;
    padding: 35px;
    text-align: center;
    background: linear-gradient(to bottom right, rgba(205,209,231,0.8),rgba(101,111,205,0.17));
    backdrop-filter: blur(6px);
    p{
      line-height: 85px;
    }
  }
  .create-application-form{
    position: absolute;
    top: 20%;
    left: 25%;
    width: 45%;
    padding: 35px;
    text-align: center;
  }
</style>
