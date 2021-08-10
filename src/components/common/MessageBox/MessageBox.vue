<template>
  <div
    class="eg-messagebox-outer"
    v-if="visible"
  >
    <div class="eg-messagebox-container">
      <div class="content">
        <div
          class="icon-wrapper"
          :class="'icon-wrapper-'+type"
        >
          <i
            class="icon"
            :class="'el-icon-'+type"
          />
        </div>
        <div class="title">
          {{ title }}
        </div>
        <div class="desc">
          {{ desc }}
        </div>
        <button
          class="eg-messagebox-button"
          @click="handleCancel"
        >
          {{ cancelText }}
        </button>
        <button
          v-if="confirmText !== ''"
          class="eg-messagebox-button-confirm"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EGMessageBox',
  data () {
    return {
      type: 'info',
      title: '',
      desc: '',
      visible: true,
      promise: null,
      cancelText: '知道了',
      confirmText: ''
    }
  },
  methods: {
    init () {
      this.visible = true
      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject }
      })
    },
    destroy () {
      this.visible = false
      setTimeout(() => {
        this.$destroy(true)
        if (this.$el) {
          this.$el.parentNode.removeChild(this.$el)
        }
      })
    },
    handleCancel () {
      this.promise.reject()
      this.destroy()
    },
    handleConfirm () {
      this.promise.resolve()
      this.destroy()
    }
  }
}
</script>

<style scoped>
@keyframes innerIconAnimation {
  0% {
    transform: scale(0);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes outerIconAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

.eg-messagebox-outer {
  position: fixed;
  _position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  margin: 0 auto;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background-color: rgba(33,33,33,0.15);
  filter: (2px);
  text-align: center;
}

.eg-messagebox-container {
  width: 380px;
  padding: 30px;
  margin: 30px;
  min-height: 240px;
  background-color: #fff;
  border-radius: 8px;
  border: solid 1px #fff;
  box-shadow: 0 0 10px 3px #d0cfd483;
  font-family: defaultFont;
  color: #62517a;
}

.content {
  text-align: center;
}

.title {
  padding-top: 20px;
  font-size: 21px;
}

.desc {
  padding-top: 10px;
}

.eg-messagebox-button {
  margin: 20px 10px 0 10px;
  display: inline-block;
  outline: none;
  width: 114px;
  height: 33px;
  border: solid 1px #62517a;
  border-radius: 6px;
  background-color: #fff;
  color: #62517a;
  transition: 0.5s;
}

.eg-messagebox-button:hover {
  cursor: pointer;
  background-color: #5844be;
  color: #edecf7;
}

.eg-messagebox-button-confirm {
  margin: 20px 10px 0 10px;
  display: inline-block;
  outline: none;
  width: 114px;
  height: 33px;
  background-color: #5844be;
  color: #edecf7;
  border: solid 1px #62517a;
  border-radius: 6px;
  transition: 0.5s;
}

.eg-messagebox-button-confirm:hover {
  cursor: pointer;
  background-color: #fff;
  color: #62517a;
}

.icon {
  font-size: 60px;
  z-index: 999;
  animation-name: innerIconAnimation;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
}

.icon-wrapper {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: outerIconAnimation;
  animation-duration: 0.5s;
}

.el-icon-success {
  color: #3ac372;
}

.icon-wrapper-success {
  border: solid 1px #beebd1;
  background-color: #d8f3e3;
}

.el-icon-warning {
  position: relative;
  left: -2px;
  color: #ff9700;
}

.icon-wrapper-warning {
  border: solid 1px #ffd9a3;
  background-color: #ffeacc;
}

.el-icon-error {
  color: #ea2f38;
}

.icon-wrapper-error {
  border: solid 1px #f8b5b9;
  background-color: #fbd5d7;
}

.el-icon-info {
  color: #5844be;
}

.icon-wrapper-info {
  border: solid 1px #c3bce8;
  background-color: #dedaf2;
}
</style>
