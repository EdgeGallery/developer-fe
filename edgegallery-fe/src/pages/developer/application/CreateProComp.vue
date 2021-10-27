<template>
  <div class="new-pro">
    <h3 class="pro-title">
      项目信息
    </h3>
    <div>
      <el-form
        :model="proFormData"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="应用名称"
          class="cb"
        >
          <el-input v-model="proFormData.name" />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="proFormData.version" />
        </el-form-item>
        <el-form-item
          label="提供者"
          class="label-item-half"
        >
          <el-input v-model="proFormData.provider" />
        </el-form-item>
        <el-form-item
          label="负载类型"
          class="label-item-half"
        >
          <el-select
            v-model="proFormData.loadType"
            placeholder="请选择活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="架构"
          class="label-item-half"
        >
          <el-input v-model="proFormData.arctecture" />
        </el-form-item>
        <el-form-item
          label="行业"
          class="label-item-half"
        >
          <el-input v-model="proFormData.indusry" />
        </el-form-item>
        <el-form-item
          label="类型"
          class="label-item-half"
        >
          <el-input v-model="proFormData.type" />
        </el-form-item>
        <el-form-item
          label="描述"
          class="cb"
        >
          <el-input v-model="proFormData.desc" />
        </el-form-item>
      </el-form>
      <el-button
        class="common-btn rt"
        @click="confirmToCreate()"
      >
        完成
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProComp',
  data () {
    return {
      proFormData: {}
    }
  },
  methods: {
    confirmToCreate () {
      this.$emit('createNewPro', false)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .label-item-half{
    float: left;
    width: 50%;
    .el-form-item__content{
      width: calc(100% - 100px);
    }
    .el-select{
      width: 100%;
    }
  }
  .pro-title{
    font-weight: normal;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .pro-title:before{
    display: inline-block;
    content: '';
    width: 9px;
    height: 9px;
    background: #76E1E9;
    border-radius: 50%;
    position: relative;
    top: -2px;
  }
</style>
