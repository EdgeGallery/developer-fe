<template>
  <div class="appstore common-workflow">
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item app-store"
          @click="jumpTo('/EG/appstore/applications')"
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

    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
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
  }
</style>
