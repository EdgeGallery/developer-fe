<template>
  <div class="create-application">
    <div
      class="common-div-bg create-application-Dlg"
      v-if="isShowAppDlg"
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
            @click="isShowProjectDlg=true,isShowAppDlg=false"
          >
            新建项目
          </el-button>
        </div>
      </div>
    </div>
    <div
      class="common-div-bg create-application-form"
      v-if="isShowProjectDlg"
    >
      <createApplicationComp @createNewApplication="createNewApplication" />
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
      isShowAppDlg: true,
      isShowProjectDlg: false
    }
  },
  methods: {
    returnIndexPage () {
      this.$router.push('/incubation')
    }
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
    p{
      line-height: 85px;
    }
  }
  .create-application-form{
    position: absolute;
    top: 20%;
    left: 35%;
    width: 35%;
    padding: 35px;
    text-align: center;
  }
</style>
