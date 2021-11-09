<template>
  <div
    class="deployment workflow"
    :class="currentFlow>9||currentFlow===9?'center-active':''"
  >
    <div
      v-for="(item,index) in deployWorkflowDataArray"
      :key="index"
    >
      <div
        class="center"
      >
        <div
          class="item"
          :class="[item.id===currentFlow&&isCapabilityActive?'item-capa-active':(item.id===currentFlow?'item-active':''),currentFlow>0?'item-must':'',item.class]"
          @click="jumpTo(item.toPath)"
        >
          <img
            :src="item.src"
            :class="[currentFlow>item.id||currentFlow===item.id?'active':'',item.id===currentFlow+1?'next':'']"
            alt="EdgeGallery"
          >
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
          name: '',
          class: 'deploy-meao',
          src: require('../../../assets/images/application/app_meao.png'),
          toPath: '/EG/mecm/appDeployDetail'
        },
        {
          id: 8,
          name: '',
          class: 'deploy-mepm',
          src: require('../../../assets/images/application/app_mepm.png'),
          toPath: ''
        },
        {
          id: 9,
          name: '',
          class: 'deploy-node',
          src: require('../../../assets/images/application/app_node.png'),
          toPath: ''
        }
      ]
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    this.isCapabilityActive = sessionStorage.getItem('isCapabilityActive')
  }
}
</script>

<style lang="less" scoped>
  .deployment{
    .deploy-meao{
      top: 152px;
      left: -58px;
    }
    .deploy-mepm{
      top: 58px;
      left: 104px;
    }
    .deploy-node{
      top: -33px;
      left: 265px;
    }
  }
</style>
