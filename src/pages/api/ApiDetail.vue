<template>
  <div class="apidetail">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/mep-eco' }">
        {{ $t('breadCrumb.mepecoapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.apiDetail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="iframe">
      <iframe
        id="iframe"
        :src="apiHtml"
        frameborder="0"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Apidetail',
  data () {
    return {
      tableData: [],
      apiHtml: 'http://159.138.146.235:8080/html/face_recognition_20191226191823150.html'
    }
  },
  mounted () {
    function iframeHeight () {
      const oIframe = document.getElementById('iframe')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = (Number(deviceHeight) - 200) + 'px'
    }
    iframeHeight()
    window.onresize = function () {
      iframeHeight()
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.apidetail{
  .iframe iframe{
      width: 100%;
  }
}
</style>
