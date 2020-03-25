<template>
  <el-row class="developing-box">
    <div class="developing" />
    <div class="developing-tips">
      {{ $t('common.developing') }}
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'Developing',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
.developing-box{
    background:#f4f4f4;
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 80px;
    .developing{
        background: url('../../assets/images/construct.png') center;
        width:445px;
        height:371px;
        margin:-186px 0 0 -223px;
        position: relative;
        top:50%;
        left:50%;
    }
    .developing-tips{
        position: relative;
        text-align: center;
        margin-top: 25px;
        font-size: 1.5em;
        top:52%;
    }
}
</style>
