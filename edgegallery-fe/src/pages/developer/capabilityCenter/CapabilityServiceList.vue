<template>
  <div class="service_div">
    <div
      v-for="(item,index) in capabilityServiceList"
      :key="index"
      class="service_list"
      @mouseenter="hoverServiceList(index)"
      @mouseleave="activeInfo=-1"
      @click="viewServiceDetail(item,index)"
    >
      <img
        :src="getImageUrl(item.iconFileId)"
        class="pic"
        alt=""
      >
      <el-button
        class="select-button"
        type="text"
      >
        <img
          src="../../../assets/images/application/selected.png"
          alt=""
          v-if="item.selected"
          @click="chooseScene(item)"
        >
        <img
          v-else
          src="../../../assets/images/application/notselected.png"
          alt=""
          @click="chooseScene(item)"
        >
      </el-button>
      <div
        class="service_info"
        :class="{'service_hover':activeInfo===index}"
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
        >
          {{ language==='cn'?item.description:item.descriptionEn }}
        </p>
        <span
          class="detail"
          :class="{'show':activeInfo===index}"
        >
          在线模拟器
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { applicationApi } from '../../../api/developerApi.js'
import { formatDate } from '../../../tools/common.js'
export default {
  props: {
    language: {
      type: String,
      default: ''
    },
    capabilityServiceList: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeInfo: -1
    }
  },
  methods: {
    getImageUrl (iconFileId) {
      return applicationApi.getAbilityIconApi(iconFileId)
    },
    formatDate (timestamp) {
      return formatDate(timestamp)
    },
    hoverServiceList (index) {
      this.activeInfo = index
    }
  },
  mounted () {
    this.getServiceList()
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
      width: 24px;
      height: 24px;
      img{
        width: 24px;
        height: 24px;
      }
     }
    .service_info{
      background: rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      position: absolute;
      width: 100%;
      bottom: 0px;
      right: 0;
      z-index: 2;
      padding: 20px 20px 0;
      color: #fff;
      .tit{
        font-size: 16px;
        margin-bottom: 10px;
        color: #fff;
        font-family: defaultFont;
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
        font-family: defaultFontLight;
        .hot{
          margin-right: 15px;
        }
        .time{
          font-size: 14px;
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
        white-space: normal;
        transition: all 0.6s ease-in-out;
      }
    }
    .service_info.service_hover{
      padding: 20px;
    }
  }
  .service_list:hover{
    box-shadow: 0 10px 20px -7px rgba(27, 7, 118, 0.24);
  }
</style>
