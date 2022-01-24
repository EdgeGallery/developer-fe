<template>
  <div class="select_app_main">
    <el-dialog
      :visible.sync="isSelectVisible"
      :close-on-click-modal="false"
      class="default_dialog"
      width="50%"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('toolBox.appEditor.editAppTitle') }}
      </div>
      <div>
        <el-table
          row-key="hostId"
          :data="allAppData"
          class="tableStyle"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="name"
            :label="$t('system.name')"
            min-width="10%"
          />
          <el-table-column
            prop="version"
            :label="$t('system.version')"
            min-width="10%"
          />
          <el-table-column
            prop="provider"
            :label="$t('toolBox.provider')"
            min-width="10%"
          />
          <el-table-column
            prop="industry"
            :label="$t('workspace.industry')"
            min-width="10%"
          />
          <el-table-column
            prop="type"
            :label="$t('system.type')"
            min-width="15%"
          />
          <el-table-column
            prop="affinity"
            :label="$t('toolBox.architecture')"
            min-width="10%"
          />
          <template slot="empty">
            <div class="empty_img">
              <p>{{ $t('api.noDataNotice') }}</p>
            </div>
          </template>
        </el-table>
        <div class="pagebar">
          <pagination
            :table-data="allAppData"
            :list-total="listTotal"
            @getCurrentPageData="getCurrentPageData"
            ref="pagination"
          />
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="closeDlg"
          class="bgBtn"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="confirm()"
          class="bgBtn"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from '../../../components/common/Pagination.vue'
import { applicationEditorApi } from '@/tools/api.js'
import commonUtil from '../../../tools/commonUtil.js'
export default {
  name: 'SelectApplicationDlg',
  components: {
    pagination
  },
  props: {
    isSelectVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      limitSize: 12,
      offsetPage: 0,
      listTotal: 0,
      allAppData: [],
      syncParams: []
    }
  },
  methods: {
    closeDlg () {
      this.$emit('closedlg')
      this.syncParams = []
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    handleSelectionChange (val) {
      this.syncParams = val
    },
    getAppData () {
      let _searchCondition = {
        types: [],
        affinity: [],
        industry: [],
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        queryCtrl: {
          appName: '',
          status: ['Published'],
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: 'createTime',
          sortType: 'desc'
        }
      }
      applicationEditorApi.getAppData(_searchCondition).then((res) => {
        this.allAppData = res.data.results
        this.listTotal = res.data.total
      })
    },
    confirm () {
      let params = []
      this.syncParams.forEach(item => {
        let _obj = {
          appId: '',
          packageId: ''
        }
        _obj.appId = item.appId
        _obj.packageId = item.packageId
        params.push(_obj)
      })
      applicationEditorApi.syncApplication(params).then(res => {
        this.syncParams = []
        this.$emit('getListData')
        this.closeDlg()
      }).catch((error) => {
        let defaultMsg = this.$t('toolBox.appEditor.syncFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.closeDlg()
      })
    }
  },
  mounted () {
    this.getAppData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getAppData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getAppData()
    }
  }
}
</script>
<style lang="less">
.select_app_main{
  .el-dialog__body{
    padding: 20px !important;
  }
  .dialog-footer{
    margin-top: 50px;
    padding: 0 !important;
  }
  .el-table thead th{
    background: #f5f5f5;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    border: 1px solid #a19aac;
    background: none;
  }
}
</style>
