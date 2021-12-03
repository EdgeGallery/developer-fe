
<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->
<template>
  <div class="common-div-bg profile-main">
    <h3 class="common-dlg-title title">
      {{ $t('incubation.selectProfile') }}
    </h3>
    <div
      class="profile-content flex"
      v-for="(item,index) in profileData"
      :key="index"
      v-show="!isNoData"
    >
      <img
        src="../../../assets/images/application/selected.png"
        alt=""
        class="select-icon curp"
        v-if="activeIndex===index"
        @click="choose(item,index)"
      >
      <img
        src="../../../assets/images/application/notselect.png"
        alt=""
        class="select-icon curp"
        @click="choose(item,index)"
        v-else
      >
      <div>
        <img
          src="../../../assets/images/application/app_add_profile.png"
          alt=""
        >
      </div>
      <div class="content-text">
        <div class="name">
          <span class="name-text">{{ item.name }}</span>
          <span class="type">{{ item.type }}</span>
          <span class="type">{{ item.industry }}</span>
        </div>
        <p class="desc">
          {{ language==='cn'?item.description :item.descriptionEn }}
        </p>
        <div class="applist">
          {{ $t('incubation.appList') }}
          <span
            class="applist-name"
            v-for="(app,dex) in item.appList"
            :key="dex"
          >{{ app }}</span>
        </div>
      </div>
    </div>
    <div v-show="isNoData">
      {{ $t('incubation.noData') }}
    </div>
    <div class="btn-container">
      <el-button
        class="common-btn"
        @click="$router.go(-1)"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="confirm()"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { applicationApi } from '../../../api/developerApi.js'
export default {
  name: 'CreateProfileApplication',
  data () {
    return {
      profileData: [],
      profileId: '',
      defaultIcon: [
        require('../../../assets/images/application/defaulticon.png')
      ],
      defaultIconFile: [],
      language: localStorage.getItem('language'),
      isNoData: false,
      activeIndex: -1
    }
  },
  methods: {
    getListData () {
      applicationApi.getProfileDataList({ limit: 100, offset: 0 }).then(res => {
        this.profileData = res.data.results || []
        this.isNoData = !(this.profileData.length > 0)
      }).catch(err => {
        console.log(err)
      })
    },
    confirm () {
      if (this.profileId === '') {
        this.$message.warning(this.$t('incubation.noProfile'))
      } else {
        let formData = new FormData()
        formData.append('iconFile', this.defaultIconFile[0])
        applicationApi.createProfileNewApp(this.profileId, formData).then(res => {
          this.$store.commit('changeFlow', '1')
          this.$store.commit('changeZoom', '2')
          sessionStorage.setItem('applicationId', res.data.id)
          this.$message.success(this.$t('incubation.createSuc'))
          this.$store.commit('changeApp', res.data.name)
          this.$router.push('/EG/developer/home')
        }).catch(err => {
          this.$message.warning(this.$t('incubation.createFail'))
          console.log(err)
        })
      }
    },
    choose (item, index) {
      if (this.activeIndex === index) {
        this.activeIndex = -1
        this.profileId = ''
      } else {
        this.activeIndex = index
        this.profileId = item.id
      }
    },
    convertIcon (file) {
      let image = new Image()
      image.src = file
      image.onload = () => {
        // Convert static images to base64
        let base64 = this.getBase64Image(image)
        // Convert base64 to file stream
        this.defaultIconFile.push(this.base64toFile(base64))
      }
    },
    getBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      return canvas.toDataURL('image/' + ext)
    },
    base64toFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename + '.' + suffix, {
        type: mime
      })
    }
  },
  mounted () {
    this.getListData()
    this.convertIcon(this.defaultIcon[0])
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less">
  .profile-main{
    position: absolute;
    top: 10%;
    left: 25%;
    max-height: 85%;
    width: 45%;
    padding: 35px;
    text-align: center;
    .title{
      text-align: left;
    }
    .profile-content{
      background: #4E3494;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 32px;
      position: relative;
      .select-icon{
        position: absolute;
        right: 20px;
        top: 25px;
        width: 22px;
        height: 22px;
      }
      .content-text{
        padding-left: 25px;
        .name{
          text-align: left;
          margin-bottom: 20px;
          span{
            margin-right: 10px;
          }
          .name-text{
            font-size: 16px;
          }
          .type{
            font-size: 10px;
            color: #8c80ac;
            background: #3E2680;
            border-radius: 2px;
            padding: 4px 10px;
          }
        }
        .desc{
          font-size: 14px;
          font-family: defaultFontLight;
          padding-bottom: 16px;
          border-bottom: 1px solid #351E74;
          text-align: left;
        }
        .applist{
          font-size: 14px;
          margin-top: 16px;
          text-align: left;
          .applist-name{
            font-size: 14px;
            margin: 0 10px;
          }
          .applist-name:before{
            display: inline-block;
            content: '';
            width: 5px;
            height: 5px;
            background: #43F6AD;
            border-radius: 50%;
            position: relative;
            top: -2px;
            left: -10px;
          }
        }
      }
    }
  }
</style>
