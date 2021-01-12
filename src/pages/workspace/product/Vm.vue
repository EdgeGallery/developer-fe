<template>
  <div class="vmContainer">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/work' }">
        {{ $t('breadCrumb.workspace') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.detail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="iframeContainer">
      <iframe
        id="iframe"
        :src="src"
        title=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {},
  mounted () {
    let link = sessionStorage.getItem('Src')
    let userId = sessionStorage.getItem('userId')
    let userName = sessionStorage.getItem('userName')
    let token = sessionStorage.getItem('accessToken')
    this.src = link + '/overview?egUserId=' + userId + '&egUserName=' + userName + '&egToken=' + token
  }
}

</script>
<style lang='less' scoped>
.vmContainer{
  height:100%;
  .iframeContainer{
    height:calc(100% - 70px);
    #iframe{
      height: 100%;
      width: 100%;
      border:none;
    }
  }
}
</style>
