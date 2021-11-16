<template>
  <div
    class="appstore workflow"
    :class="currentFlow>6||currentFlow===6?'center-active':''"
  >
    <div
      v-for="(item,index) in appStoreWorkflowDataArray"
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
  name: 'Appstore',
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
      appStoreWorkflowDataArray: [
        {
          id: 6,
          name: '应用商店',
          class: 'app-store',
          src: require('../../../assets/images/application/app_store.png'),
          toPath: '/EG/appstore/appWarehouse'
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
  .appstore{
    color: #fff;
     .item{
      top: 130px;
      left: -75px;
    }
  }
</style>
