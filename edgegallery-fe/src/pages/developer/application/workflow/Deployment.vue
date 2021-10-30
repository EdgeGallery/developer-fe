<template>
  <div class="deployment common-workflow">
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-meao"
        />
      </div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-mepm"
        />
      </div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-node"
        />
      </div>
    </div>
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
    .deploy-meao{
      top: 155px;
      left: -60px;
      background: url("../../../../assets/images/application/app_meao.png") no-repeat center;
      background-size: contain;
    }
    .deploy-mepm{
      top: 65px;
      left: 100px;
      background: url("../../../../assets/images/application/app_mepm.png") no-repeat center;
      background-size: contain;
    }
    .deploy-node{
      top: -25px;
      left: 260px;
      background: url("../../../../assets/images/application/app_edge_node.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
