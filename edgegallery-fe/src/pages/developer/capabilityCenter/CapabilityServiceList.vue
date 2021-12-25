<template>
  <div class="service_div">
    <div
      v-for="(item,index) in capabilityServiceList"
      :key="index"
      class="service_list"
    >
      <img
        :src="getImageUrl(item.iconFileId)"
        class="pic"
        alt=""
      >
      <el-button
        class="select-button"
        type="text"
        :class="item.selected?'select-button-active':''"
        @click="handleCheckChange(item,index)"
      >
        √
      </el-button>
      <div
        class="service_info"
        :class="{'service_hover':activeInfo===index}"
        @mouseenter="hoverServiceList(index)"
        @mouseleave="activeInfo=-1"
      >
        <p class="tit">
          {{ language==='cn'?item.name:item.nameEn }}
        </p>
        <p class="sort">
          <span class="hot">
            {{ $t('incubation.version') }} : {{ item.version }}
          </span>
          <span class="time">
            {{ $t('service.publishTime') }}{{ formatDate(item.uploadTime) }}
          </span>
        </p>
        <p
          class="desc"
          :class="{'all':activeInfo===index}"
          :title="language==='cn'?item.description:item.descriptionEn"
        >
          {{ language==='cn'?item.description:item.descriptionEn }}
        </p>
        <span
          class="detail"
          :class="{'show':activeInfo===index}"
          @click="viewServiceDetail(item,index)"
        >
          {{ $t('incubation.emulator') }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { applicationApi } from '../../../api/developerApi.js'
import { formatDate } from '../../../tools/common.js'
export default {
  name: 'CapabilityServiceList',
  props: {
    language: {
      type: String,
      default: 'cn'
    },
    capabilityServiceList: {
      require: true,
      type: Array,
      default: () => []
    },
    selectedServices: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeInfo: -1,
      appId: sessionStorage.getItem('applicationId'),
      isApiAmulator: false
    }
  },
  methods: {
    viewServiceDetail (item) {
      this.$emit('openDlg', item)
    },
    getImageUrl (iconFileId) {
      return applicationApi.getAbilityIconApi(iconFileId)
    },
    formatDate (timestamp) {
      return formatDate(timestamp)
    },
    hoverServiceList (index) {
      this.activeInfo = index
    },
    handleCheckChange (data, index) {
      data.selected = !data.selected
      this.hoverServiceList(index)
      if (data.selected) {
        let params = {
          serName: data.host,
          version: data.version,
          packageId: data.packageId,
          id: data.id,
          oneLevelName: data.group.name,
          oneLevelNameEn: data.group.nameEn,
          twoLevelName: data.name,
          twoLevelNameEn: data.nameEn,
          requestedPermissions: true
        }
        applicationApi.addService(this.appId, params).then(res => {
          this.selectedServices.push(data)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.selectedServices.forEach((ser, index) => {
          if (ser.id === data.id) {
            this.selectedServices.splice(index, 1)
            this.deleteServices(ser.id)
          }
        })
      }
    },

    deleteServices (serId) {
      applicationApi.deleteService(this.appId, serId).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    console.log(this.language)
  }
}
</script>
<style lang="less">
  .service_list{
    height: 184px;
    float: left;
    width: 32%;
    margin: 0 0 2% 1%;
    padding-bottom: 82px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    box-shadow: 0 6px 24px -7px rgba(27, 7, 118, 0.14);
    overflow: hidden;
    img{
      width: 100%;
      display: block;
      border-radius: 12px 12px 0 0;
    }
    .select-button{
      position: absolute;
      display: block;
      right: 15px;
      top: 12px;
      width: 35px;
      height: 35px;
      background: #fff;
      border-radius: 35px;
      color: #000 !important;
      font-weight: bold;
     }
     .select-button-active{
       color: #fff !important;
       background: #3ac372 !important;
     }
    .service_info{
      background: rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      position: absolute;
      width: 100%;
      bottom: 0px;
      right: 0;
      z-index: 2;
      padding: 10px 20px 0;
      color: #fff;
      .tit{
        font-size: 18px;
        margin-bottom: 5px;
        color: #fff;
        font-family: defaultFont, Arial, Helvetica, sans-serif;
      }
      .detail{
        float: right;
        font-size: 14px;
        color: #5944C0;
        padding: 1px 10px;
        border-radius: 15px;
        position: relative;
        top: -2px;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        background: #fff;
        margin-top: 5px;
      }
      .detail.show{
        opacity: 1;
        transition: all 0.4s ease-in-out 0.5s;
      }
      .detail:active{
        background-image: linear-gradient(127deg, #60a9e7, #4cc1a8);
      }
      .sort{
        color: #fff;
        font-size: 16px;
        line-height: 21px;
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        margin-bottom: 5px;
        .hot{
          margin-right: 15px;
        }
      }
      .desc{
        font-size: 14px;
        width: 100%;
        max-height: 0px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.6s ease-in-out;
      }
      .desc.all{
        max-height: 80px;
        white-space: nowrap;
        transition: all 0.6s ease-in-out;
        text-overflow:ellipsis;
      }
    }
    .service_info.service_hover{
      padding: 5px 20px;
    }
  }
  .service_list:hover{
    box-shadow: 0 10px 20px -7px rgba(27, 7, 118, 0.24);
  }
</style>
