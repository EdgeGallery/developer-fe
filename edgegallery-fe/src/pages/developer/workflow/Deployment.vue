<template>
  <div
    class="deployment workflow"
    :class="currentFlow>9||currentFlow===9?'center-active':''"
  >
    <div class="workflow-name">
      {{ $t('workflow.produceEnv') }}
    </div>
    <div
      v-for="(item,index) in deployWorkflowDataArray"
      :key="index"
    >
      <div
        class="center"
      >
        <div
          class="step-item"
          :class="[item.id===currentFlow?'item-active':'',item.class]"
          @click="item.id===currentFlow+1||item.id<currentFlow||item.id===currentFlow?jumpTo(item.toPath):showWarning()"
        >
          <img
            :src="item.src"
            :class="[currentFlow>item.id||currentFlow===item.id?'active':'']"
            alt="EdgeGallery"
          >
          <div class="flow-name">
            {{ language==='cn'?item.name:item.nameEn }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deployment',
  components: {

  },
  props: {
    currentFlow: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isCapabilityActive: false,
      deployWorkflowDataArray: [
        {
          id: 7,
          name: 'MEAO',
          nameEn: 'MEAO',
          class: 'deploy-meao',
          src: require('../../../assets/images/application/app_meao.png'),
          toPath: '/EG/mecm/appDeployDetail'
        },
        {
          id: 8,
          name: 'MEPM',
          nameEn: 'MEPM',
          class: 'deploy-mepm',
          src: require('../../../assets/images/application/app_mepm.png'),
          toPath: ''
        },
        {
          id: 9,
          name: '边缘节点',
          nameEn: 'Nodes',
          class: 'deploy-node',
          src: require('../../../assets/images/application/app_node.png'),
          toPath: ''
        }
      ],
      language: localStorage.getItem('language')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    showWarning () {
      this.$message.warning(this.$t('workflow.mustSteps'))
    }
  },
  mounted () {
    this.isCapabilityActive = sessionStorage.getItem('isCapabilityActive')
  }
}
</script>

<style lang="less" scoped>
  .deployment{
    .workflow-name{
      left: 0px;
    }
    .deploy-meao{
      top: 240px;
      left: 87px;
    }
    .deploy-mepm{
      top: 100px;
      left: 258px;
    }
    .deploy-node{
      top: -40px;
      left: 430px;
    }
  }
</style>
