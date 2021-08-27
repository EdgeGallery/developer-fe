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
  <div class="work-progress">
    <el-progress
      :class="[language === 'cn' ? 'cn' : 'en']"
      :stroke-width="10"
      :percentage="progressBarProcess"
    />
    <div
      class="label-wrapper"
      :class="[language === 'cn' ? 'cn' : 'en']"
    >
      <p
        v-for="(item, index) in labelList"
        :key="item"
        class="label__item"
      >
        <i
          v-if="statusList[index] === 0"
          class="label__icon el-icon-loading"
        />
        <i
          v-if="statusList[index] === 1"
          class="label__icon el-icon-success"
          style="color:#3ac372"
        />
        <i
          v-if="statusList[index] === 2"
          class="label__icon el-icon-error"
          style="color:#f23d3d"
        />
        <span class="label__text">{{ item }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data () {
    return {
      statusList: []
    }
  },
  props: {
    progressBarProcess: {
      type: Number,
      default: 0
    },
    labelList: {
      type: Array,
      default: () => [
        '生成部署文件',
        '分配测试节点',
        '实例化应用',
        '获取部署状态'
      ]
    },
    language: {
      type: String,
      default: 'cn'
    },
    stageStatus: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    /**
     * Update statusList by this.stageStatus, 0 for processing item, 1 for success item,
     * and 2 for failed item.
     */
    updateStageStatus () {
      if (this.stageStatus === null) {
        this.statusList = [0, 0, 0, 0]
        return
      }

      let _index = 0
      let _failedFlag = false
      for (let key in this.stageStatus) {
        if (_failedFlag) {
          this.$set(this.statusList, _index, 2)
          continue
        }

        if (this.stageStatus[key] === null) {
          this.$set(this.statusList, _index, 0)
        } else if (this.stageStatus[key] === 'Success') {
          this.$set(this.statusList, _index, 1)
        } else if (this.stageStatus[key] === 'Failed') {
          this.$set(this.statusList, _index, 2)
          _failedFlag = true
        }
        _index += 1
      }
    }
  },
  watch: {
    stageStatus: {
      handler: function (newVal) {
        this.stageStatus = newVal
        this.updateStageStatus()
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.updateStageStatus()
  }
}
</script>

<style>
/* style for progress-bar */
.work-progress {
  margin-top: 40px;
}

.work-progress .el-progress-bar__inner {
  background-color: #5844be;
}

.work-progress .cn .el-progress-bar__outer {
  width: 510px;
  background-color: #e2e0ea;
}

.work-progress .en .el-progress-bar__outer {
  width: 710px;
  background-color: #e2e0ea;
}

.work-progress .el-progress__text {
  display: none;
}

.work-progress .cn.label-wrapper {
  text-align: left;
  width: 540px;
}

.work-progress .en.label-wrapper {
  text-align: left;
  width: 740px;
}

.work-progress .cn .label__item {
  display: inline-block;
  list-style: disc;
  margin-top: 10px;
  width: calc(540px / 4);
  color: #380879;
  font-size: 14px;
  font-family: defaultFontLight;
}

.work-progress .en .label__item {
  display: inline-block;
  list-style: disc;
  margin-top: 10px;
  width: calc(740px / 4);
  color: #380879;
  font-size: 14px;
  font-family: defaultFontLight;
}

.label__text {
  margin-left: 5px;
}
</style>
