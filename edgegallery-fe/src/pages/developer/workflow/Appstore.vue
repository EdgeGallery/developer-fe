<template>
  <div
    class="appstore workflow"
    :class="currentFlow>6||currentFlow===6?'center-active':''"
  >
    <div class="workflow-name">
      {{ $t('workflow.appstore') }}
    </div>
    <div
      v-for="(item,index) in appStoreWorkflowDataArray"
      :key="index"
    >
      <div
        class="center"
      >
        <div
          class="step-item"
          :class="[item.id===currentFlow?'item-active':'',item.class]"
          @click="jumpTo(item.toPath)"
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
          name: '应用仓库',
          nameEn: 'App Store',
          class: 'app-store',
          src: require('../../../assets/images/application/app_store.png'),
          toPath: '/EG/appstore/appWarehouse'
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
    }
  },
  mounted () {
    this.isCapabilityActive = sessionStorage.getItem('isCapabilityActive')
  }
}
</script>

<style lang="less" scoped>
  .appstore{
    .workflow-name{
      left: 0px;
    }
    color: #fff;
     .step-item{
      top: 240px;
      left: 30px;
    }
  }
</style>
