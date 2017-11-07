<template>
  <v-app class="setting-container">
    <img class="logo" src="../assets/img/mocker-logo-64.png">
    <div class="desc">欢迎使用Mocker，请设置工作目录</div>
    <div class="dir-input">
      <input type="text" class="input" v-model="dataPath">
      <v-btn color="primary" small @click="chooseDir">选择</v-btn>
    </div>
    <v-btn :disabled="!dataPath || loading" :loading="loading" color="primary" @click="okClick">确定</v-btn>
  </v-app>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/3.
   */
  import {mkdir,openDirectory} from '../../utils/util'

  export default{
    data(){
      return {
        dataPath:this.$store.state.common.dataPath,
        loading:false
      }
    },
    methods:{
      chooseDir(){
        openDirectory('选择工作目录',this.dataPath,dir => {
          if(dir){
            this.dataPath = dir
          }
        })
      },
      okClick(){
        this.loading = true
        let reVal = mkdir(this.dataPath)
        if(reVal.success){
          this.$store.dispatch('setDataPath',this.dataPath).then(() => {
            this.$router.push('/home')
          })
        }else{
          this.$messager.show(reVal.msg,{color:'error'})
          this.loading = false
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../assets/css/variable.scss";

  .setting-container{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;

    .logo{
      display:block;
      width:64px;
      height:64px;
    }

    .desc{
      font-size:18px;
      margin-top:10px;
      color:#404040;
    }

    .dir-input{
      display:flex;
      align-items:center;
      margin-bottom:20px;

      .input{
        display:block;
        height:28px;
        width:240px;
        transition:border .3s;
        border:1px solid #dfdfdf;
        padding:0 5px;

        &:focus{
          outline:none;
          border:1px solid $primary-color;
        }
      }
    }

  }

</style>
