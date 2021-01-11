<template>
  <el-row class="operator-area">
    <el-col :span="12">
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
    </el-col>
    <el-col :span="12">
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
    }
  },
  computed: {},
  watch: {},
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
</style>
