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
  <el-row class="operator-area">
    <el-col :span="10">
      <div
        class="serviceSelctor"
        v-if="serviceList.length > 0"
      >
        <div class="selectLabel">
          {{ $t('api.serviceSelection') }}
        </div>
        <el-radio-group
          v-model="selectedService"
          @change="serviceSelectedChange"
          size="medium"
        >
          <el-radio-button
            v-for="item in serviceList"
            :key="item.service"
            :label="item.service"
          >
            {{ item.service }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div
        class="occupancy"
        v-else
      >
        occupancy
      </div>
    </el-col>
    <el-col :span="10">
      <span
        class="returnOper"
        @click="backToAbilityHome"
      >
        返回能力中心首页
      </span>
    </el-col>
  </el-row>
</template>

<script>

export default {
  components: {},
  props: {
    serviceList: {
      type: Array,
      default: () => []
    },
    selectedService: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectSer: ''
    }
  },
  computed: {},
  watch: {
  },
  methods: {
    backToAbilityHome () {
      this.$emit('showAbilityHomePage')
    },
    serviceSelectedChange (seletedLabel) {
      this.$emit('reloadContent', seletedLabel)
    }
  },
  created () {
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
.returnOper{
  float: right;
  color: #00a4ff;
  cursor: pointer;
}
.operator-area {
  margin: 20px 0px;
}
.serviceSelctor{
  width: 100%;
  .selectLabel{
    margin-bottom: 0.5rem;
  }
}
.occupancy{
  visibility: hidden;
}
</style>
