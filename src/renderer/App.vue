<template>
  <div id="app">
    <router-view class="content-box"></router-view>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    name: 'mocker',
    data(){
      return {}
    },
    mounted(){
      this.$store.dispatch('initEnv').then(dataPath => {
        if(dataPath){
          this.$router.push('/home')
        }else{
          this.$router.push('/setting')
        }
      })
    }
  }
</script>

<style lang="stylus">
  html{
    overflow:hidden !important;
  }

  body{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif !important;
  }

  #app{
    position:relative;
    height:100%;
  }

  .content-box{
    height:100%;
  }

  @import '../../node_modules/material-design-icons/iconfont/material-icons.css'
  @import '../../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: #766BD2
    accent: $red.accent-2
    secondary: $grey.lighten-1
    info: #2196f3
    warning: $orange.darken-2
    error: $red.base
    success: #4caf50
  }

  @import '../../node_modules/vuetify/src/stylus/main'

  ::-webkit-scrollbar-track-piece{
    width:8px;
    background-color:#707070 ;
  }

  ::-webkit-scrollbar{
    width:8px;
    height:6px ;
  }

  ::-webkit-scrollbar-thumb{
    height:50px;
    background:#505050;
    cursor:pointer;
  }

  ::-webkit-scrollbar-thumb:hover{
    background:#202020;
    cursor:pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
