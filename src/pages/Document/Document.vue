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
  <div class="doc_div">
    <div class="padding_default">
      <div class="title_top title_left defaultFontBlod">
        {{ $t('nav.docs') }}
        <span class="line_bot1" />
      </div>
      <div
        class="docs_content clear"
        ref="listTree"
      >
        <div
          :class="{'doc_left':language==='cn','doc_left_en':language==='en','scroll_top':scrollTop}"
        >
          <ul class="group_list">
            <li
              v-for="(item,index) in docList"
              :key="index"
              @click="handleClick(item,index)"
              @mouseenter="groupListHover(index)"
              @mouseleave="groupListLeave(index)"
            >
              <div
                class="li_list"
                :class="{'select':selectIndex===index,'li_list_en':language==='en'}"
              >
                <img
                  :src="item.icon"
                  alt=""
                  :class="{'icon_default':selectIndex!==index && activeIndex!==index}"
                >
                <img
                  :src="item.iconSelect"
                  alt=""
                  class="icon_show"
                  :class="{'icon_select':selectIndex===index || activeIndex===index}"
                >
                {{ language==='cn'?item.title:item.titleEn }}
              </div>
            </li>
            <div
              class="select_style"
              :class="{'select_style_en':language==='en','select_style_nobg':hideBg}"
            />
          </ul>
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
            preview-background="#f6f5f8"
          />
        </div>
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
          icon: require('../../assets/images/docs_left_icon_overview.png'),
          iconSelect: require('../../assets/images/docs_left_icon_overview_select.png'),
          docUrl: './Overview.md',
          docUrlEn: './OverviewEn.md'
        },
        {
          title: '能力中心',
          titleEn: 'Capability Center',
          icon: require('../../assets/images/docs_left_icon_capability.png'),
          iconSelect: require('../../assets/images/docs_left_icon_capability_select.png'),
          docUrl: './mep-Introduction.md',
          docUrlEn: './mep-IntroductionEn.md'
        },
        {
          title: '开发工具',
          titleEn: 'Developer Tool',
          icon: require('../../assets/images/docs_left_icon_tool.png'),
          iconSelect: require('../../assets/images/docs_left_icon_tool_select.png'),
          docUrl: './developer_tool.md',
          docUrlEn: './developer_toolEn.md'
        },
        {
          title: '开发指导',
          titleEn: 'Developer Guidance',
          icon: require('../../assets/images/docs_left_icon_guidance.png'),
          iconSelect: require('../../assets/images/docs_left_icon_guidance_select.png'),
          docUrl: './developer_guidance.md',
          docUrlEn: './developer_guidanceEn.md'
        },
        {
          title: '常见问题',
          titleEn: 'Common Problem',
          icon: require('../../assets/images/docs_left_icon_faq.png'),
          iconSelect: require('../../assets/images/docs_left_icon_faq_select.png'),
          docUrl: './common_problem.md',
          docUrlEn: './common_problemEn.md'
        }
      ],
      markdownSource: '',
      docsUrl: './Overview.md',
      activeIndex: 0,
      selectIndex: 0,
      scrollTop: false,
      hideBg: true
    }
  },
  methods: {
    handleClick (data, index) {
      document.documentElement.scrollTop = 0
      this.selectIndex = index
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
    },
    groupListHover (index) {
      if (this.selectIndex !== index) {
        this.hideBg = false
      } else {
        this.hideBg = true
      }
      this.activeIndex = index
      let oDiv = document.getElementsByClassName('select_style')
      oDiv[0].style.top = (58 * index + 5) + 'px'
    },
    groupListLeave (index) {
      this.hideBg = true
      this.activeIndex = -1
      let oDiv = document.getElementsByClassName('select_style')
      oDiv[0].style.top = (58 * this.selectIndex + 5) + 'px'
    },
    getTreeTop () {
      let treeTop = this.$refs.listTree.getBoundingClientRect().top
      if (treeTop < 64) {
        this.scrollTop = true
      } else {
        this.scrollTop = false
      }
    },
    getDocUrl () {
      if (this.language === 'cn') {
        this.docsUrl = this.docList[this.selectIndex].docUrl
      } else {
        this.docsUrl = this.docList[this.selectIndex].docUrlEn
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getDocUrl()
      this.getMarkDown(this.docsUrl)
    }
  },
  mounted () {
    this.getDocUrl()
    this.getMarkDown(this.docsUrl)
    window.addEventListener('scroll', this.getTreeTop, true)
    window.onresize = () => {
      return (() => {
        this.getTreeTop()
      })()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getTreeTop, true)
  }
}
</script>

<style lang="less">
.doc_div{
  background: url('../../assets/images/docs_bg.png') right 70px no-repeat;
  .docs_content{
    background: #fbfbfb;
    padding: 50px;
    border-radius: 20px;
  }
  .doc_left.scroll_top,.doc_left_en.scroll_top{
    position: fixed;
    top: 110px;
  }
  .doc_left,.doc_left_en{
    float: left;
    width: 290px;
    margin-right: 20px;
    font-size: 20px;
    color: #c9c5d0;
    position: relative;
    li{
      height: 58px;
      line-height: 48px;
      padding: 5px 0;
      cursor: pointer;
      position: relative;
      z-index: 2;
      display: inline-block;
      .li_list{
        width: 175px;
        height: 48px;
        line-height: 48px;
        padding: 0 15px 0 50px;
      }
      .li_list.li_list_en{
        width: 270px;
      }
      .li_list.select,.li_list:hover{
        color: #380879;
        transition: all 1s;
      }
      .li_list.select{
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
      }
      img{
        position: absolute;
        top: 18px;
        left: 15px;
      }
      img.icon_default{
        opacity: 1;
        transition: all 1s;
      }
      img.icon_show{
        opacity: 0;
      }
      img.icon_select{
        opacity: 1;
        transition: all 1s;
      }
    }
    .select_style{
      width: 175px;
      height: 48px;
      z-index: 1;
      position: absolute;
      top: 5px;
      left: 0;
      transition: all 0.2s ease;
      background: #fdfcff;
      border-radius: 8px;
      color: #380879;
      box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
    }
    .select_style.select_style_en{
      width: 270px;
    }
    .select_style.select_style_nobg{
      box-shadow: none;
    }
  }
  .doc_right{
    float: right;
    width: calc(100% - 310px);
    .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
      border-radius: 16px;
      box-shadow: 4px 4px 25px 5px rgba(36, 20, 119, 0.1) inset;
      padding: 10px 30px 15px;
    }
    .markdown-body{
      min-height: 650px;
    }
  }
}
</style>
