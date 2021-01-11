<template>
  <div class="service-content">
    <Opers
      :selected-service="selectedService"
      :service-list="serviceList"
      @showAbilityHomePage="showAbilityHomePage"
      @reloadContent="reloadContent"
    />
    <div
      class="doc-div"
    >
      <API
        :api-file-idprop="apiFileId"
        :service-detailprop="serviceDetail"
        :is-delete-apiprop="false"
        v-if="apiFileId"
      />
      <div
        v-else
        class="noServiceInfo"
      >
        {{ $t('api.noDataNotice') }}
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/API.vue'
import Opers from './Opers.vue'
import { Api } from '../../tools/api.js'
export default {
  components: {
    API,
    Opers
  },
  props: {
    groupId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      serviceDetail: {
        capabilityType: '',
        serviceName: '',
        uploadTime: '',
        version: ''
      },
      apiFileId: 'default',
      serviceList: [],
      selectedService: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    reloadContent (seletedLabel) {
      for (let i = 0; i < this.serviceList.length; i++) {
        if (this.serviceList[i].service === seletedLabel) {
          this.apiFileId = this.serviceList[i].apiFileId
          this.serviceDetail = {
            serviceName: this.serviceList[i].service,
            uploadTime: this.dateChange(this.serviceList[i].uploadTime),
            version: this.serviceList[i].version
          }
          break
        }
      }
    },
    showAbilityHomePage () {
      this.$emit('showAbilityHomePage')
    },
    initServices () {
      Api.getServiceListApi(this.groupId)
        .then(res => {
          if (res.data && res.data.capabilityDetailList) {
            let tmpServiceList = res.data.capabilityDetailList
            tmpServiceList = tmpServiceList.filter((item) => {
              return item.service
            })
            if (tmpServiceList.length > 0) {
              this.serviceList = tmpServiceList
              this.selectedService = tmpServiceList[0].service
              this.apiFileId = tmpServiceList[0].apiFileId
            }
          }
        })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let changeDate = Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
        return changeDate
      }
    }
  },
  created () {
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {
    this.initServices()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
</style>
