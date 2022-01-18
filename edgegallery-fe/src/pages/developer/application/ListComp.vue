<template>
  <div>
    <div
      class="app-item"
      @mouseenter="isShowCreate=!isShowCreate"
      @mouseleave="isShowCreate=!isShowCreate"
      v-if="userAuthorities.indexOf('ROLE_DEVELOPER_GUEST')<0 "
    >
      <div
        class="img-div"
      >
        <img
          :src="iconUrl"
          alt="new"
        >
      </div>
      <div
        v-if="isShowCreate"
        class="down_div"
        :class="zoom!==2?'down_div_position':''"
      >
        <div
          class="transition-box"
          @click="createApplication(1)"
        >
          <em />{{ $t('incubation.newProject') }}
        </div>
        <div
          class="transition-box"
          @click="createApplication(2)"
        >
          <em />{{ $t('incubation.selectProfile') }}
        </div>
      </div>
      <div
        class="app-name"
        :title="$t('incubation.addNewApp')"
      >
        {{ $t('incubation.addNewApp') }}
      </div>
    </div>
    <div
      v-for="(item,index) in dataList"
      :key="index"
      class="app-item"
      @click.stop="checkProjectDetail(item)"
    >
      <div
        class="app-item-delete"
        @click.stop="deleteApp(item.id)"
        v-if="item.id!==0&&showDeleteBtn"
      >
        X
      </div>
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
      language: localStorage.getItem('language') || 'cn',
      iconUrl: require('../../../assets/images/application/app_add_new.png'),
      new: {
        id: 0,
        type: 'normal',
        iconUrl: require('../../../assets/images/application/app_add_new.png'),
        name: ''
      },
      userAuthorities: sessionStorage.getItem('userAuthorities') || ''
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
      if (this.dataList.indexOf(item) > 3) {
        this.dataList.unshift(item)
      }
      this.applicationId = item.id
      this.$emit('putAway', false)
      this.$store.commit('changeApp', item.name)
      this.$store.commit('changeFlow', this.handleStatus(item.status))
      this.$router.push('/EG/developer/home')
    },
    handleStatus (status) {
      if (status === 'CREATED') {
        return '2'
      } else if (status === 'CONFIGURED') {
        return '3'
      } else if (status === 'PACKAGED') {
        return '4'
      } else if (status === 'TESTED') {
        return '5'
      } else {
        return '6'
      }
    },
    createApplication (type) {
      if (sessionStorage.getItem('userAuthorities').indexOf('ROLE_DEVELOPER_GUEST') < 0) {
        sessionStorage.setItem('applicationId', '')
        sessionStorage.setItem('isCreate', '1')
        this.$store.commit('changeFlow', '0')
        this.$emit('putAway')
        this.$store.commit('changeApp', '5G')
        this.$store.commit('changeZoom', '1')
        if (type === 1) {
          this.$router.push('/EG/developer/createApplication')
        } else {
          this.$router.push('/EG/developer/createProfileApplication')
        }
      } else {
        this.$message.warning(this.$t('promptInformation.noPermission'))
      }
    },
    getType (data) {
      if (data !== '') {
        data.appClass === 'VM' ? sessionStorage.setItem('vimType', 'OpenStack') : sessionStorage.setItem('vimType', 'K8S')
        sessionStorage.setItem('architecture', data.architecture)
        sessionStorage.setItem('pkgSpecId', data.pkgSpecId)
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
      this.$confirm(this.$t('incubation.deleteAppTip'), this.$t('homePromptMessage.prompt'), {
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
            this.$store.commit('changeApp', '5G')
            this.$store.commit('changeFlow', '0')
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
    padding: 20px 15px 0;
    width: 12.5%;
    min-width: 154px;
    position: relative;
    .app-name{
      text-align: center;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 18px;
      padding: 5px 0;
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
      border: 3px solid #f2b720;
      border-radius: 50%;
    }
  }
  .down_div{
    width: 135px;
    position: fixed;
    z-index: 9999;
    left: 120px;
    top: 160px;
    border-radius: 4px;
    font-size: 16px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
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
    top: 18px;
    left: 90px;
    background: #f13838;
    z-index: 10;
    color: #fff;
    border-radius: 20px;
    line-height: 20px;
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
