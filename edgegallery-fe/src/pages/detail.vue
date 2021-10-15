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
          {{ $t('system.systemDetail') }}
        </p>
        <p class="leftName2" />
      </div>
      <el-button
        type="primary"
        class="topRight"
        @click="addSystems"
      >
        <img
          class="addIcon"
          src="../assets/images/add.png"
          alt=""
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
          v-model="searchName"
          :placeholder="$t('system.search') "
          @input="searchSystems"
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
                    src="../assets/images/bigData.png"
                    alt=""
                  >
                </div>
                <p>{{ item.systemName }}</p>
              </div>
              <div class="infos">
                <div class="oneInfo">
                  <img
                    src="../assets/images/name.png"
                    alt=""
                  >
                  <p>{{ item.systemName }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/region.png"
                    alt=""
                  >
                  <p>{{ item.region }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/factory.png"
                    alt=""
                  >
                  <p>{{ item.vendor }}</p>
                </div>
                <div class="oneInfo">
                  <img
                    src="../assets/images/state.png"
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
                {{ $t('system.edit') }}
              </el-button>
              <el-button
                class="btnDelete"
                @click="btnDelete(item.id)"
              >
                {{ $t('system.delete') }}
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
        >
          <el-table-column
            prop="systemName"
            :label="$t('system.systemName')"
            sortable
            width="160"
          />
          <el-table-column
            prop="url"
            :label="$t('system.url')"
            width="160"
          />
          <el-table-column
            prop="region"
            :label="$t('system.region')"
            width="160"
          />
          <el-table-column
            prop="product"
            :label="$t('system.product')"
            width="160"
          />
          <el-table-column
            prop="vendor"
            :label="$t('system.vendor')"
            width="160"
          />
          <el-table-column
            prop="version"
            :label="$t('system.version')"
            width="160"
          />
          <el-table-column
            prop="status"
            :label="$t('system.status')"
            sortable
            width="160"
          >
            <template slot-scope="scope">
              <img
                class="stateIcon"
                :src="scope.row.status !== 'inactive'?require('@/assets/images/sucess.png'): require('@/assets/images/failed.png')"
                alt=""
              >
              <span v-if="scope.row.status==='inactive'">inactive</span>
              <span v-if="scope.row.status!=='inactive'">active</span>
            </template>
          </el-table-column>>
          <el-table-column
            :label="$t('system.operation')"
            width="170"
          >
            <template slot-scope="scope">
              <el-button
                class="tableDelete"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
              >
                {{ $t('system.delete') }}
              </el-button>
              <el-button
                class="tableDelete"
                size="mini"
                @click="handleEdit(scope.row)"
              >
                {{ $t('system.edit') }}
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
        <p>{{ $t('system.add') }}</p>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('system.systemName')"
          prop="systemName"
        >
          <el-input v-model="form.systemName" />
        </el-form-item>
        <el-form-item
          :label="$t('system.product')"
          prop="product"
        >
          <el-input v-model="form.product" />
        </el-form-item>
        <el-form-item
          :label="$t('system.url')"
          prop="url"
        >
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item
          :label="$t('system.version')"
          prop="version"
        >
          <el-input v-model="form.version" />
        </el-form-item>
        <el-form-item
          :label="$t('system.region')"
          prop="region"
        >
          <el-input v-model="form.region" />
        </el-form-item>
        <el-form-item
          :label="$t('system.vendor')"
          prop="vendor"
        >
          <el-input v-model="form.vendor" />
        </el-form-item>
        <el-form-item
          :label="$t('system.username')"
          prop="username"
        >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item
          :label="$t('system.password')"
          prop="password"
        >
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item
          :label="$t('system.icon')"
          label-width="100px"
          prop="type"
        >
          <div
            class="default-icon"
          >
            <div
              class="box"
              v-for="(item) in defaultIcon"
              @click="chooseDefaultIcon(item)"
              :key="item"
            >
              <img
                :src="item"
                alt=""
              >
              <em
                class="el-icon-success"
                style="color:green;"
              />
            </div>
          </div>
          <em
            class="upIcon el-icon-success"
            v-if="uploadIcon"
          />
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
    <el-dialog
      :visible.sync="dialogVisibleEdit"
    >
      <div class="elTop">
        <span />
        <p>{{ $t('system.edit') }}</p>
      </div>
      <el-form
        :model="form2"
        :rules="rules"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('system.systemName')"
          prop="systemName"
        >
          <el-input v-model="form2.systemName" />
        </el-form-item>
        <el-form-item
          :label="$t('system.product')"
          prop="product"
        >
          <el-input v-model="form2.product" />
        </el-form-item>
        <el-form-item
          :label="$t('system.url')"
          prop="url"
        >
          <el-input v-model="form2.url" />
        </el-form-item>
        <el-form-item
          :label="$t('system.version')"
          prop="version"
        >
          <el-input v-model="form2.version" />
        </el-form-item>
        <el-form-item
          :label="$t('system.region')"
          prop="region"
        >
          <el-input v-model="form2.region" />
        </el-form-item>
        <el-form-item
          :label="$t('system.vendor')"
          prop="vendor"
        >
          <el-input v-model="form2.vendor" />
        </el-form-item>
        <el-form-item
          :label="$t('system.username')"
          prop="username"
        >
          <el-input v-model="form2.username" />
        </el-form-item>
        <el-form-item
          :label="$t('system.password')"
          prop="password"
        >
          <el-input v-model="form2.password" />
        </el-form-item>
        <el-form-item
          :label="$t('system.icon')"
          label-width="100px"
          prop="type"
        >
          <div
            class="default-icon"
          >
            <div
              class="box"
              v-for="(item) in defaultIcon"
              @click="chooseDefaultIcon(item)"
              :key="item"
            >
              <img
                :src="item"
                alt=""
              >
              <em
                class="el-icon-success"
                style="color:green;"
              />
            </div>
          </div>
          <em
            class="upIcon el-icon-success"
            v-if="uploadIcon"
          />
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
            @click="submitForm2('ruleForm2')"
          >
            {{ $t('system.sure') }}
          </el-button>
          <el-button @click="dialogVisibleEdit = false">
            {{ $t('system.cancel') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { system } from '@/tools/api.js'
export default {
  components: {
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      systemDetails: [],
      systemType: this.$route.query.systemType,
      active: false,
      searchName: '',
      dialogVisible: false,
      dialogVisibleEdit: false,
      imageUrl: '',
      defaultIcon: [
        require('../assets/images/bigData.png')
      ],
      form: {
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
        status: 'active'
      },
      form2: {}
    }
  },
  computed: {
    rules () {
      return {
        systemName: [
          { required: true, message: this.$t('system.tootipSystemName'), trigger: 'blur' }
        ],
        product: [
          { required: true, message: this.$t('system.tootipProduct'), trigger: 'blur' }
        ],
        url: [
          { required: true, message: this.$t('system.tootipUrl'), trigger: 'blur' }
        ],
        version: [
          { required: true, message: this.$t('system.tootipVersion'), trigger: 'blur' }
        ],
        region: [
          { required: true, message: this.$t('system.tooltipRegion'), trigger: 'blur' }
        ],
        vendor: [
          { required: true, message: this.$t('system.tooltipVendor'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: this.$t('system.tooltipVendor'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('system.tooltipVendor'), trigger: 'blur' }
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
    handleEdit (row) {
      this.dialogVisibleEdit = true
      let copy = Object.assign({}, row)
      this.form2 = copy
    },
    handleDelete (row) {
      let id = row.id
      system.deleteSystems(id).then(res => {
        this.searchSystems()
      })
    },
    btnDelete (Id) {
      let id = Id
      system.deleteSystems(id).then(res => {
        this.searchSystems()
      })
    },
    addSystems () {
      this.dialogVisible = true
    },
    editSystem (item) {
      this.dialogVisibleEdit = true
      let copy = Object.assign({}, item)
      this.form2 = copy
    },
    changeTable () {
      this.active = !this.active
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          system.addSystems(this.form).then(res => {
            this.$message({
              duration: 2000,
              message: this.$t('system.addStstemSucess'),
              type: 'success'
            })
            this.goDetail()
            this.searchSystems()
            this.dialogVisible = false
            this.form = {
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
              status: 'active'
            }
          })
        } else {
          return false
        }
      })
    },
    submitForm2 (formName2) {
      this.$refs[formName2].validate((valid) => {
        if (valid) {
          system.updateSystems(this.form2).then(res => {
            this.$message({
              duration: 2000,
              message: this.$t('system.updateStstemSucess'),
              type: 'success'
            })
            this.searchSystems()
            this.dialogVisibleEdit = false
          })
        }
      })
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
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
      font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
      font-weight: 300;
      color: #FFFFFF;
      margin-top: 50px;
      box-shadow: 0px 16px 8px rgba(94 ,44 ,204 ,0.3);
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
          background: #8A7DF9;
          border-radius: 5px;
          padding: 0;
          font-size: 14px;
          font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
          font-weight: 200;
          color: #FFFFFF;
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
      min-height: 580px;
      position: relative;
      padding-bottom:100px;
      .stateIcon{
        position: relative;
        top: 4px;
        right: 4px;
      }
      .tableDelete{
        border: none;
        padding: 0;
        width: 43px;
        height: 24px;
        background: #EFEFEF;
        border-radius: 5px;
        font-size: 14px;
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: 200;
        color: #7A6E8A;
      }
    }
  }
  .el-dialog{
        width: 912px;
        height: 502px;
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
              font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
              font-weight: 300;
              color: #380879;
              line-height: 36px;
              padding-right: 15px;
          }
          .el-input__inner {
              width: 240px;
          }
          .btns{
            margin-top: 88px;
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
            font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
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
