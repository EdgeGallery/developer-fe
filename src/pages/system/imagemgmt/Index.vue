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
  <div class="image_div padding_default">
    <div class="title_top title_left defaultFontBlod">
      {{ $t('breadCrumb.systemImgMgmt') }}
      <span class="line_bot1" />
      <el-button
        class="createimage_btn linearGradient2"
        id="createimage_btn"
        @click="handleAddImg"
      >
        <em class="new_icon" />
        {{ $t('system.imageMgmt.tip.newImg') }}
      </el-button>
    </div>
    <ul class="list_top clear">
      <li
        @click="activeName='container'"
        :class="{'container_active':activeName==='container','container_default':activeName==='vm'}"
      >
        <span>
          <em class="image_container" />容器
        </span>
      </li>
      <li
        @click="activeName='vm'"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span>
          <em class="image_vm" />虚拟机
        </span>
      </li>
      <li
        class="last_li"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span />
      </li>
    </ul>
    <div
      class="container_div"
      :class="{'vm_div':activeName==='vm'}"
    >
      <ContainerImage v-show="activeName==='container'" />
      <VMImage
        v-show="activeName==='vm'"
        ref="VMImage"
      />
    </div>
    <EditImage
      v-model="showEditImageDlg"
      :image-data="currentImageData"
      @cancelEditImageDlg="cancelEditImageDlg"
      @processEditImageSuccess="processEditImageSuccess"
    />
  </div>
</template>
<script>
import ContainerImage from './ContainerImage.vue'
import VMImage from './VMImage.vue'
import EditImage from './EditImage.vue'
import { common } from '../../../tools/common.js'

export default {
  name: 'ImageMgmt',
  components: {
    ContainerImage, VMImage, EditImage
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      // isAdmin: false,
      dataLoading: false,
      searchCondition: {
        systemName: '',
        operateSystem: '',
        status: 'All',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      sortCtrl: {
        sortBy: 'createTime',
        sortOrder: 'DESC'
      },
      imageListData: [],

      imageType: 'All',
      imageTypeOptionList: [],
      statusOptionList: [],

      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      activeName: 'vm'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.initOptionList()
    }
  },
  mounted () {
    this.setDivHeight()
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'image_div', 261)
    },
    handleAddImg () {
      this.currentImageData = {}
      this.showEditImageDlg = true
    },
    cancelEditImageDlg () {
      this.showEditImageDlg = false
    },
    processEditImageSuccess () {
      this.showEditImageDlg = false
      this.$refs.VMImage.getImageDataList()
    }
  }
}
</script>
<style lang="less">
.image_div{
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../../../assets/images/work_new_project.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
  .list_top{
    li{
      float: left;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      span{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        font-size: 20px;
        color: #fff;
        transition: all 0.5s;
      }
    }
    em{
      display: inline-block;
      width: 19px;
      height: 22px;
      position: relative;
      top: 4px;
      margin-right: 10px;
    }
    .image_container{
      background: url('../../../assets/images/system_image_container.png');
    }
    .image_vm{
      background: url('../../../assets/images/system_image_vm.png');
    }
    .container_active .image_container{
      background: url('../../../assets/images/system_image_container_active.png');
    }
    .vm_active .image_vm{
      background: url('../../../assets/images/system_image_vm_active.png');
    }
    .container_active{
      background: #d4d1ec;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .vm_default{
      background: #fff;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 0 16px 0 16px;
        transition: all 0.5s;
      }
    }
    .last_li.vm_default{
      background: #d4d1ec;
      span{
        background: #f5f6f8;
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .container_default{
      background: #fff;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 16px 0 16px 0;
        transition: all 0.5s;
      }
    }
    .vm_active{
      background: #d4d1ec;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .last_li.vm_active{
      background: #fff;
      span{
        background: #f5f6f8;
        border-radius: 0 0 0 16px;
      }
    }
  }
  .container_div{
    background: #fff;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
  }
  .vm_div{
    background: #d4d1ec;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
  }
}
</style>
