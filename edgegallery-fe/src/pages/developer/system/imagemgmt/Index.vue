<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
  <div class="image_div padding-inner">
    <div class="system-title">
      {{ $t('devSystem.imageMgmt.systemImgMgmt') }}
      <el-button
        class="common-add-btn rt"
        id="createimage_btn"
        @mouseenter.native="showImageType=true"
        @mouseleave.native="showImageType=false"
      >
        {{ $t('devSystem.imageMgmt.tip.newImg') }}
        <em
          class="system_up el-icon-caret-top"
          v-show="showImageType"
        />
        <el-collapse-transition>
          <div
            v-show="showImageType"
            class="down_div"
            @mouseenter="showImageType=true"
            @mouseleave="showImageType=false"
          >
            <div
              class="transition-box"
              @click="selectAddType('container')"
            >
              <em />{{ $t('container.container') }}
            </div>
            <div
              class="transition-box"
              @click="selectAddType('vm')"
            >
              <em />{{ $t('sandbox.vm') }}
            </div>
          </div>
        </el-collapse-transition>
      </el-button>
    </div>
    <ul class="list_top clear">
      <li
        @click="activeName='container'"
        :class="{'container_active':activeName==='container','container_default':activeName==='vm'}"
      >
        <span>
          {{ $t('container.container') }}
        </span>
      </li>
      <li
        @click="activeName='vm'"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span>
          {{ $t('sandbox.vm') }}
        </span>
      </li>
    </ul>
    <div
      class="container_div common-div-bg"
      :class="{'vm_div':activeName==='vm'}"
    >
      <ContainerImage
        v-show="activeName==='container'"
        ref="ContainerImage"
      />
      <VMImage
        v-show="activeName==='vm'"
        ref="VMImage"
      />
    </div>
    <UploadContainerImage
      v-if="showUploadImageDlg"
      :show-dlg-prop="showUploadImageDlg"
      @processCloseUploadImageDlg="processCloseUploadImageDlg"
    />
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
import UploadContainerImage from './UploadContainerImage.vue'
import EditImage from './EditImage.vue'
import { common } from '@/tools/common.js'

export default {
  name: 'ImageMgmt',
  components: {
    ContainerImage, VMImage, UploadContainerImage, EditImage
  },
  data () {
    return {
      showUploadImageDlg: false,
      showEditImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      activeName: 'container',
      showImageType: false
    }
  },
  mounted () {
    this.setDivHeight()
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'container_div', 300)
    },
    selectAddType (type) {
      if (type === 'container') {
        this.showUploadImageDlg = true
      } else {
        this.showEditImageDlg = true
      }
      this.currentImageData = {}
    },
    cancelEditImageDlg () {
      this.showEditImageDlg = false
    },
    processEditImageSuccess () {
      this.activeName = 'vm'
      this.$refs.VMImage.getImageDataList()
      this.showEditImageDlg = false
    },
    processCloseUploadImageDlg () {
      this.activeName = 'container'
      this.showUploadImageDlg = false
      this.$refs.ContainerImage.getImageDataList()
    }
  }
}
</script>
<style lang="less">
.image_div{
  .system_up.el-icon-caret-top{
    color: #663ccf;
    position: absolute;
    right: 25px;
    top: 32px;
    z-index: 99999;
  }
  .common-add-btn span{
    position: relative;
  }
  .down_div{
    width: 100%;
    position: absolute;
    z-index: 2;
    right: 0;
    top: 45px;
    border-radius: 10px;
    font-size: 16px;
    color: #b793e9;
    background-image: linear-gradient(127deg, #4444d0, #6724cb);
    box-shadow:0px -20px 15px -15px rgba(94,64,200,0.6),
               0px 30px 30px -15px rgba(94,64,200,0.6);
    .transition-box{
      height: 40px;
      line-height: 40px;
      position: relative;
      z-index: 2;
      em{
        display: inline-block;
        width: 3px;
        border-radius: 1.5px;
        position: absolute;
        top: 16px;
        left: 4px;
        transition:all 0.6s;
      }
    }
    .transition-box:last-child{
      border-top: 1px solid #4215c8;
    }
    .transition-box:hover{
      color: #fff;
      em{
        background: #a1a7e6;
        height: 8px;
        transform: scale(1,2);
      }
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
    .container_active{
      background: #4E3494;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #321985;
        border-radius: 16px 16px 0 0;
        color: #fff;
        transition: all 0.5s;
      }
    }
    .vm_default{
      background: #321985;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #4E3494;
        border-radius: 0 16px 0 16px;
        transition: all 0.5s;
      }
    }
    .container_default{
      background: #321985;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #4E3494;
        border-radius: 16px 0 16px 0;
        transition: all 0.5s;
      }
    }
    .vm_active{
      background: #4E3494;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #321985;
        border-radius: 16px 16px 0 0;
        color: #fff;
        transition: all 0.5s;
      }
    }
  }
  .container_div{
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .vm_div{
    transition: all 0.5s;
  }
  .default_dropdown.el-table,.default_dropdown.el-table .el-table__body-wrapper{
    overflow: visible;
  }
  .el-table.common-table .cell {
    overflow: visible;
  }
  .el-table.common-table .cell.el-tooltip{
    overflow: hidden;
  }
  .uploader-file-progress{
    background: #4929a9 !important;
  }
}
</style>
