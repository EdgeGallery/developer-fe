<template>
  <div
    class="common-div-bg capability-publish"
  >
    <h3 class="common-dlg-title">
      基本信息
    </h3>
    <div>
      <el-form
        :model="capFormData"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="二级能力"
          class="cb"
        >
          <el-input v-model="capFormData.second" />
        </el-form-item>
        <el-form-item
          label="一级能力"
        >
          <el-input v-model="capFormData.first" />
        </el-form-item>
        <el-form-item
          label="描述"
        >
          <el-input
            v-model="capFormData.desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          label="API定义文件"
          class="label-item-half"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <span class="cap-upload-btn">
              API定义文件
            </span>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="说明文档"
          class="label-item-half"
        >
          <span
            class="cap-upload-btn cp"
            @click="getDoc()"
          >
            说明文档
          </span>
        </el-form-item>
        <el-form-item
          label="图片"
          class="label-item-half"
        >
          <img
            src="../../../assets/images/capability/capability_default_img.png"
            alt="default_capability"
          >
        </el-form-item>
        <el-form-item
          label="自定义图片"
          class="label-item-half"
        >
          <img
            src="../../../assets/images/capability/capability_default_img.png"
            alt="default_capability"
          >
        </el-form-item>
        <h3 class="common-dlg-title">
          注册信息
        </h3>
        <el-form-item
          label="服务名称"
          class="label-item-half"
        >
          <el-input v-model="capFormData.desc" />
        </el-form-item>
        <el-form-item
          label="内部端口号"
          class="label-item-half"
        >
          <el-input v-model="capFormData.desc" />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="capFormData.desc" />
        </el-form-item>
        <el-form-item
          label="协议"
          class="label-item-half"
        >
          <el-input v-model="capFormData.desc" />
        </el-form-item>
        <el-form-item
          label="在线体验URL"
          class="cb"
        >
          <el-input v-model="capFormData.desc" />
        </el-form-item>
        <!-- <el-form-item
          label="流量规则"
        />
        <el-form-item
          label="DNS规则"
        /> -->
      </el-form>
      <el-button
        class="common-btn rt"
        @click="confirmToChoose()"
      >
        完成
      </el-button>
      <el-button
        class="common-cancel-btn rt"
        @click="confirmToChoose()"
      >
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CapCenter',
  data () {
    return {
      capFormData: {}
    }
  },
  methods: {
    confirmToChoose () {
      this.$router.push('/EG/developer/capabilityCenter')
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .capability-publish{
    position: absolute;
    top: 9%;
    left: 35%;
    width: 35%;
    padding: 35px;
  }
  .cap-upload-btn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 25px;
    font-size: 14px;
    border-radius: 12px;
    background: rgba(255,255,255,.3);
  }
</style>
