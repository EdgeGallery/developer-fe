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
        class="createimage_btn linearGradient2 image_mgmt"
        id="createimage_btn"
        @mouseenter.native="showImageType=true"
        @mouseleave.native="showImageType=false"
      >
        <em class="new_icon" />
        {{ $t('system.imageMgmt.tip.newImg') }}
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
              <em />{{ $t('workspace.containerImage') }}
            </div>
            <div
              class="transition-box"
              @click="selectAddType('vm')"
            >
              <em />{{ $t('workspace.vmImage') }}
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
          <em class="image_container" />{{ $t('workspace.containerImage') }}
        </span>
      </li>
      <li
        @click="activeName='vm'"
        :class="{'vm_active':activeName==='vm','vm_default':activeName==='container'}"
      >
        <span>
          <em class="image_vm" />{{ $t('workspace.vmImage') }}
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
      <ContainerImage
        v-show="activeName==='container'"
        ref="ContainerImage"
      />
      <VMImage
        v-show="activeName==='vm'"
        ref="VMImage"
      />
    </div>
    <EditContainerImage
      v-model="showEditContainerImageDlg"
      :image-data="currentImageData"
      @cancelEditImageDlg="cancelEditImageDlg"
      @processEditImageSuccess="processEditImageSuccess"
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
import EditContainerImage from './EditContainerImage.vue'
import EditImage from './EditImage.vue'
import { common } from '../../../tools/common.js'

export default {
  name: 'ImageMgmt',
  components: {
    ContainerImage, VMImage, EditContainerImage, EditImage
  },
  data () {
    return {
      showEditContainerImageDlg: false,
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
      common.setDivHeightFun(this.screenHeight, 'image_div', 261)
    },
    selectAddType (type) {
      if (type === 'container') {
        this.showEditContainerImageDlg = true
      } else {
        this.showEditImageDlg = true
      }
      this.currentImageData = {}
    },
    cancelEditImageDlg () {
      this.showEditImageDlg = false
    },
    processEditImageSuccess (type) {
      if (type === 'container') {
        this.activeName = 'container'
        this.$refs.ContainerImage.getImageDataList()
        this.showEditContainerImageDlg = false
      } else {
        this.activeName = 'vm'
        this.$refs.VMImage.getImageDataList()
        this.showEditImageDlg = false
      }
    }
  }
}
</script>
<style lang="less">
.image_div{
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: -20px;
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
  .system_up.el-icon-caret-top{
      color: #5b2ecd;
      position: absolute;
      right: 25px;
      top: 47px;
      z-index: 99999;
    }
  .down_div{
    width: 100%;
    position: absolute;
    right: 0;
    top: 60px;
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
    .last_li{
      cursor: default;
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
  .btn_div{
    position: absolute;
    right: 0;
    top: 18px;
    border-radius: 5px 5px 0 0;
    z-index: 2;
    .dropdown_list li{
      height: 25px;
      line-height: 25px;
      border-bottom: 1px solid #e7e7e7;
      background: #efefef;
      padding: 0 15px;
      color: #7a6e8a;
      position: relative;
      em{
        display: inline-block;
        width: 1px;
        position: absolute;
        top: 10px;
        left: 1px;
        transition:all 0.6s;
      }
    }
    .dropdown_list li:first-child{
      border-radius: 5px 5px 0 0;
    }
    .dropdown_list li:last-child{
      border-bottom: none;
      border-radius: 0 0 5px 5px;
    }
    .dropdown_list li:hover{
      color: #7a6e8a;
      em{
        background: #61cdd0;
        height: 7px;
        transform: scale(1,2);
      }
    }
    .dropdown_list li.disabled,.dropdown_list li.disabled:hover{
      color: #bcb9c1;
      cursor: default;
    }
  }
  .btn_div.el-icon-caret-top:before{
    color: #efefef;
    top: 5px;
    left: 10px;
    position: relative;
  }
}
</style>
