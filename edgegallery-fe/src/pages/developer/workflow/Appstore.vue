<template>
  <div
    class="appstore common-workflow"
    :class="currentFlow>6||currentFlow===6?'common-center-active':''"
  >
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item app-store"
          :class="currentFlow>6||currentFlow===6?'app-store-active':''"
          @click="jumpTo('/EG/appstore/applications')"
        />
        <span
          class="appstore-active"
          v-if="currentFlow===6"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Appstore',
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
  .appstore{
    color: #fff;
    .app-store{
      top: 155px;
      left: -80px;
      background: url("../../../assets/images/application/app_store.png") no-repeat center;
      background-size: contain;
    }
    .common-center>.app-store-active{
      background: url("../../../assets/images/application/app_store_active.png") no-repeat center;
      background-size: contain;
    }
    .common-center>.appstore-active{
      display: inline-block;
      height: 30px;
      width: 30px;
      background: url("../../../assets/images/application/app_mark_box2.png") no-repeat center;
      background-size: contain;
      position: absolute;
      top: 235px;
      left: 760px;
    }
  }
</style>
