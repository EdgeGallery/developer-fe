<template>
  <div
    class="deployment common-workflow"
    :class="currentFlow>7||currentFlow===7?'common-center-active':''"
  >
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-meao"
          :class="currentFlow>7||currentFlow===7?'deploy-meao-active':''"
          @click="jumpTo('/EG/mecm/appDeployDetail')"
        />
      </div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-mepm"
          :class="currentFlow>7||currentFlow===7?'deploy-mepm-active':''"
        />
      </div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item deploy-node"
          :class="currentFlow>7||currentFlow===7?'deploy-node-active':''"
        />
        <span
          class="node-active"
          v-if="currentFlow===7"
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
      currentFlow: 0
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    this.currentFlow = sessionStorage.getItem('currentFlow') ? Number(sessionStorage.getItem('currentFlow')) : 0
  }
}
</script>

<style lang="less" scoped>
  .deployment{
    color: #fff;
    .deploy-meao{
      top: 155px;
      left: -60px;
      background: url("../../../assets/images/application/app_meao.png") no-repeat center;
      background-size: contain;
    }
    .common-center{
      .node-active{
        display: inline-block;
        height: 30px;
        width: 30px;
        background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
        background-size: contain;
        position: absolute;
        top: 230px;
        left: 1130px;
      }
      .deploy-meao-active{
        background: url("../../../assets/images/application/app_meao_active.png") no-repeat center;
        background-size: contain;
      }
      .deploy-mepm-active{
        background: url("../../../assets/images/application/app_mepm_active.png") no-repeat center;
        background-size: contain;
      }
      .deploy-node-active{
        background: url("../../../assets/images/application/app_node_active.png") no-repeat center;
        background-size: contain;
      }
    }
    .deploy-mepm{
      top: 65px;
      left: 100px;
      background: url("../../../assets/images/application/app_mepm.png") no-repeat center;
      background-size: contain;
    }
    .deploy-node{
      top: -25px;
      left: 260px;
      background: url("../../../assets/images/application/app_edge_node.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
