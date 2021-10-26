<template>
  <div class="application">
    <div class="left-menu">
      <ProjectList />
    </div>
  </div>
</template>

<script>
import ProjectList from './application/ProjectList.vue'
export default {
  components: {
    ProjectList
  }
}
</script>

<style lang="less" scoped>
  .application{
    width: 100%;
    height: 100%;
    .left-menu{
      width: 10%;
      height: 80%;
      border: 1px solid #ddd;
      position: relative;
      top: 10%;
      border: 2px solid #838ACB;
      border-left: none;
      border-radius: 0 8px 8px 0;
      z-index: 15;
    }
    .left-menu::after {
      content: "";
      background: url("../../assets/images/index/index_mask.png") no-repeat center;
      background-size: cover;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  }
</style>
