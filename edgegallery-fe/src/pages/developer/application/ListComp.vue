<template>
  <div>
    <div
      v-for="(item,index) in dataList"
      :key="index"
      class="app-item"
      @mouseenter="isShowCreate=!isShowCreate"
      @mouseleave="isShowCreate=!isShowCreate"
      @click.stop="item.id===0?'':checkProjectDetail(item)"
    >
      <div
        class="app-item-delete"
        @click.stop="deleteApp(item.id)"
        v-if="item.id!==0&&showDeleteBtn"
      />
      <div
        class="img-div"
        :class="{'current':item.id===applicationId}"
        @click="getType(item)"
      >
        <img
          :src="item.id===0?item.iconUrl:getFile(item.iconFileId)"
          :alt="item.name.length>4?item.name.substr(0,4)+'...':item.name"
        >
      </div>
      <div
        v-if="item.id===0 && isShowCreate"
        class="down_div"
        :class="zoom!==2?'down_div_position':''"
      >
        <div
          class="transition-box"
          @click="createApplication()"
        >
          <em />{{ $t('incubation.newProject') }}
        </div>
        <div
          class="transition-box"
          @click="createProfileApplication()"
        >
          <em />{{ $t('incubation.selectProfile') }}
        </div>
      </div>
      <div
        class="app-name"
        :title="item.name"
      >
        {{ item.id===0?$t('incubation.addNewApp'):(item.name.length>12?item.name.substr(0,12)+'...':item.name) }}
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
import { applicationApi } from '../../../api/developerApi.js'
import { Status } from '../../../tools/commondata.js'
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
    },
    zoom: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      isShowCreate: false,
      language: localStorage.getItem('language')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
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
      this.$store.commit('changeApp', '5G')
      if (sessionStorage.getItem('userAuthorities').indexOf('ROLE_DEVELOPER_GUEST') < 0) {
        this.$router.push('/EG/developer/createApplication')
      } else {
        this.$message.warning(this.$t('promptInformation.noPermission'))
      }
    },
    createProfileApplication () {
      sessionStorage.setItem('applicationId', '')
      sessionStorage.setItem('isCreate', '1')
      this.$store.commit('changeFlow', '0')
      this.$emit('putAway')
      this.$store.commit('changeApp', '5G')
      if (sessionStorage.getItem('userAuthorities').indexOf('ROLE_DEVELOPER_GUEST') < 0) {
        this.$router.push('/EG/developer/createProfileApplication')
      } else {
        this.$message.warning(this.$t('promptInformation.noPermission'))
      }
    },
    getType (data) {
      if (data !== '') {
        data.appClass === 'VM' ? sessionStorage.setItem('vimType', 'OpenStack') : sessionStorage.setItem('vimType', 'K8S')
        sessionStorage.setItem('architecture', data.architecture)
      }
      sessionStorage.setItem('loadtype', data.appClass === 'VM' ? 'vm' : 'container')
    },
    switchStatus (status) {
      if (this.language === 'cn') {
        return Status[status][0]
      } else {
        return Status[status][1]
      }
    },
    getStatusClass (status) {
      return Status[status][2]
    },
    getFile (id) {
      return applicationApi.getFileStream(id)
    },
    deleteApp (id) {
      this.$confirm(this.$t('incubation.deleteAppTip'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        applicationApi.deleteApp(id).then(res => {
          this.$message({
            type: 'success',
            message: this.$t('incubation.deleted')
          })
          this.$emit('refreshList')
          if (id === sessionStorage.getItem('applicationId')) {
            this.$message({
              type: 'info',
              message: this.$t('incubation.afterDelete')
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
      font-size: 18px;
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
  .down_div{
    width: 105px;
    position: fixed;
    z-index: 9999;
    left: 120px;
    top: 160px;
    border-radius: 4px;
    font-size: 16px;
    font-family: defaultFontLight;
    color: rgba(255, 255, 255, 1);
    background: #290E74;
    .transition-box{
      height: 32px;
      line-height: 32px;
      position: relative;
      z-index: 2;
      em{
        display: inline-block;
        width: 0;
        height: 0;
        position: absolute;
        top: 13px;
        left: 4px;
      }
    }
    .transition-box:hover{
      background: rgba(96, 86, 154, 0.5);
      border-radius: 4px;
      em{
        border-bottom: 5px solid #42F6AC;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        transform: rotate(90deg);
      }
    }
  }
  .down_div_position{
    position: absolute;
    left: 120px;
    top: 25px;
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
    font-size: 14px;
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
