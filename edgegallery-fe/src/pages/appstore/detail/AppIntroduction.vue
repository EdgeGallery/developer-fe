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
  <div class="appIntroduction">
    <div v-if="showDetails==='show'">
      <mavon-editor
        v-model="source"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        default-open="preview"
        :box-shadow="false"
        preview-background="#fff"
      />
    </div>
    <div
      class="detail-tip"
      v-else
    >
      <img
        class="detail-tip-img"
        src="../../../assets/images/appstore/app_detail_info_icon.png"
        alt=""
      >
      <p class="detail-tip-text defaultFontLight">
        {{ $t('store.introductionTip') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppIntroduction',
  props: {
    source: {
      required: true,
      type: String
    },
    showDetails: {
      required: true,
      type: String
    }
  }
}
</script>
<style lang="less">
.appIntroduction {
  margin: auto;
  border-radius: 16px;
  .detail-tip{
    width: 320px;
    margin: 100px auto;
    .detail-tip-text{
      text-align: center;
    }
  }
  .markdown-body{
    background: rgba(46, 26, 124,0.1);
    color: #fff;
    font-family: defaultFontLight,
     Arial,
     Helvetica,
     sans-serif !important;
  }
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    width: 100%;
    height: 410px;
  }
   .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
    background: none !important;
    padding: 40px;
  }
}
</style>
