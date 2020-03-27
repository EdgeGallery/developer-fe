<template>
  <div class="how">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/test/how' }">
        {{ $t('breadCrumb.test') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $t('breadCrumb.howToTest') }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="how_div">
      <div class="docs-tap">
        <h2>{{ $t('test.howToTest.howToTest') }}</h2>
        <p>
          <span class="lt">{{ $t('test.howToTest.updated') }}: 2019-09-06 10:34:49</span>
          <span class="rt">
            <span class="el-icon-edit"><a
              target="_blank"
              href="https://github.com/EdgeGallery/developer-fe/blob/master/public/MECHOW.md"
            >{{ $t('test.howToTest.modify') }}</a></span>
            <span class="el-icon-share">{{ $t('test.howToTest.share') }}</span>
          </span>
        </p>
      </div>
      <div id="test-editor">
        <mavon-editor
          v-model="markdownSource"
          :toolbars-flag="false"
          :editable="false"
          :subfield="false"
          default-open="preview"
          :box-shadow="false"
          preview-background="#ffffff"
        />
      </div>
      <div>
        <el-button
          type="primary"
          size="small"
          class="applyBtn"
          @click="pushTo"
        >
          {{ $t('test.howToTest.apply') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'How',
  data () {
    return {
      markdownSource: ''
    }
  },
  mounted () {
    let url = './MECHOW.md'
    axios(url).then(res => {
      this.markdownSource = res.data
    })
  },
  methods: {
    pushTo () {
      this.$router.push('/mecDeveloper/test/apply')
    }
  }
}
</script>

<style lang='less'>
.how{
  .how_div{
    background-color: #fff;
    padding: 40px;
    .docs-tap{
      h2{
        padding:0 0 20px;
      }
      p{
        padding:5px 0;
        font-size:14px;
        span.rt{
          margin-right:12px;
          color:#409EFF;
          span{
            margin-right:20px;
          }
          a{
            color:#409EFF;
          }
        }
      }
    }
    #test-editor{
      margin-top:40px;
      line-height: 30px;
    }
    h1{
      padding:15px 0;
    }
    .applyBtn{
      padding: 9px 15px;
      margin: 15px 0 0 0;
    }
  }
}
</style>
