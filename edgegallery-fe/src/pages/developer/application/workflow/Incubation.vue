<template>
  <div class="incubation common-workflow">
    <div>
      <div
        class="common-center"
      >
        <span
          class="common-workflow-item capability-center"
          :class="isCapabilityActive?'capability-center-active':''"
          @click="checkCapabilityCenter"
        />
        <span
          class="capability-active"
          v-if="isCapabilityActive"
        />
      </div>
      <div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-application"
            @click="checkApplication"
          />
          <span
            class="capability-active"
            v-if="isCapabilityActive"
          />
        </div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-image"
          />
          <span
            class="capability-active"
            v-if="isCapabilityActive"
          />
        </div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-test"
          />
          <span
            class="capability-active"
            v-if="isCapabilityActive"
          />
        </div>
      </div>
      <div>
        <div
          class="common-center"
        >
          <span
            class="common-workflow-item app-sandbox"
          />
          <span
            class="capability-active"
            v-if="isCapabilityActive"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Incubation',
  components: {

  },
  data () {
    return {
      isCapabilityActive: false,
      isApplicationActive: false,
      isSandboxActive: false,
      isTestActive: false

    }
  },
  methods: {
    checkCapabilityCenter () {
      this.$emit('showCapabilityCenterDlg')
    },
    checkApplication () {
      this.$emit('showAppWarningDlg')
    }
  }
}
</script>

<style lang="less" scoped>
.incubation{
  .capability-center{
    left: 155px;
    top: 30px;
    background: url("../../../../assets/images/application/app_capability_center.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.capability-center::after{
    width: 0;
  }
  .capability-center-active{
    background: url("../../../../assets/images/application/app_capability_active.png") no-repeat center;
    background-size: contain;
  }
  .common-center>.capability-center-active::after{
    content:'';
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("../../../../assets/images/application/app_mark_box1.png") no-repeat center;
    background-size: contain;
    position: relative;
    top: 20px;
    left: -30px;
  }
  .app-application{
    left: 30px;
    top: 70px;
    background: url("../../../../assets/images/application/app_application.png") no-repeat center;
    background-size: contain;
  }
  .app-application-active{
    background: url("../../../../assets/images/application/app_application_active.png") no-repeat center;
    background-size: contain;
  }
  .app-image{
    left: 335px;
    top: -20px;
    background: url("../../../../assets/images/application/app_image.png") no-repeat center;
    background-size: contain;
  }
  // .app-image-active{
  //   background: url("../../../../assets/images/application/app_image_active.png") no-repeat center;
  //   background-size: contain;
  // }
  .app-test{
    left: 495px;
    top: -110px;
    background: url("../../../../assets/images/application/app_test.png") no-repeat center;
    background-size: contain;
  }
  // .app-test-active{
  //   background: url("../../../../assets/images/application/app_test_active.png") no-repeat center;
  //   background-size: contain;
  // }
  .app-sandbox{
    left: 195px;
    top: -80px;
    background: url("../../../../assets/images/application/app_sandbox.png") no-repeat center;
    background-size: contain;
  }
  // .app-sandbox-active{
  //   background: url("../../../../assets/images/application/app_sandbox_active.png") no-repeat center;
  //   background-size: contain;
  // }
}
</style>
