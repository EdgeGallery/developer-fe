<template>
  <div class="config-yaml">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item :label="$t('workspace.appimage')">
        <p
          v-for="item in form.appImage"
          :key="item.id"
        >
          <b style="margin: 0 5px;">{{ $t('workspace.imagename') }}:</b>
          {{ item.name }}: {{ item.version }}

          <b style="margin: 0 5px;">{{ $t('workspace.inPort') }}:</b>
          {{ item.port }}
          <b style="margin: 0 5px;">{{ $t('workspace.outPort') }}:</b>
          {{ item.nodePort }}
        </p>
      </el-form-item>
      <el-form-item :label="$t('workspace.addimage')">
        <el-select
          id="selectImage"
          v-model="form.image"
          :placeholder="$t('workspace.select')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        <el-input
          id="inputPort"
          v-model.number="form.imagePort"
          type="number"
          :placeholder="$t('workspace.port')"
        />
        <el-button
          id="addBtn"
          @click="addImage"
          class="addBtn"
        >
          {{ $t('workspace.add') }}
        </el-button>
        <p
          v-for="(item, index) in form.addImagesList"
          :key="index"
          class="imageResult"
        >
          <b>Image: &nbsp;&nbsp;&nbsp;</b>{{ item.name }} : {{ item.version }};&nbsp;&nbsp;
          <b>Port: &nbsp;&nbsp;&nbsp;</b>{{ item.port }}
          <i
            class="el-icon-close curp"
            @click="deleteImagesList(item, index)"
          />
        </p>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.service')"
        :rules="[{ required: true }]"
      >
        <el-input
          id="serviceName"
          v-model="form.serviceName"
          :placeholder="$t('workspace.servicename')"
          class="serviceName"
        />
        <el-input
          id="serviceHref"
          v-model="form.serviceHref"
          :placeholder="$t('workspace.href')"
        />
        <el-input
          id="servicePort"
          v-model.number="form.servicePort"
          type="number"
          :placeholder="$t('workspace.port')"
        />
        <!-- <el-button @click="addService" class="addBtn">{{$t('workspace.add')}}</el-button> -->
        <p
          v-for="(item, index) in form.addServiceList"
          :key="index"
          class="imageResult"
        >
          {{ item.serviceName }}:{{ item.serviceHref }} {{ item.servicePort }}
          <i
            class="el-icon-close curp"
            @click="deleteServiceList(index)"
          />
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Get, Post, Delete } from '../../tools/tool.js'
export default {
  name: 'ConfigYaml',
  props: {
    projectBeforeConfig: {
      type: Object,
      default () {
        return {
          agentConfig: {}
        }
      }
    }
  },
  data () {
    return {
      form: {
        appImage: [],
        image: '',
        imagePort: '',
        addImagesList: [],
        serviceName: '',
        serviceHref: '',
        servicePort: '',
        addServiceList: []
      },
      options: [{
        value: '1',
        label: 'postgre:9.6.15'
      }, {
        value: '2',
        label: 'redis: alpine'
      }],
      value: ''
    }
  },
  methods: {
    addImage () {
      if (this.form.imagePort && this.form.image) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let url = 'mec/developer/v1/projects/' + projectId + '/image'
        let params = {
          name: this.form.image.split(':')[0],
          version: this.form.image.split(':')[1],
          port: this.form.imagePort,
          projectId: projectId,
          type: ['OTHER']
        }
        Post(url, params).then(res => {
          this.form.addImagesList.push(res.data)
        })
      }
    },
    deleteImagesList (item, index) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image/' + item.id
      Delete(url).then(res => {
        this.getImage()
        this.form.addImagesList.splice(index, 1)
      })
    },
    addService () {
      if ((this.form.serviceName && this.form.serviceHref) && this.form.servicePort) {
        let obj = {
          serviceName: this.form.serviceName,
          serviceHref: this.form.serviceHref,
          servicePort: this.form.servicePort
        }
        this.form.addServiceList.push(obj)
        this.form.serviceName = ''
        this.form.serviceHref = ''
        this.form.servicePort = ''
      }
    },
    deleteServiceList (index) {
      this.form.addServiceList.splice(index, 1)
    },
    getImage (type) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image'
      Get(url).then(res => {
        if (type === 'get') {
          res.data.images.forEach(item => {
            if (item.type === 'OTHER') {
              this.form.addImagesList.push(item)
            } else {
              this.form.appImage.push(item)
            }
          })
        }
      })
    },
    ifNext () {
      let ifNext = false
      let form = this.form
      let serviceContent = form.serviceName && form.serviceHref && form.servicePort
      let imageIds = form.appImage.length || form.addImagesList.length
      if (serviceContent && imageIds) {
        ifNext = true
      } else {
        let type = 'warning'
        let message = ''
        if (!serviceContent) {
          message = this.$t('promptMessage.service')
        } else if (!imageIds) {
          message = this.$t('promptMessage.addImage')
        }
        this.$message({
          type, message
        })
      }
      return ifNext
    },
    emitStepData () {
      let ifNext = this.ifNext()
      if (ifNext) {
        this.form.appImage = [...this.form.appImage, ...this.form.addImagesList]
        let image = new Set(this.form.appImage)
        this.form.appImage = [...image]
        this.$emit('getStepData', { step: 'second', data: this.form, ifNext })
      }
    }
  },
  mounted () {
    this.getImage('get')
    if (this.projectBeforeConfig.agentConfig) {
      this.form.serviceName = this.projectBeforeConfig.agentConfig.serviceName
      this.form.serviceHref = this.projectBeforeConfig.agentConfig.href
      this.form.servicePort = this.projectBeforeConfig.agentConfig.port
    }
  }
}
</script>

<style lang="less">
.config-yaml{
  input{
    height: 30px;
    line-height: 30px;
  }
  .el-input{
    width: 100px;
    margin-right: 10px;
  }
  .el-select .el-input{
    width: 150px;
  }
  .el-input.serviceName{
    width: 150px;
  }
  .addBtn{
    padding: 7px 20px;
    background-color: #fff;
    border: 1px solid #688ef3;
    color: #688ef3;
  }
  .imageResult i{
    margin-left: 10px;
  }
  .imageResult i:hover{
    color: #688ef3;
  }
}
</style>
