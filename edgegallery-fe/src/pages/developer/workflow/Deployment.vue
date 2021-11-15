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
          <div class="flow-name">
            {{ item.name }}
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
          class: 'deploy-meao',
          src: require('../../../assets/images/application/app_meao.png'),
          toPath: '/EG/mecm/appDeployDetail'
        },
        {
          id: 8,
          name: 'MEPM',
          class: 'deploy-mepm',
          src: require('../../../assets/images/application/app_mepm.png'),
          toPath: ''
        },
        {
          id: 9,
          name: '边缘节点',
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
      top: 130px;
      left: -60px;
    }
    .deploy-mepm{
      top: 0px;
      left: 110px;
    }
    .deploy-node{
      top: -130px;
      left: 280px;
    }
  }
</style>
