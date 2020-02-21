<template>
  <div class="home">
    <div class="main-div">
      <div class="topLine">
        <div class="title">
          <h2>{{$t('home.bannerTitle')}}</h2>
          <p>
            {{$t('home.bannerText1')}}
            <br />{{$t('home.bannerText2')}}
          </p>
        </div>
      </div>
      <div class="common-appliaction">
        <div class="step">{{$t('home.step')}}</div>
        <div class="tabs">
          <div class="tabsPart" v-for="(item,index) in commonApp" :key="index">
            <router-link :to='item.link'>
              <div>
                <span>{{index + 1}}</span>
              </div>
              <img :src="item.src" alt="">
              <h5 style="text-align: center;">{{$t(item.title)}}</h5>
            </router-link>
          </div>
        </div>
      </div>
      <div class="showLogo">
        <el-link
          target="_blank"
          v-for="item in aLinkList"
          :key="item.id"
          :href="item.url"
          :underline="false"
        >
          <img :src="item.src" :title="item.title" />
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { COMMON_APP, LIST, A_LINK_LIST } from './home.js'
export default {
  name: '',
  data () {
    return {
      commonApp: COMMON_APP,
      list: LIST,
      showMain: false,
      inputValue: '',
      showError: false,
      dialogVisible: false,
      aLinkList: A_LINK_LIST
    }
  },
  computed: {
    ...mapState(['activeTab'])
  },
  methods: {
    jumpTo (item) {
      this.$store.commit('changeTab', item.id)
      this.$router.push(item.path)
    },
    getInputValue () {
      this.$store.commit('getKeyValue', this.inputValue)
    }
  },
  created () {
    if (sessionStorage.getItem('key')) {
      this.showMain = true
    } else {
      this.dialogVisible = true
    }
  },
  mounted () {
  }
}
</script>

<style lang='less' scoped>
.home {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  // width: calc(96%);
  height: calc(100% - 65px);
  overflow-y: scroll;
  top:65px;
  .topLine {
    height: 400px;
    background: url("../../assets/images/bg2.png") no-repeat center -80px;
    background-size: cover;
    .title {
      color: #fff;
      padding: 120px 0 0 50px;
      p {
        margin-top: 20px;
        line-height: 30px;
      }
    }
  }
  @media screen and (max-width: 1380px) {
    .topLine {
      height: 360px;
      background: url("../../assets/images/bg2.png") no-repeat center -20px;
      background-size: cover;
      .title {
        padding: 100px 0 0 50px;
      }
    }
  }
  .flowchart {
    padding: 20px 15%;
    text-align: center;
    background: #f5f5f5;
    img {
      width: 90%;
    }
  }
  .showLogo {
    padding: 25px 10%;
    text-align: center;
    a {
      display: inline-block;
      width: 9%;
      margin: 0 1% 1%;
      img {
        width: 80%;
        max-width: 110px;
        opacity: 0.7;
      }
      img:hover {
        opacity: 1;
      }
    }
  }
  .showLogo a:last-child {
    width: 14%;
  }
  .showLogo a:last-child img {
    width: 100%;
    max-width: 150px;
  }
  .normalPart {
    padding: 25px 0;
    .la {
      padding: 30px 0 0 30%;
      .main-title {
        span {
          display: inline-block;
          height: 40px;
          font-size: 25px;
        }
      }
      .main-desc {
        font-size: 14px;
        margin-top: 15px;
        line-height: 30px;
        padding-right: 30px;
      }
      .main-operate {
        margin-top: 25px;
      }
    }
  }
  .bg-dark {
    background: #f5f5f5;
  }
  a {
    color: #fff;
  }
  .homeTabs {
    display: flex;
    justify-content: space-around;
    height: 50px;
    .tabs {
      width: 20%;
      line-height: 50px;
      text-align: center;
      border: 1px solid #fff;
      background: #4761a6;
      font-size: 18px;
      color: #fff;
      padding-left: 5px;
      position: relative;
    }
    .tabs:before {
      margin-right: 7px;
    }
  }
  .common-appliaction {
    margin-bottom: 20px;
    width: 95%;
    margin: 0 auto;
    background: white;
    position: relative;
    top: -35px;
    .step{
      position: absolute;
      top: 23px;
      left: 23px;
      font-size: 20px;
      color: #282B33;
    }
    .tabs {
      display: flex;
      justify-content: space-around;
      padding: 70px 0 55px;
      .tabsPart {
        height: 265px;
        width: 23%;
        box-shadow: 2px 2px 2px 2px #8888883f;
        overflow: hidden;
        a{
          display: block;
          height: 100%;
          text-align: center;
          padding-top: 50px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          div{
            height: 100px;
            width: 100px;
            background: rebeccapurple;
            position: absolute;
            top: -50px;
            left: -50px;
            border-radius: 50%;
            span{
              display: inline-block;
              position: absolute;
              left: 65px;
              top: 65px;
            }
          }
          img {
            width: 98px;
            height: 98px;
          }
          h5 {
            font-weight: bold;
            color: white;
            font-size: 26px;
            margin-top: 30px;
          }
          @media screen and (max-width: 1380px) {
              h5 {
                  font-size: 22px;
                  margin-top: 20px;
              }
          }
        }
      }
      @media screen and (max-width: 1380px){
        .tabsPart {
          height: 200px;
          a{
            padding-top: 30px;
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .tabsPart:nth-child(1){
         background: linear-gradient(to top left, #8448d7 , #6c92fa 50%,#6c93ff );
         a{
           div{
             background: #7e6efb;
           }
         }
      }
      .tabsPart:nth-child(2){
         background: linear-gradient(to top left, #dac939, #acdb7e 50%, #a7dd82);
         a{
           div{
             background: #a8f742;
           }
         }
      }
      .tabsPart:nth-child(3){
         background: linear-gradient(to top left, #06dced, #80e1d9 50%, #80e1d9);
         a{
           div{
             background: #29dde2;
           }
         }
      }
      .tabsPart:nth-child(4){
         background: linear-gradient(to top left, #cdabff, #95c6ff 50%, #85caff);
         a{
           div{
             background: #70b9f1;
           }
         }
      }
    }
  }
}
.el-row {
  margin: 0 !important;
}
.dialog {
  width: 30%;
  height: 200px;
  border: 1px solid #ddd;
  padding: 2%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15%;
  margin-top: -180px;
}
.keyInput {
  margin: 20px 0 10px;
}
.keyerror {
  color: #f66f6a;
}
.el-button--primary {
  margin-top: 20px;
}
</style>
