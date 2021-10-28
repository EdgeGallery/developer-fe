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
  <div class="addVm">
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >
    <div class="addVm-bg">
      <div class="vm-info">
        <div class="addVm-top-title">
          <p><span>*</span>虚拟机名称</p>
          <el-input
            v-model="vmName"
            placeholder="请输入内容"
          />
        </div>
        <div class="addVm-top-title">
          <p>用户名</p>
          <el-input
            v-model="vmUsername"
            placeholder="请输入内容"
          />
        </div>
        <div class="addVm-top-title">
          <p>密码</p>
          <el-input
            v-model="vmPassword"
            placeholder="请输入内容"
          />
        </div>
      </div>
      <div class="simulator-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择模拟机规格
          </p>
        </div>
        <div class="simulator-info-content">
          <div>
            <el-radio-group v-model="simulator">
              <el-radio-button label="X86" />
              <el-radio-button label="ARM" />
            </el-radio-group>
            <p class="vm-size">
              虚拟机规格
            </p>
            <el-table
              :data="tableData"
              class="common-table vm-table"
            >
              <el-table-column width="35px">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.vmId"
                    v-model="vmId"
                    class="work-radio"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="140"
              />
              <el-table-column
                prop="sence"
                label="使用场景"
                width="110"
              />
              <el-table-column
                prop="cpu"
                label="CPU"
                width="110"
              />
              <el-table-column
                prop="memory"
                label="内存"
                width="110"
              />
              <el-table-column
                prop="systemDisk"
                label="系统盘"
                width="110"
              />
              <el-table-column
                prop="dataDisk"
                label="数据盘"
                width="100"
              />
              <el-table-column
                prop="other"
                label="其他能力"
                width="100"
              />
            </el-table>
          </div>
        </div>
      </div>
      <div class="simulator-info selectImage-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择镜像
          </p>
        </div>
        <div class="selectImage-content">
          <div class="selectImage-public">
            <el-radio
              v-model="publicImage"
              label="1"
            >
              公有镜像
            </el-radio>
            <el-select
              v-model="publicTypeValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in publicTypeOptions"
                :key="item.publicTypeValue"
                :label="item.label"
                :value="item.publicTypeValue"
              />
            </el-select>
            <el-select
              v-model="publicImageValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in publicImageOptions"
                :key="item.publicImageValue"
                :label="item.label"
                :value="item.publicImageValue"
              />
            </el-select>
          </div>
          <div class="selectImage-public">
            <el-radio
              v-model="publicImage"
              label="2"
            >
              公有镜像
            </el-radio>
            <el-select
              v-model="ownTypeValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in ownTypeOptions"
                :key="item.ownTypeValue"
                :label="item.label"
                :value="item.ownTypeValue"
              />
            </el-select>
            <el-select
              v-model="ownImageValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in ownImageOptions"
                :key="item.ownImageValue"
                :label="item.label"
                :value="item.ownImageValue"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="addVm_btn rt">
        <el-button>
          取消
        </el-button>
        <el-button>
          确认
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      vmName: '',
      vmUsername: '',
      vmPassword: '',
      simulator: 'X86',
      vmId: '',
      tableData: [{
        name: '通用计算机1',
        sence: '普通app',
        cpu: '1级cpu',
        memory: '1GB',
        systemDisk: '50GB',
        dataDisk: '40GB',
        gpu: '1级gpu',
        other: '速度快',
        vmId: 1
      }, {
        name: '通用计算机2',
        sence: '普通app',
        cpu: '2级cpu',
        memory: '2GB',
        systemDisk: '40GB',
        dataDisk: '30GB',
        gpu: '2级gpu',
        other: '寿命长',
        vmId: 2
      }, {
        name: '通用计算机3',
        sence: '普通app',
        cpu: '3级cpu',
        memory: '3GB',
        systemDisk: '30GB',
        dataDisk: '20GB',
        gpu: '3级gpu',
        other: '省电',
        vmId: 3
      }],
      publicTypeOptions: [{
        publicTypeValue: '选项1',
        label: '公有类型1'
      }, {
        publicTypeValue: '选项2',
        label: '公有类型2'
      }],
      publicImageOptions: [{
        publicImageValue: '选项1',
        label: '公有镜像1'
      }, {
        publicImageValue: '选项2',
        label: '公有镜像2'
      }],
      publicImage: '',
      publicTypeValue: '',
      publicImageValue: '',
      ownTypeOptions: [{
        ownTypeValue: '选项1',
        label: '私有类型1'
      }, {
        ownTypeValue: '选项2',
        label: '私有类型2'
      }],
      ownImageOptions: [{
        ownImageValue: '选项1',
        label: '私有镜像1'
      }, {
        ownImageValue: '选项2',
        label: '私有镜像2'
      }],
      ownImage: '',
      ownTypeValue: '',
      ownImageValue: '',
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.addVm{
  width: 100%;
  height: 100%;
  position:relative;
  padding-top:40px ;
  font-size: 16px;
  .question{
    width: 67px;
    height: 67px;
    position:absolute;
    top: 2%;
    left: 90%;
  }
  .addVm-bg{
    width:1184px;
    min-height: 750px;
    margin: 0px auto;
    background-image: url('../../../assets/images/sandbox/addVm_bg.png');
    padding: 20px 0px 0px 100px;
    .vm-info{
      margin: 0 0 30px 20px;
      .addVm-top-title{
        display: flex;
        margin: 20px 0px;
        p{
            width: 100px;
            line-height: 25px;
            text-align: right;
            margin-right: 10px;
          span{
            color: red;
            line-height: 25px;
          }
        }
        .el-input__inner{
          width: 816px ;
          height: 25px ;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;
        }
      }
    }
    .simulator-info{
      margin-bottom: 30px;
      .simulator-info-title{
        p{
            font-size: 20px;
            display: flex;
          span{
            display: block;
            background-color: #5944C0;
            width: 9px;
            height: 9px;
            border-radius:50%;
            margin: 10px 20px 0 0 ;
          }
        }
      }
      .simulator-info-content{
        .el-radio-group{
          margin: 10px 0 0 130px;
          .el-radio-button__inner {
            background: none;
            color: #fff;
            border: none;
            border-bottom:4px solid #8f86cc ;
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background-color: none;
            border-bottom:4px solid #5944C0 ;
            border-left:none ;
          }
        }
        .vm-size{
          margin: 20px 0 20px 144px;
        }
        .vm-table{
          margin-left: 130px;
          width: 816px;
          .el-table__row{
            border: 2px solid red !important;
            height: 59px;
            }
        }
        .el-table td,.el-table tr.is-leaf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    .selectImage-info{
      .selectImage-content{
        margin-left: 140px;
        .selectImage-public{
          display: flex;
          margin-bottom: 20px;
          .el-radio{
            height: 25px;
            line-height: 25px;
            color: #fff;
          }
          .el-radio__input.is-checked + .el-radio__label {
            color: #fff;
          }
          .el-select{
            width: 264px;
            margin-right: 80px;
            .el-input__inner{
              height: 25px;
              background-color: rgba(255, 255, 255, 0.3);
            }
            .el-icon-arrow-up {
                font-size: 16px;
                position: relative;
                line-height: 25px;
            }
          }
        }
      }
    }
    .addVm_btn{
        margin-right: 30px;
      .el-button{
        width: 88px;
        height: 30px;
        border-radius: 12px;
      }
    }
  }
}
</style>
