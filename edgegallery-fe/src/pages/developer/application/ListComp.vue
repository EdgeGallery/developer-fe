<template>
  <div>
    <div
      v-for="(item,index) in dataList"
      :key="index"
      class="app-item"
      @click.stop="item.id===0?createApplication():checkProjectDetail(item)"
    >
      <img
        :src="item.id===0?item.iconUrl:getIconFile(item.iconFileId)"
        :alt="item.name.length>4?item.name.substr(0,4)+'...':item.name"
        :class="item.status==='creating'?'current':''"
      >
      <div class="app-name">
        {{ item.name }}
      </div>
      <div
        class="app-common-status"
        v-if="item.id!==0"
        :class="getStatusClass(item.status)"
      >
        {{ switchStatus(item.status) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComp',
  components: {

  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    checkProjectDetail (item) {
      sessionStorage.setItem('applicationId', item.id)
      this.$store.commit('changeFlow', item.status === 'CREATED' ? '1' : (item.status === 'TESTED' ? '5' : '3'))
    },
    createApplication () {
      sessionStorage.setItem('applicationId', '')
      this.$emit('createApplication', true)
    },
    switchStatus (status) {
      return status === 'CREATED' ? '创建完成' : (status === 'CONFIGURED' ? '配置成功' : (status === 'DEPLOYED' ? '已部署' : (status === 'TESTED' ? '测试完成' : '已发布')))
    },
    getIconFile (iconFileId) {
      return '/mec-developer/mec/developer/v2/files/' + iconFileId + '/action/get-file-stream'
    },
    getStatusClass (status) {
      return status === 'CREATED' ? 'app-created' : (status === 'CONFIGURED' ? 'app-success' : (status === 'DEPLOYED' ? 'app-failed' : 'app-published'))
    }
  }
}
</script>

<style lang="less" scoped>
  .app-item{
    text-align: center;
    cursor: pointer;
    padding: 20px 15px;
    .app-name{
      text-align: center;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    img{
      width: 66px;
      height: 66px;
    }
    img.current{
      border: 3px solid #42F6AC;
      border-radius: 66px;
    }
  }
  .app-common-status{
    font-size: 10px;
  }
  .app-common-status::before{
    content:"";
    display: inline-block;
    width: 18px;
    height: 18px;
    position: relative;
    top: 5px;
    left: 3px;
  }
  .app-created::before{
    background: url('../../../assets/images/projects/pro_creating.png') no-repeat center;
  }
  .app-success::before{
    background: url('../../../assets/images/projects/pro_success.png') no-repeat center;
  }
  .app-failed::before{
    background: url('../../../assets/images/projects/pro_failed.png') no-repeat center;
  }
  .app-published::before{
    background: url('../../../assets/images/projects/pro_published.png') no-repeat center;
  }
</style>
