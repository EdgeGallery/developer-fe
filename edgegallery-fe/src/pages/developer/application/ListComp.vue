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
        @click.stop="deleteApp(item.id)"
        v-if="item.id!==0&&showDeleteBtn"
      />
      <div
        class="img-div"
        :class="{'current':item.id===applicationId}"
      >
        <img
          :src="item.id===0?item.iconUrl:getFile(item.iconFileId)"
          :alt="item.name.length>4?item.name.substr(0,4)+'...':item.name"
        >
      </div>

      <div
        class="app-name"
        :title="item.name"
      >
        {{ item.name.length>12?item.name.substr(0,12)+'...':item.name }}
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
      applicationId: sessionStorage.getItem('applicationId') || ''
    }
  },
  methods: {
    checkProjectDetail (item) {
      sessionStorage.setItem('applicationId', item.id)
      sessionStorage.setItem('isCreate', '1')
      this.applicationId = item.id
      this.$emit('putAway', false)
      this.$store.commit('changeApp', item.name)
      this.$store.commit('changeFlow', item.status === 'CREATED' ? '1' : (item.status === 'CONFIGURED' ? '3' : (item.status === 'PACKAGED' ? '4' : (item.status === 'TESTED' ? '5' : '6'))))
      this.$router.push('/EG/developer/home')
    },
    createApplication () {
      sessionStorage.setItem('applicationId', '')
      sessionStorage.setItem('isCreate', '1')
      this.$store.commit('changeFlow', '0')
      this.$emit('putAway')
      this.$store.commit('changeApp', '5G边缘应用孵化流水线')
      this.$router.push('/EG/developer/createApplication')
    },
    switchStatus (status) {
      return status === 'CREATED' ? '创建完成' : (status === 'CONFIGURED' ? '配置完成' : (status === 'PACKAGED' ? '打包完成' : (status === 'TESTED' ? '测试完成' : (status === 'RELEASED' ? '已发布' : '已部署'))))
    },
    getStatusClass (status) {
      return status === 'CREATED' ? 'app-created' : (status === 'CONFIGURED' || status === 'PACKAGED' ? 'app-success' : (status === 'TESTED' ? 'app-success' : 'app-published'))
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
          this.$emit('refreshList')
          if (id === sessionStorage.getItem('applicationId')) {
            this.$message({
              type: 'info',
              message: '当前应用已删除，1s后将回到首页!'
            })
            sessionStorage.setItem('applicationId', '')
            this.$router.push('/EG/developer/home')
          }
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
    .img-div{
      display: inline-block;
      width: 66px;
      height: 66px;
      border: 3px solid transparent;
      border-radius: 50%;
      padding: 3px;
      img{
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #ffffff;
      }
    }
    .img-div.current{
      border: 3px solid #42F6AC;
      border-radius: 50%;
    }
  }
  .app-item-delete{
    width: 20px;
    height: 20px;
    position: relative;
    top: 15px;
    left: 75px;
    background: url("../../../assets/images/application/app_failed.png") no-repeat center;
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
    background: url('../../../assets/images/application/app_creating.png') no-repeat center;
  }
  .app-success::before{
    background: url('../../../assets/images/application/app_success.png') no-repeat center;
  }
  .app-failed::before{
    background: url('../../../assets/images/application/app_failed.png') no-repeat center;
  }
  .app-published::before{
    background: url('../../../assets/images/application/app_published.png') no-repeat center;
  }
</style>
