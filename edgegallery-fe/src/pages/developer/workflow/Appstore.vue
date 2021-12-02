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
          class="item"
          :class="[item.id===currentFlow?'item-active':'',currentFlow>0?'item-must':'',item.class]"
          @click="item.id===currentFlow+1||item.id<currentFlow||item.id===currentFlow?jumpTo(item.toPath):showWarning()"
        >
          <img
            :src="item.src"
            :class="[currentFlow>item.id||currentFlow===item.id?'active':'',item.id===currentFlow+1?'next':'']"
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
          name: '应用商店',
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
  .appstore{
    .workflow-name{
      top: -35px;
      left: -90px;
    }
    color: #fff;
     .item{
      top: 135px;
      left: -75px;
    }
  }
</style>
