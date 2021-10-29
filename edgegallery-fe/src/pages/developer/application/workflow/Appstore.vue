<template>
  <div class="appstore common-workflow">
    <el-row>
      <el-col
        :span="24"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_application.png"
          alt="capability-center"
        >
        <div class="flow-line" />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_store.png"
          alt="capability-center"
        >
        <div class="flow-line" />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_application.png"
          alt="capability-center"
        >
        <div class="flow-line" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Appstore',
  components: {

  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .appstore{
    color: #fff;
    img{
      width: 70%;
    }
  }
</style>
