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
  <div class="detail">
    <div class="detailTop">
      <div class="topLeft">
        <p class="leftName">
          {{ $t('thirdSystem.systemDetail') }}
        </p>
        <p class="leftName2" />
      </div>
      <el-button
        type="primary"
        class="topRight"
        @click="systemBtn('add')"
      >
        <img
          class="addIcon"
          src="../../assets/images/add.png"
          alt=""
        >
        {{ $t('common.add') }}
      </el-button>
    </div>
    <div
      class="detailContent common-div-bg"
      :class="[ this.active == false?'activeTable':'activePicture']"
    >
      <div class="contentTop">
        <el-input
          class="searchSystem"
          v-model="searchName"
          :placeholder="$t('thirdSystem.search') "
          @input="searchSystems"
        />
        <img
          src="../../assets/images/changeStyle.png"
          @click="changeTable"
          alt=""
        >
      </div>
      <div
        class="systemPicture"
        v-if="active"
      >
        <div class="contents">
          <div
            class="oneDetail"
            v-for="(item,index) in systemDetails"
            :key="index"
          >
            <div
              class="oneDetailTop"
            >
              <div class="imgs">
                <div class="imgBox">
                  <img
                    :src="item.icon===''?defaultIcon:item.icon"
                    alt=""
                  >
                </div>
                <p>{{ item.systemName }}</p>
              </div>
              <div class="infos">
                <div class="oneInfo">
                  <img
                    src="../../assets/images/name.png"
                    alt=""
                  >
                  <p>{{ item.systemName }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../../assets/images/region.png"
                    alt=""
                  >
                  <p>{{ item.region }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../../assets/images/factory.png"
                    alt=""
                  >
                  <p>{{ item.vendor }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../../assets/images/state.png"
                    alt=""
                  >
                  <p>{{ item.status===''?'active':item.status }}</p>
                </div>
              </div>
            </div>
            <div class="oneDetailBottom">
              <el-button
                class="btnEdit"
                @click="editSystem(item)"
              >
                {{ $t('common.edit') }}
              </el-button>
              <el-button
                class="btnDelete"
                @click="deleteSystem(item.id)"
              >
                {{ $t('common.delete') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="systemTable"
        v-if="!active"
      >
        <el-table
          :data="this.systemDetails"
          style="width: 100%"
          class="common-table"
        >
          <el-table-column
            prop="systemName"
            :label="$t('thirdSystem.systemName')"
            sortable
            width="150"
          />
          <el-table-column
            prop="url"
            :label="$t('thirdSystem.url')"
            width="140"
          />
          <el-table-column
            prop="region"
            :label="$t('thirdSystem.region')"
            width="140"
          />
          <el-table-column
            prop="product"
            :label="$t('thirdSystem.product')"
            width="140"
          />
          <el-table-column
            prop="vendor"
            :label="$t('thirdSystem.vendor')"
            width="140"
          />
          <el-table-column
            prop="version"
            :label="$t('thirdSystem.version')"
            width="120"
          />
          <el-table-column
            prop="status"
            :label="$t('thirdSystem.status')"
            sortable
            width="120"
          >
            <template slot-scope="scope">
              <img
                class="stateIcon"
                :src="scope.row.status !== 'inactive'?require('../../assets/images/sucess.png'): require('../../assets/images/failed.png')"
                alt=""
              >
              <span v-if="scope.row.status==='inactive'">inactive</span>
              <span v-if="scope.row.status!=='inactive'">active</span>
            </template>
          </el-table-column>>
          <el-table-column
            :label="$t('common.operation')"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                class="tableDelete"
                size="mini"
                type="danger"
                @click="deleteSystem(scope.row.id)"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                class="tableDelete"
                size="mini"
                @click="editSystem(scope.row)"
              >
                {{ $t('common.edit') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
    >
      <div class="elTop">
        <span />
        <p>{{ $t('common.add') }}</p>
      </div>
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('thirdSystem.systemName')"
          prop="systemName"
        >
          <el-input v-model="addForm.systemName" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.product')"
          prop="product"
        >
          <el-input v-model="addForm.product" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.url')"
          prop="url"
        >
          <el-input v-model="addForm.url" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.version')"
          prop="version"
        >
          <el-input v-model="addForm.version" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.region')"
          prop="region"
        >
          <el-input v-model="addForm.region" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.vendor')"
          prop="vendor"
        >
          <el-input v-model="addForm.vendor" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.username')"
          prop="username"
        >
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.password')"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.icon')"
          label-width="100px"
          prop="type"
        >
          <div class="imgUpload">
            <img
              class="defaultIcon"
              :src="defaultIcon"
              alt=""
            >
            <p class="or">
              {{ $t('thirdSystem.or') }}
            </p>
            <el-upload
              list-type="picture-card"
              action=""
              accept=".jpg, .png"
              :limit="1"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="getFile"
              :on-remove="handleUploadRemove"
            >
              <i class="el-icon-plus" />
              <div
                slot="tip"
                class="el-upload__tip"
              >
                {{ $t('thirdSystem.uploadRequire') }}
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="addSystem('addForm')"
          >
            {{ $t('common.confirm') }}
          </el-button>
          <el-button @click="systemBtn('cancel')">
            {{ $t('common.cancel') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleEdit"
    >
      <div class="elTop">
        <span />
        <p>{{ $t('common.edit') }}</p>
      </div>
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('thirdSystem.systemName')"
          prop="systemName"
        >
          <el-input v-model="editForm.systemName" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.product')"
          prop="product"
        >
          <el-input v-model="editForm.product" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.url')"
          prop="url"
        >
          <el-input v-model="editForm.url" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.version')"
          prop="version"
        >
          <el-input v-model="editForm.version" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.region')"
          prop="region"
        >
          <el-input v-model="editForm.region" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.vendor')"
          prop="vendor"
        >
          <el-input v-model="editForm.vendor" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.username')"
          prop="username"
        >
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.password')"
          prop="password"
        >
          <el-input
            v-model="editForm.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          :label="$t('thirdSystem.icon')"
          label-width="100px"
          prop="type"
        >
          <div class="imgUpload">
            <img
              class="defaultIcon"
              :src="defaultIcon"
              alt=""
            >
            <p class="or">
              {{ $t('thirdSystem.or') }}
            </p>
            <div
              class="editImg"
              v-if="editImg!==''"
            >
              <img
                class="defaultIcon"
                :src="editImg"
                alt=""
              >
              <i
                class="el-icon-delete deleteEditImg"
                @click="deleteEditImg()"
              />
            </div>
            <el-upload
              v-else
              list-type="picture-card"
              action=""
              accept=".jpg, .png"
              :limit="1"
              :auto-upload="false"
              :file-list="fileListEdit"
              :on-change="getFileEdit"
              :on-remove="handleUploadRemoveEdit"
            >
              <i class="el-icon-plus" />
              <div
                slot="tip"
                class="el-upload__tip"
              >
                {{ $t('thirdSystem.uploadRequire') }}
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="keepEdit('editForm')"
          >
            {{ $t('common.confirm') }}
          </el-button>
          <el-button @click="dialogVisibleEdit = false">
            {{ $t('common.cancel') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { system } from '../../api/thirdSystemApi'
export default {
  components: {
  },
  data () {
    const validateSystemName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tootipSystemName')}`))
      } else {
        callback()
      }
    }
    const validateProduct = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tootipProduct')}`))
      } else {
        callback()
      }
    }
    const validateUrl = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tootipUrl')}`))
      } else {
        callback()
      }
    }
    const validateVersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tootipVersion')}`))
      } else {
        callback()
      }
    }
    const validateRegion = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tooltipRegion')}`))
      } else {
        callback()
      }
    }
    const validateVendor = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tooltipVendor')}`))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tooltipUsername')}`))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('thirdSystem.tooltipPassword')}`))
      } else {
        callback()
      }
    }
    return {
      language: localStorage.getItem('language'),
      systemDetails: [],
      systemType: this.$route.query.systemType,
      active: false,
      searchName: '',
      dialogVisible: false,
      dialogVisibleEdit: false,
      imageUrl: '',
      editId: '',
      defaultIcon: [
        require('../../assets/images/bigData.png')
      ],
      addForm: {
        systemName: '',
        product: '',
        url: '',
        version: '',
        region: '',
        vendor: '',
        systemType: this.$route.query.systemType,
        ip: '',
        port: '',
        username: '',
        password: '',
        tokenType: '',
        status: 'active',
        icon: '',
        userId: '',
        configContent: ''
      },
      editForm: {
        systemName: '',
        product: '',
        url: '',
        version: '',
        region: '',
        vendor: '',
        systemType: this.$route.query.systemType,
        ip: '',
        port: '',
        username: '',
        password: '',
        tokenType: '',
        status: 'active',
        icon: '',
        userId: '',
        configContent: ''
      },
      proofImage: '',
      editImg: '',
      editImgDefault: '',
      proofImageEdit: '',
      rules: {
        systemName: [
          { required: true, validator: validateSystemName }
        ],
        product: [
          { required: true, validator: validateProduct }
        ],
        url: [
          { required: true, validator: validateUrl }
        ],
        version: [
          { required: true, validator: validateVersion }
        ],
        region: [
          { required: true, validator: validateRegion }
        ],
        vendor: [
          { required: true, validator: validateVendor }
        ],
        username: [
          { required: true, validator: validateUsername }
        ],
        password: [
          { required: true, validator: validatePassword }
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
    this.goDetail()
  },
  methods: {
    goDetail () {
      this.systemDetails = []
      system.getOneSystem(this.systemType).then(res => {
        if (res.data.length !== 0) {
          this.systemDetails = res.data
        }
      })
    },
    searchSystems () {
      let name = this.searchName
      if (this.searchName === '') {
        system.getOneSystem(this.systemType).then(res => {
          this.systemDetails = res.data
        })
      } else {
        system.searchSystem(name + '/systemType/' + this.systemType).then(res => {
          this.systemDetails = res.data
        })
      }
    },
    editSystem (data) {
      this.editImg = data.icon
      this.editImgDefault = data.icon
      this.editId = data.id
      this.dialogVisibleEdit = true
      let copy = Object.assign({}, data)
      this.editForm = copy
    },
    deleteSystem (data) {
      let id = data
      system.deleteSystems(id).then(res => {
        this.$eg_messagebox(this.$t('thirdSystem.deleteSystemSucess'), 'success')
        this.searchSystems()
      })
    },
    systemBtn (data) {
      this.dialogVisible = data === 'add'
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate()
      })
      this.editImg = ''
      this.addForm = {
        systemName: '',
        product: '',
        url: '',
        version: '',
        region: '',
        vendor: '',
        systemType: this.systemType,
        ip: '',
        port: '',
        username: '',
        password: '',
        tokenType: '',
        status: 'active',
        userId: '',
        icon: '',
        configContent: ''
      }
    },
    changeTable () {
      this.active = !this.active
    },
    getFile (file, fileList) {
      this.getBase64(file.raw).then(res => {
        const params = res
        this.proofImage = params
      })
    },
    getFileEdit (file, fileListEdit) {
      this.getBase64(file.raw).then(res => {
        const params = res
        this.proofImageEdit = params
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    handleUploadRemove (file, fileList) {
      this.proofImage = ''
    },
    handleUploadRemoveEdit (file, fileListEdit) {
      this.proofImageEdit = ''
      this.editImg = this.editImgDefault
    },
    deleteEditImg () {
      this.editImg = ''
    },
    addSystem (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.addForm.icon = this.proofImage
          this.addForm.userId = sessionStorage.getItem('userId')
          system.addSystems(this.addForm).then(res => {
            this.$eg_messagebox(this.$t('thirdSystem.addSystemSucess'), 'success')
            this.goDetail()
            this.searchSystems()
            this.dialogVisible = false
            this.addForm = {
              systemName: '',
              product: '',
              url: '',
              version: '',
              region: '',
              vendor: '',
              systemType: this.systemType,
              ip: '',
              port: '',
              username: '',
              password: '',
              tokenType: '',
              status: 'active',
              userId: '',
              icon: '',
              configContent: ''
            }
            this.proofImage = ''
          }).catch(err => {
            this.$eg_messagebox(err.data.err, 'warning')
          })
        } else {
          return false
        }
        this.$nextTick(() => {
          this.$refs[addForm].clearValidate()
        })
      })
    },
    keepEdit (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          if (this.proofImageEdit !== '') {
            this.editForm.icon = this.proofImageEdit
          } else if (this.editImg !== '') {
            this.editForm.icon = this.editImg
          } else {
            this.editForm.icon = ''
          }
          system.updateSystems(this.editId, this.editForm).then(res => {
            this.$eg_messagebox(this.$t('thirdSystem.updateStstemSucess'), 'success')
            this.searchSystems()
            this.dialogVisibleEdit = false
          })
        }
        this.$nextTick(() => {
          this.$refs[editForm].clearValidate()
        })
      })
    }
  }
}
</script>

