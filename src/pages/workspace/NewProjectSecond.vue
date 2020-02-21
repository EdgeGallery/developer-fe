<template>
  <div class="secondstep">
    <table class="tableCapa" width="100%" v-loading="capabilityLoading">
      <tr>
        <td>
          <el-tooltip class="item" effect="dark" :content="$t('workspace.chooseMepC')" placement="top-start">
            <el-button type="text">{{$t('workspace.openMEPCapabilities')}}</el-button>
          </el-tooltip>
        </td>
        <td>
          <el-checkbox-group id="capabilityList" v-model="capability"
            @change="changeCheckValue">
            <el-tooltip class="item" effect="dark" :content="item.description" placement="top"
              v-for="(item,index) in capabilityList"
              :key="index">
              <el-checkbox
                :label="item.name"
                :disabled="item.disabled">
              </el-checkbox>
            </el-tooltip>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td>
          <el-tooltip class="item" effect="dark" :content="$t('workspace.chooseMEPeco')" placement="top-start">
            <el-button type="text">{{$t('workspace.openMEPECOCapabilities')}}</el-button>
          </el-tooltip>
        </td>
        <td>
          <el-checkbox-group id="capabilityEcoList" v-model="capability"
            @change="changeCheckValue">
            <el-tooltip class="item" effect="dark" :content="item.description" placement="top"
              v-for="(item,index) in capabilityEcoList"
              :key="index">
              <el-checkbox
                :label="item.name"
                :disabled="item.disabled">
              </el-checkbox>
            </el-tooltip>
          </el-checkbox-group>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
export default {
  name: '',
  data () {
    return {
      capability: ['Service Discovery'],
      capabilityEco: [],
      secondStepSelect: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      capabilityList: [],
      capabilityEcoList: [],
      capabilityLoading: true

    }
  },
  created () {},
  mounted () {
    this.getCapabilityList()
  },
  methods: {
    // 选择能力列表
    changeCheckValue (val) {
      this.secondStepSelect.selectCapabilityId = []
      this.capabilitySelected = []
      val.forEach(item => {
        this.capabilityList.forEach(capability => {
          if (item === capability.name) {
            this.secondStepSelect.selectCapabilityId.push(capability.groupId)
            this.secondStepSelect.capabilitySelected.push(capability)
          }
        })
        this.capabilityEcoList.forEach(capabilityEco => {
          if (item === capabilityEco.name) {
            this.secondStepSelect.selectCapabilityId.push(capabilityEco.groupId)
            this.secondStepSelect.capabilitySelected.push(capabilityEco)
          }
        })
        this.secondStepSelect.capabilitySelected = [...new Set(this.secondStepSelect.capabilitySelected)]
      })
    },
    // 获取能力列表
    getCapabilityList () {
      let url = 'mec/developer/v1/capability-groups'
      Get(url).then(res => {
        let capabilityData = res.data
        capabilityData.forEach(item => {
          if (item.name === 'Service Discovery') {
            item.disabled = true
            this.secondStepSelect.selectCapabilityId.push(item.groupId)
            this.secondStepSelect.capabilitySelected.push(item)
          } else {
            item.disabled = false
          }
          if (item.type === 'OPENMEP') {
            this.capabilityList.push(item)
          } else if (item.type === 'OPENMEP_ECO') {
            this.capabilityEcoList.push(item)
          }
        })
        this.capabilityLoading = false
      })
    },
    emitStepData () {
      this.$emit('getStepData', { data: this.secondStepSelect, step: 'second' })
    }
  }
}
</script>

<style lang="less">
.secondstep {
  margin-top: 20px;
  .tableCapa,
  td {
    border: 1px solid #ddd;
    border-collapse: collapse;
    padding: 30px 10px;
    .el-button {
      margin: 0 20px;
      padding: 0;
    }
    .el-checkbox {
      margin: 10px 30px 10px 0;
      .el-button {
        border: none;
        margin: 0;
      }
      .el-button:focus,
      .el-button:hover {
        background-color: #fff;
        color: #606266;
      }
      .el-button:after {
        content: "?";
        width: 14px;
        height: 14px;
        line-height: 14px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        background: #b8becc;
        display: inline-block;
        margin-left: 4px;
      }
    }
  }
  .tableCapa td:first-child {
    width: 210px;
    text-align: right;
    button:before {
      content: "?";
      width: 14px;
      height: 14px;
      line-height: 14px;
      border-radius: 50%;
      color: #fff;
      font-size: 12px;
      background: #6b92fa;
      display: inline-block;
      margin-right: 4px;
    }
  }
  .el-button--text {
    color: #606266;
  }
}
</style>
