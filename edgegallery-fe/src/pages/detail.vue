
/*
 *  Copyright 2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

<template>
  <div class="detail">
    <div class="detailTop">
      <div class="topLeft">
        <p class="leftName">
          {{ $t('system.systemDetail') }}
        </p>
        <p class="leftName2" />
      </div>
      <el-button
        type="primary"
        class="topRight"
        @click="dialogVisible = true"
      >
        {{ $t('system.add') }}
      </el-button>
    </div>
    <div
      class="detailContent"
      :class="[ this.active == false?'activeTable':'activePicture']"
    >
      <div class="contentTop">
        <el-input
          class="searchSystem"
          v-model="input"
          :placeholder="$t('system.search') "
        />
        <img
          src="../assets/images/changeStyle.png"
          @click="changeTable"
          alt=""
        >
      </div>
      <div
        class="systemPicture"
        v-if="active"
      >
        <div class="contents">
          <div class="oneDetail">
            <div class="oneDetailTop">
              <div class="imgs">
                <div class="imgBox">
                  <img
                    src="../assets/images/changeStyle.png"
                    alt=""
                  >
                </div>
                <p>大数据系统</p>
              </div>
              <div class="infos">
                <div class="oneInfo">
                  <img
                    src="../assets/images/changeStyle.png"
                    alt=""
                  >
                  <p>edgegallerysssssssssssss</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/changeStyle.png"
                    alt=""
                  >
                  <p>edgegallery</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/changeStyle.png"
                    alt=""
                  >
                  <p>edgegallery</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/changeStyle.png"
                    alt=""
                  >
                  <p>edgegallery</p>
                </div>
              </div>
            </div>
            <div class="oneDetailBottom">
              <el-button class="btnDelete">
                {{ $t('system.delete') }}
              </el-button>
              <el-button type="btnEdit">
                {{ $t('system.edit') }}
              </el-button>
            </div>
          </div>
        </div>
        <el-pagination
          style="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8,16,24,32]"
          :page-size="8"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
      <div
        class="systemTable"
        v-if="!active"
      >
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            :label="$t('system.systemName')"
            sortable
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.url')"
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.region')"
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.product')"
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.manufacturer')"
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.vison')"
            width="160"
          />
          <el-table-column
            prop="address"
            :label="$t('system.state')"
            sortable
            width="160"
          />
          <el-table-column
            :label="$t('system.operation')"
            width="170"
          >
            <template slot-scope="scope">
              <el-button
                class="tableDelete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                {{ $t('system.delete') }}
              </el-button>
              <el-button
                class="tableDelete"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                {{ $t('system.edit') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-right:-20px;"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[5,10,15,20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
    >
      <div class="elTop">
        <span />
        <p>{{ $t('system.add') }}</p>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('system.systemName')"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          :label="$t('system.product')"
          prop="region"
        >
          <el-select
            v-model="ruleForm.region"
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
          :label="$t('system.url')"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          :label="$t('system.vison')"
          prop="region"
        >
          <el-select
            v-model="ruleForm.region"
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
          :label="$t('system.region')"
          prop="region"
        >
          <el-select
            v-model="ruleForm.region"
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
          :label="$t('system.manufacturer')"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          :label="$t('system.icon')"
          label-width="110px"
          prop="type"
        >
          <div
            class="default-icon"
          >
            <div
              class="box"
              v-for="(item, index) in defaultIcon"
              @click="chooseDefaultIcon(item, index)"
              :key="item"
            >
              <img
                :src="item"
                alt=""
              >
              <em
                class="el-icon-success"
              />
            </div>
          </div>
          <em
            class="upIcon el-icon-success"
            v-if="uploadIcon"
          />
          <el-upload
            id="projectLogo"
            class="upload-demo"
            ref="upload"
            action=""
            list-type="picture-card"
            :limit="1"
            :file-list="logoFileList"
            :on-change="handleChangeLogo"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-remove="removeUploadLogo"
            accept=".jpg,.png"
            name="file"
          >
            <em class="el-icon-plus" />
          </el-upload>
          <div
            class="el-form-error"
            v-if="showErr"
          >
            {{ $t('store.iconRequired') }}
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            {{ $t('system.sure') }}
          </el-button>
          <el-button @click="dialogVisible = false">
            {{ $t('system.cancel') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      currentPage: 1,
      currentPage2: 1,
      active: false,
      dialogVisible: false,
      imageUrl: '',
      defaultIcon: [
        require('../assets/images/logo.png')
      ],
      tableData: [{
        name: 'a',
        address: '普陀区'
      }, {
        name: '王',
        address: '海市普陀区'
      }, {
        name: 'sun',
        address: '上海市普陀'
      }
      ],
      ruleForm: {
        name: '',
        region: '',
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSizeChange2 (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange2 (val) {
      console.log(`当前页: ${val}`)
    },
    changeTable () {
      this.active = !this.active
    },
    submitForm (formName) {
      this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style lang='less'>
.detail{
  min-height:900px;
  width: 100%;
  padding-bottom: 100px;
  .detailTop{
      width: 73.64%;
      margin: 0 auto ;
      margin-top: 55px;
      height: 100px;
      min-width: 1200px;
      margin-bottom: 30px;
    .topLeft{
      float: left;
      margin-left: 10.1%;
      .leftName{
        font-size: 36px;
        font-family: HarmonyHeiTi;
        font-weight: bold;
        color: #5D3DA0;
      }
      .leftName2{
        margin-top: 20px;
        width: 88px;
        height: 7px;
        background: #9E7BCD;
        opacity: 0.2;
        border-radius: 4px;
      }
    }
    .topRight{
      float: right;
      width: 172px;
      height: 50px;
      background: linear-gradient(122deg, #4444D0, #6724CB);
      border-radius: 25px;
      font-size: 20px;
      font-family: HarmonyHeiTi;
      font-weight: 300;
      color: #FFFFFF;
      margin-top: 50px;
      box-shadow: 0px 16px 8px rgba(94 ,44 ,204 ,0.3);
    }
    }
  .activeTable{
    padding-bottom: 0;
  }
  .activePicture{
    padding-bottom: 80px;
  }
  .detailContent{
    width: 73.65%;
    margin: 0 auto ;
    min-height: 690px;
    min-width: 1200px;
    background: #FFFFFF;
    box-shadow: 5px 9px 63px 5px rgba(94, 64, 200, 0.06);
    border-radius: 12px;
    padding-top: 40px;
    position: relative;
    .contentTop{
      margin:0px 0 29px 4.1%;
      display: flex;
      .el-input{
        width: 217px;
      }
      .el-input__inner{
        width: 217px;
        height: 31px;
        background: #FFFFFF;
        border: 1px solid #5E40C8;
        border-radius: 8px;
      }
      img{
        margin-top: 2.5px;
        margin-left: 23px;
        width: 26px;
        height: 26px;
      }
      img:hover{
        cursor: pointer;
      }
    }
    .contents{
      box-sizing: content-box;
      min-height: 530px;
      margin: 0 1.2% 0 4.1%;
      width: 94.7%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .oneDetail{
        height: 226px;
        width: 22.61%;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        margin-right: 2.3%;
      .oneDetailTop{
        background: linear-gradient(15deg, #E9E6FF, #DBF4FF, #C5CFFF);
        border-radius: 12px 12px 0px 0px;
        width: 100%;
        height:173px;
        display: flex;
      .imgs{
        width: 32.33%;
        height:84px;
        background-color: #fff;
        border-radius:12px;
        margin:34px 7% 0 6.67% ;
        .imgBox{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          img{
            width: 74.23%;
            height: 61px;
          }
        }
        p{
            font-size: 14px;
            font-family: HarmonyHeiTi;
            font-weight: 400;
            color: #5D3DA0;
            line-height: 15px;
            text-align: center;
            margin:12px 0  20px 0 ;
          }

      }
      .infos{
        width: 47.3%;
        margin-top: 35px;
        margin-right: 6.67%;
        .oneInfo{
          display: flex;
          width: 100%;
          img{
           width: 18px;
           height: 18px;
           border-radius: 6px;
           margin-right: 16px;
          }
          p{
            font-size: 16px;
            max-width: 76.06%;
            overflow: hidden;
            margin-bottom: 10px;
            font-family: HarmonyHeiTi;
            font-weight: 400;
            line-height: 20px;
            color: #5D3DA0;
          }
        }
      }
      }
      .oneDetailBottom{
        box-shadow: 0px 5px 24px 0px rgba(178, 193, 249, 0.26);
        width: 100%;
        height:53px;
        background-color: #fff;
        .el-button{
          box-shadow: 0px 5px 24px 0px rgba(178, 193, 249, 0.26);
          border-radius: 0px 0px 12px 12px;
          width: 60px;
          height: 24px;
          background: #8A7DF9;
          border-radius: 5px;
          padding: 0;
          font-size: 14px;
          font-family: HarmonyHeiTi;
          font-weight: 200;
          color: #FFFFFF;
        }
        .btnDelete{
          margin-left: 49.67%;
          margin-top: 15px;
        }
      }
    }
    }
    .el-pagination{
        width: 500px !important;
        position: absolute;
        bottom: 20px;
        right:30px;
        margin-top: 30px;
        padding-bottom: 20px;
    }
    .systemTable{
      margin: 0 auto;
      width: 91.94%;
      min-height: 580px;
      position: relative;
      padding-bottom:100px;
      .tableDelete{
        border: none;
        padding: 0;
        width: 43px;
        height: 24px;
        background: #EFEFEF;
        border-radius: 5px;
        font-size: 14px;
        font-family: HarmonyHeiTi;
        font-weight: 200;
        color: #7A6E8A;
      }
    }
  }
  .el-dialog{
        width: 912px;
        height: 462px;
        background: #EFEFEF;
        border-radius: 12px;
    .el-dialog__header {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      padding:0 ;
    }
    .el-icon-close:before {
        display: none;
    }
    .el-dialog__body {
    padding: 40px!important;
    }
    .elTop{
      display: flex;
      span{
        display: block;
        width: 17px;
        height: 17px;
        margin-top: 5px;
        margin-right: 20px;
        background: #55D8BF;
        border-radius: 3px;
      }
      p{
        font-size: 20px;
        font-family: HarmonyHeiTi;
        font-weight: 300;
        color: #380879;
      }
    }
    .el-form{
              margin-top: 30px;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding-right: 40px;
          .el-form-item {
              margin-left: 40px;
          }
          .el-form-item__label {
              font-size: 16px;
              font-family: HarmonyHeiTi;
              font-weight: 300;
              color: #380879;
              line-height: 36px;
              padding-right: 20px;
          }
          .el-input__inner {
              width: 240px;
          }
          .btns{
            margin-top: 110px;
          }
          .upload-demo{
            display: flex;
          }
          .el-upload--picture-card {
              width: 72px;
              height: 61px;
              line-height: 61px;
          }
          .el-upload-list--picture-card .el-upload-list__item {
              overflow: hidden;
              background-color: #fff;
              border: 1px solid #c0ccda;
              border-radius: 6px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              width: 72px;
              height: 61px;
              margin: 0 8px 8px 0;
              display: inline-block;
          }
          .el-button{
            background: #fff;
            border-radius: 10px;
            font-size: 14px;
            font-family: HarmonyHeiTi;
            font-weight: 300;
            color: #5844BE;
            border: 1px solid #5844BE ;
          }
          .el-button:hover{
            background: #5844BE;
            color: #FFFFFF;
          }
      }
    }

  }
.default-icon{
    float: left;
    display: flex;
    flex-wrap: wrap;
    .box{
      position: relative;
      width: 44px;
      height: 44px;
      margin: 0 68px 0 0;
      img{
        width: 72px;
        height: 61px;
      }
      em{
        display: inline-block;
        position: absolute;
        bottom:-20px;
        right: -50px;
      }
      .active{
        color: #409EFF;
      }
    }
  }
  .upIcon.el-icon-success{
    position: absolute;
    top: 30px;
    left: 88px;
    z-index: 99;
  }
  .upIcon.active{
    color: #409EFF;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .el-form-item.icon{
    content: '';
    display: block;
    clear: both;
  }
  .el-upload-list{
    width: auto;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 40px;
    height: 40px;
    min-width: 40px;
    border: none;
  }

</style>
