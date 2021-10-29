<template>
  <div class="new-project">
    <h3 class="common-dlg-title">
      项目信息
    </h3>
    <div>
      <el-form
        :model="projectFormData"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="应用名称"
          class="cb"
        >
          <el-input v-model="projectFormData.name" />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="projectFormData.version" />
        </el-form-item>
        <el-form-item
          label="提供者"
          class="label-item-half"
        >
          <el-input v-model="projectFormData.provider" />
        </el-form-item>
        <el-form-item
          label="负载类型"
          class="label-item-half"
        >
          <el-select
            v-model="projectFormData.loadType"
            placeholder="请选择负载类型"
          >
            <el-option
              label="类型一"
              value="1"
            />
            <el-option
              label="类型二"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="架构"
          class="label-item-half"
        >
          <el-input v-model="projectFormData.arctecture" />
        </el-form-item>
        <el-form-item
          label="行业"
          class="label-item-half"
        >
          <el-input v-model="projectFormData.indusry" />
        </el-form-item>
        <el-form-item
          label="类型"
          class="label-item-half"
        >
          <el-input v-model="projectFormData.type" />
        </el-form-item>
        <el-form-item
          label="描述"
          class="cb"
        >
          <el-input
            v-model="projectFormData.desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
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
      projectFormData: {}
    }
  },
  methods: {
    confirmToCreate () {
      this.$emit('createNewProject', false)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>

</style>
