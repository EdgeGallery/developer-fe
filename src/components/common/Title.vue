<template>
  <div class="my-comp-title">
    <div class="title">
      <span>{{ this.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {},
  mounted () {}
}

</script>
<style lang='less' scoped>
.my-comp-title{
  .title{
    border-left: 2px solid #29ABE0;
    span{
      margin-left: 5px;
      font-size: 18px;
      font-weight: 800;
    }
  }
}

</style>
