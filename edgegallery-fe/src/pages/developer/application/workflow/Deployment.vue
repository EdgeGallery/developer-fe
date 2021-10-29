<template>
  <div class="deployment common-workflow">
    <el-row>
      <el-col
        :span="24"
        class="common-center"
      >
        <div class="flow-line" />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="8"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_meao.png"
          alt="capability-center"
        >
      </el-col>
      <el-col
        :span="8"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_mepm.png"
          alt="capability-center"
        >
      </el-col>
      <el-col
        :span="8"
        class="common-center"
      >
        <img
          src="../../../../assets/images/application/app_edge_node.png"
          alt="capability-center"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Deployment',
  components: {

  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .deployment{
    color: #fff;
    img{
      width: 50%;
    }
  }
</style>
