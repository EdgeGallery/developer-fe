<template>
  <div>
    <div
      v-for="(item,index) in dataList"
      :key="index"
      class="app-item"
      @click.stop="item.id===0?createApplication():checkProjectDetail(item)"
    >
      <div
        class="app-item-delete"
        @click="deleteApp(item.id)"
        v-if="item.id!==0&&showDeleteBtn"
      />
      <img
        :src="item.id===0?item.iconUrl:getFile(item.iconFileId)"
        :alt="item.name.length>4?item.name.substr(0,4)+'...':item.name"
        :class="item.id==='creating'?'current':''"
      >
      <div
        class="app-name"
        :title="item.name"
      >
        {{ item.name.length>4?item.name.substr(0,12)+'...':item.name }}
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
import { applicationApi } from '../../../api/developerApi'
export default {
  name: 'ListComp',
  components: {

  },
  props: {
    showDeleteBtn: {
      type: Boolean,
      default: false
    },
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
      sessionStorage.setItem('isCreate', '1')
      this.$store.commit('changeFlow', item.status === 'CREATED' ? '1' : (item.status === 'MEPHOST_SELECTED' ? '3' : (item.status === 'CONFIGUARED' ? '4' : '5')))
      this.$router.push('/EG/developer/home')
    },
    createApplication () {
      sessionStorage.setItem('applicationId', '')
      sessionStorage.setItem('isCreate', '1')
      this.$store.commit('changeFlow', '0')
      this.$router.push('/EG/developer/createApplication')
    },
    switchStatus (status) {
      return status === 'CREATED' ? '创建完成' : (status === 'CONFIGURED' ? '配置成功' : (status === 'DEPLOYED' ? '已部署' : (status === 'TESTED' ? '测试完成' : '已发布')))
    },
    getStatusClass (status) {
      return status === 'CREATED' ? 'app-created' : (status === 'CONFIGURED' ? 'app-success' : (status === 'DEPLOYED' ? 'app-failed' : 'app-published'))
    },
    getFile (id) {
      return applicationApi.getFileStream(id)
    },
    deleteApp (id) {
      this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        applicationApi.deleteApp(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$store.commit('changeFlow', '0')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .app-item{
    text-align: center;
    cursor: pointer;
    padding: 20px 15px;
    width: 154px;
    position: relative;
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
  .app-item-delete{
    width: 10px;
    height: 10px;
    position: relative;
    top: 10px;
    left: 75px;
    background: url("../../../assets/images/projects/pro_failed.png") no-repeat center;
    z-index: 10;
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
