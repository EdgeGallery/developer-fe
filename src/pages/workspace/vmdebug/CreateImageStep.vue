<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="create_image">
    <p>
      {{ $t('workspace.deployDebugVm.createImageText') }}
      <el-button
        type="primary"
        plain
        class="create_image_btn"
        @click="createVmImage"
        :disabled="imageList.length>0"
      >
        {{ $t('workspace.deployDebugVm.generate') }}
      </el-button>
    </p>
    <el-card class="image_list">
      <div
        slot="header"
        class="list_header clear"
      >
        <span class="span_vm">{{ $t('workspace.deployDebugVm.vmName') }}</span>
        <span class="span_image">{{ $t('workspace.imagename') }}</span>
        <span class="span_progress">{{ $t('workspace.deployDebugVm.stageStatus') }}</span>
        <span class="span_status">{{ $t('workspace.deployDebugVm.vmStatusLbl') }}</span>
        <span class="span_operation">{{ $t('workspace.operation') }}</span>
      </div>
      <div
        class="nodata"
        v-show="imageList.length===0"
      >
        {{ $t('api.noDataNotice') }}
      </div>
      <div
        v-show="imageList.length>0"
        class="list_div clear"
        v-for="(item,index) in imageList"
        :key="index"
      >
        <span class="span_vm lt">
          <em
            v-if="item.status==='CREATING'"
            class="el-icon-loading"
          />{{ item.vmName }}</span>
        <span
          class="span_image lt"
          :title="item.imageName"
        >
          <em
            v-if="item.status==='CREATING'"
            class="el-icon-loading"
          />{{ item.imageName }}</span>
        <span
          class="span_progress lt"
          :title="item.log"
        >
          <em
            v-if="item.status==='CREATING'"
            class="el-icon-loading deploying icon"
          />
          <em
            v-if="item.status==='SUCCESS'"
            class="el-icon-success success icon"
          />{{ item.log }}
        </span>
        <span class="span_status lt">
          <em
            v-if="item.status==='CREATING'"
            class="el-icon-loading deploying icon"
          />
          <em
            v-if="item.status==='FAILED'"
            class="el-icon-error error icon"
          />
          <em
            v-if="item.status==='SUCCESS'"
            class="el-icon-success success icon"
          />{{ item.status }}</span>
        <span class="span_operation lt">
          <el-button
            type="text"
            size="mini"
            @click="downloadVmImage(item.vmId)"
            :disabled="item.status==='CREATING'"
          >{{ $t('common.download') }}</el-button>
          <el-button
            type="text"
            size="mini"
            @click="deleteVmImage"
            :disabled="item.status==='CREATING'"
          >{{ $t('workspace.deployDebugVm.deleteBtnLbl') }}</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
export default {
  name: 'CreateVMImageStep',

  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID') || '',
      imageList: [],
      interval: null
    }
  },
  methods: {
    // 生成镜像
    createVmImage () {
      vmService.createVmImageApi(this.projectId, this.userId).then(res => {
        this.interval = setInterval(() => {
          this.getCreateImageList()
        }, 5000)
        if (res.data) {
          this.getCreateImageList()
        }
      })
    },
    // 获取镜像
    getCreateImageList () {
      this.imageList = []
      vmService.getCreateImageListApi(this.projectId, this.userId).then(res => {
        if (res.data === '') {
          this.clearInterval()
        } else {
          this.imageList.push(res.data)
          if (res.data.status !== 'CREATING') {
            this.clearInterval()
          }
        }
      })
    },
    // 删除镜像
    deleteVmImage () {
      this.$confirm(this.$t('devTools.deleteProject'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        vmService.deleteVmImageApi(this.projectId, this.userId).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('devTools.deleteSucc')
          })
          this.getCreateImageList()
        }).catch(() => {
          this.$message.error({
            message: this.$t('devTools.deleteFail')
          })
        })
      })
    },
    // 下载镜像
    downloadVmImage (vmId) {
      vmService.downloadVmImageApi(this.projectId, vmId, this.userId)
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    }
  },
  mounted () {
    this.getCreateImageList()
    this.interval = setInterval(() => {
      this.getCreateImageList()
    }, 5000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang="less">
.create_image{
  .create_image_btn{
    margin-left: 10px;
  }
  .image_list{
    overflow: auto;
    margin-top: 20px;
    .el-card__header{
      padding: 10px 20px;
      min-width: 715px;
    }
    .el-card__body{
      min-width: 715px;
      min-height: 56px;
      font-size: 14px;
      padding: 30px 20px;
    }
    .nodata{
      text-align: center;
    }
    .list_header{
      span{
        float: left;
      }
    }
    span.lt{
      cursor: default;
    }
    span{
      display: inline-block;
      line-height: 25px;
      em.icon{
        margin-right: 5px;
      }
    }
    span.span_stage_status{
      width: 100%;
      margin-bottom: 5px;
      em{
        font-style: normal;
        display: inline-block;
        width: 110px;
        color: #adb0b8;
      }
    }
    .span_vm{
      width: 20%;
      min-width: 120px;
    }
    .span_image{
      width: 20%;
      min-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .span_progress{
      width: 29%;
      margin-right: 1%;
      min-width: 180px;
      .el-progress{
        width: 80%;
      }
    }
    .span_progress.lt{
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
      display: -webkit-box;
      line-clamp:2;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
    }
    .span_status{
      width: 15%;
      min-width: 100px;
    }
    .span_operation{
      width: 15%;
      min-width: 100px;
    }
  }
}
</style>
