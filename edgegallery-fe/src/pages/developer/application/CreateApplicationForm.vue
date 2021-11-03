<template>
  <div class="new-application">
    <h3 class="common-dlg-title lt">
      项目信息
    </h3>
    <div>
      <el-form
        :model="applicationFormData"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="应用名称"
          class="cb"
        >
          <el-input v-model="applicationFormData.name" />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.version" />
        </el-form-item>
        <el-form-item
          label="提供者"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.provider" />
        </el-form-item>
        <el-form-item
          label="负载类型"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.loadType"
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
          <el-input v-model="applicationFormData.arctecture" />
        </el-form-item>
        <el-form-item
          label="行业"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.indusry" />
        </el-form-item>
        <el-form-item
          label="类型"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.type" />
        </el-form-item>
        <el-form-item
          label="描述"
          class="cb"
        >
          <el-input
            v-model="applicationFormData.desc"
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
      <el-button
        class="common-cancel-btn rt"
        @click="confirmToCreate()"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProComp',
  data () {
    return {
      applicationFormData: {}
    }
  },
  methods: {
    confirmToCreate () {
      sessionStorage.setItem('currentFlow', 1)
      this.$router.push('/EG/developer/home')
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>

</style>
