<template>
  <div class="incubation common-workflow">
    <el-row>
      <el-col
        :span="6"
        :offset="6"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_capability_center.png"
          alt="capability-center"
          @click="checkCapabilityCenter"
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="6"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_application.png"
          alt="capability-center"
        >
      </el-col>
      <el-col
        :span="6"
        :offset="6"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_image.png"
          alt="capability-center"
        >
      </el-col>
      <el-col
        :span="6"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_test.png"
          alt="capability-center"
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="6"
        :offset="7"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_sandbox.png"
          alt="capability-center"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Incubation',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    checkCapabilityCenter () {
      this.$emit('showCapabilityCenterDlg')
    }
  }
}
</script>

<style lang="less" scoped>
.incubation{
  color: #fff;
    img{
      width: 50%;
    }
}
</style>
