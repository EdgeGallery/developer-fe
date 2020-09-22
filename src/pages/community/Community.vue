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
  <div class="developer">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.mecOpenSourceEcology') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="apply-tap">
      <h2>{{ $t('mecOpen.mecOpen') }}</h2>
      <p>
        {{ $t('mecOpen.info') }}
      </p>
    </div>
    <div class="main-content">
      <div class="main-content-left">
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </div>
      <div class="main-content-right">
        <h5>{{ $t('mecOpen.contribution') }}</h5>
        <div class="ranking">
          <ul class="normal-list">
            <li
              class="normal-part-right"
              v-for="itemRank in rankList"
              :key="itemRank.id"
            >
              <div class="el-icon-medal-1 lt" />
              <div class="lt img">
                <img
                  src="../../assets/images/icon1.png"
                  alt=""
                >
              </div>
              <div class="lt detail">
                <p class="name">
                  {{ itemRank.name }}
                </p>
                <p>{{ $t('mecOpen.code') }}: {{ itemRank.lines }} {{ $t('mecOpen.lines') }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Developer',
  data () {
    return {
      rankList: [
        {
          id: 1,
          name: 'George',
          lines: 2156
        },
        {
          id: 2,
          name: 'Antonio',
          lines: 2067
        }, {
          id: 3,
          name: 'Mark',
          lines: 1968
        }, {
          id: 4,
          name: 'Kerwin',
          lines: 1852
        }, {
          id: 5,
          name: 'James',
          lines: 1632
        }, {
          id: 6,
          name: 'Edward',
          lines: 1268
        }
      ],
      source: ''
    }
  },
  mounted () {
    let url = './MECOPEN.md'
    axios(url).then(res => {
      this.source = res.data
    })
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.developer{
  .apply-tap{
    h2{
      padding:20px 0;
    }
    p{
      line-height:30px;
      padding-right:25px;
      font-size: 14px;
    }
  }
  .main-content{
    margin-top:30px;
  }
  .main-content-left{
    float: left;
    width: 65%;
    position: relative;
  }
  .main-content-right{
    float: right;
    width: 30%;
  }
  .normal-part{
    height:220px;
    margin-bottom:30px;
    .normal-part-left{
      padding:10px;
      height:100%;
      h3{
        padding:0 15px 20px 15px;
        span{
          font-size: 12px;
          color:#409EFF;
          a{
            color:#409EFF;
          }
        }
      }
      p{
        padding:0 6% 0 15px;
        line-height:24px;
        text-align: justify;
      }
    }
    .normal-part-right{
      padding:10px;
      height:100%;
      h5{
        padding-bottom:15px;
      }
    }
  }
}
.rt{
  font-size: 12px;
  color:#409EFF;
  position: absolute;
  right: 0;
  top: 12px;
  z-index: 99;
  a{
    color:#409EFF;
  }
}
.ranking{
  padding-top: 15px;
  .normal-list>li{
    height:50px;
    line-height: 45px;
    margin-top: 15px;
    .img{
      height:45px;
    }
    img{
      height:40px;
      margin-right:15px;
    }
    .el-icon-medal-1{
      line-height:40px;
      font-size: 25px;
      margin-right:5px;
    }
    .detail{
      p{
        line-height:20px;
        font-size:12px;
      }
      .name{
        color:#409EFF;
      }
    }
  }
}
.checkRanking{
  font-size: 12px;
  padding:10px 10% 0 0;
  a{
    color:#409EFF;
  }
}
.editormd-html-preview, .editormd-preview-container{ margin: 0;}
</style>
