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
  <div class="doc_div padding_default">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.docs') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="clear">
      <div :class="['doc_left',language==='en'?'doc_left_en':'']">
        <p
          v-for="(item,index) in docList"
          :key="index"
          @click="handleClick(item)"
          :class="{'active':activeName===item.titleEn}"
        >
          <em :class="activeName===item.titleEn?`list_active_`+index:`list_`+index" />{{ language==='cn'?item.title:item.titleEn }}
        </p>
      </div>
      <div class="doc_right">
        <el-backtop target=".el-main" />
        <mavon-editor
          v-model="markdownSource"
          :toolbars-flag="false"
          :editable="false"
          :subfield="false"
          default-open="preview"
          :box-shadow="false"
          preview-background="#ffffff"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      language: localStorage.getItem('language'),
      docList: [
        {
          title: '概述',
          titleEn: 'OverView',
          docUrl: './Overview.md',
          docUrlEn: './Overview.md'
        },
        {
          title: '能力中心',
          titleEn: 'Capability Center',
          docUrl: './mep-Introduction.md',
          docUrlEn: './mep-Introduction.md'
        },
        {
          title: '开发工具',
          titleEn: 'Developer Tool',
          docUrl: './developer_tool.md',
          docUrlEn: './developer_tool.md'
        },
        {
          title: '开发指导',
          titleEn: 'Developer Guidance',
          docUrl: './developer_guidance.md',
          docUrlEn: './developer_guidance.md'
        },
        {
          title: '常见问题',
          titleEn: 'Common Problem',
          docUrl: './common_problem.md',
          docUrlEn: './common_problem.md'
        }
      ],
      activeName: 'OverView',
      markdownSource: '',
      docsUrl: './Overview.md',
      docHandleData: {}
    }
  },
  methods: {
    handleClick (data) {
      this.docHandleData = data
      this.activeName = data.titleEn
      if (this.language === 'cn') {
        this.docsUrl = data.docUrl
      } else {
        this.docsUrl = data.docUrlEn
      }
      this.getMarkDown(this.docsUrl)
    },
    getMarkDown (docsUrl) {
      axios(docsUrl).then(res => {
        this.markdownSource = res.data
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.handleClick(this.docHandleData)
    }
  },
  mounted () {
    this.docHandleData = this.docList[0]
    this.getMarkDown(this.docsUrl)
  }
}
</script>

<style lang="less">
.doc_div{
  .doc_left{
    float: left;
    width: 215px;
    margin-right: 20px;
    p{
      height: 50px;
      line-height: 50px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 13px;
      text-align: center;
      cursor: pointer;
    }
    p:hover{
      color: #688ef3;
    }
    p.active{
      background: #688ef3;
      color: #fff;
    }
    em{
      display: inline-block;
      width: 20px;
      height: 20px;
      position: relative;
      top: 3px;
      right: 15px;
    }
    .list_0{
      background: url('../../assets/images/plugin_devdoc_icon1.png') no-repeat;
      background-size: contain;
    }
    .list_active_0{
      background: url('../../assets/images/plugin_devdoc_icon1_active.png') no-repeat;
      background-size: contain;
    }
    .list_1{
      background: url('../../assets/images/plugin_devdoc_icon2.png') no-repeat;
      background-size: contain;
    }
    .list_active_1{
      background: url('../../assets/images/plugin_devdoc_icon2_active.png') no-repeat;
      background-size: contain;
    }
    .list_2{
      background: url('../../assets/images/plugin_devdoc_icon3.png') no-repeat;
      background-size: contain;
    }
    .list_active_2{
      background: url('../../assets/images/plugin_devdoc_icon3_active.png') no-repeat;
      background-size: contain;
    }
    .list_3{
      background: url('../../assets/images/plugin_devdoc_icon4.png') no-repeat;
      background-size: contain;
    }
    .list_active_3{
      background: url('../../assets/images/plugin_devdoc_icon4_active.png') no-repeat;
      background-size: contain;
    }
    .list_4{
      background: url('../../assets/images/plugin_devdoc_icon5.png') no-repeat;
      background-size: contain;
    }
    .list_active_4{
      background: url('../../assets/images/plugin_devdoc_icon5_active.png') no-repeat;
      background-size: contain;
    }
  }
  .doc_left_en{
    p{
      text-align: left;
      padding-left: 35px;
    }
  }
  .doc_right{
    float: right;
    width: calc(100% - 235px);
    background: #fff;
    padding: 30px;
  }
}
</style>