<style lang='less'>
.detail{
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: #fff;
      }
      .leftName2{
        margin-top: 20px;
        width: 88px;
        height: 7px;
        background: #fff;
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
      border: none;
      font-size: 20px;
      font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
      font-weight: 300;
      color: #FFFFFF;
      margin-top: 50px;
      .addIcon{
        position: relative;
        top: 2px;
        right: 6px;
      }
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
    min-width: 1200px;
    padding: 40px 0 0 0 ;
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
            border-radius: 6px;
          }
        }
        p{
          font-size: 14px;
          font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
          font-weight: 400;
          max-width: 100%;
          color: #5D3DA0;
          line-height: 15px;
          text-align: center;
          margin:12px 0  20px 0 ;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 10px;
            font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
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
        padding-right:20px ;
        .el-button{
          box-shadow: 0px 5px 24px 0px rgba(178, 193, 249, 0.26);
          width: 60px;
          height: 24px;
          background:#FFFFFF;
          border-radius: 5px;
          padding: 0;
          font-size: 14px;
          font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
          font-weight: 200;
          color: #8A7DF9;
          border: 1xp solid #8A7DF9 !important;
        }
        .el-button:hover{
          color: #FFFFFF;
          background: #8A7DF9;
        }
        .btnDelete{
          float: right;
          margin-top: 15px;
        }
        .btnEdit{
          float: right;
          margin:15px 10px 0 10px;
        }
      }
    }
    }
    .systemTable{
      margin: 0 auto;
      width: 91.94%;
      min-height: 500px;
      position: relative;
      padding-bottom:100px;
      overflow-y:auto ;
      .stateIcon{
        position: relative;
        top: 4px;
        right: 4px;
      }
      .el-button+.el-button {
        margin-left: 10px !important;
      }
      .tableDelete{
        border: none;
        padding: 4px 10px;
        background: #EFEFEF;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 200;
        color: #8A7DF9;
      }
      .tableDelete:hover{
        background:#8A7DF9;
        color:#fff;
      }
    }
  }
  .el-dialog{
    width: 912px;
    height: 576px;
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #380879 !important;
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #380879 !important;
        line-height: 36px;
        padding-right: 15px;
      }
      .el-input__inner {
        width: 240px;
      }
      .editImg{
        width: 72px;
        height: 61px;
        border-radius:15px ;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .deleteEditImg{
          width: 72px;
          height: 61px;
          font-size: 20px;
          color: #fff;
          background: rgba(22 ,22 ,24 ,0.7);
          display: none;
          position:absolute;
          text-align: center;
          line-height: 61px;
        }
      }
      .editImg:hover{
        .deleteEditImg{
          display: block;
          cursor: pointer;
        }
      }
      .imgUpload{
        display: flex;
        width: 500px;
        .defaultIcon{
          width: 72px;
          height: 61px;
        }
        .or{
          line-height: 59px;
          margin: 0 10px;
        }
        .el-upload__tip{
          margin-top: 30px
        }
      }
      .btns{
        margin-top: 60px;
        position: relative;
        top: 0;
        right: -459px;
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: 300;
        color: #8a7df9;
        border: 1px solid #8a7df9 ;
      }
      .el-button:hover{
        background: #8a7df9;
        color: #FFFFFF;
      }
    }
  }
}
.el-form-item{
  margin-bottom: 21px;
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
