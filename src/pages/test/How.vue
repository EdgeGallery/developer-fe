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
  <div class="how">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/test/how' }">
        {{ $t('breadCrumb.test') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $t('breadCrumb.howToTest') }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="how_div">
      <div class="docs-tap">
        <h2>{{ $t('test.howToTest.howToTest') }}</h2>
        <p>
          <!-- <span class="lt">{{ $t('test.howToTest.updated') }}: 2019-09-06 10:34:49</span> -->
          <span class="rt">
            <span class="el-icon-edit"><a
              target="_blank"
              :href="editMarkdownUrl"
            >{{ $t('test.howToTest.modify') }}</a></span>
            <!-- <span class="el-icon-share">{{ $t('test.howToTest.share') }}</span> -->
          </span>
        </p>
      </div>
      <div id="test-editor">
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
      <div>
        <el-button
          type="primary"
          size="small"
          class="applyBtn"
          @click="pushTo"
        >
          {{ $t('test.howToTest.apply') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'How',
  computed: {
    ...mapState(['language'])
  },
  watch: {
    language (val) {
      this.getHowMarkDown(val)
      if (val === 'en') {
        this.markdownSource = './MECHOW_EN.md'
        this.editMarkdownUrl = 'https://github.com/EdgeGallery/developer-fe/blob/master/public/MECHOW_EN.md'
      } else {
        this.markdownSource = './MECHOW_CN.md'
        this.editMarkdownUrl = 'https://github.com/EdgeGallery/developer-fe/blob/master/public/MECHOW_CN.md'
      }
    }
  },
  data () {
    return {
      markdownSource: '',
      editMarkdownUrl: 'https://github.com/EdgeGallery/developer-fe/blob/master/public/MECHOW_CN.md'
    }
  },
  mounted () {
    this.getHowMarkDown(this.language)
  },
  methods: {
    getHowMarkDown (language) {
      let url = './MECHOW_EN.md'
      if (language === 'cn') {
        url = './MECHOW_CN.md'
      }
      axios(url).then(res => {
        this.markdownSource = res.data
      })
    },
    pushTo () {
      this.$router.push('/mecDeveloper/test/apply')
    }
  }
}
</script>

<style lang='less'>
.how{
  .how_div{
    background-color: #fff;
    padding: 40px;
    .docs-tap{
      p{
        padding:5px 0;
        font-size:14px;
        span.rt{
          // margin-right:12px;
          color:#409EFF;
          a{
            color:#409EFF;
          }
        }
      }
    }
    #test-editor{
      margin-top:20px;
      line-height: 30px;
    }
    h1{
      padding:15px 0;
    }
    .applyBtn{
      padding: 9px 15px;
      margin: 15px 0 0 0;
    }
  }
}
</style>
