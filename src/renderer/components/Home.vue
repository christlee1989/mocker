<template>
  <v-app dark toolbar>
    <MyHeader></MyHeader>
    <SideBar @openConsole="showConsole = true" :style="{paddingBottom:showConsole ? '200px' : '0'}"></SideBar>
    <main class="main" :style="{paddingBottom:showConsole ? '200px' : '0'}">
      <transition name="fade" mode="out-in">
        <router-view class="content"></router-view>
      </transition>
    </main>
    <Console :show="showConsole" @close="showConsole = false"></Console>
  </v-app>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/2.
   */
  import MyHeader from './Header.vue'
  import SideBar from './SideBar.vue'
  import Console from './Console.vue'

  export default{
    components:{
      MyHeader,
      SideBar,
      Console
    },
    data(){
      return {
        drawer: true,
        testParam:true,
        showConsole:false
      }
    },
  }

</script>

<style scoped lang="scss">

  .main{
    height:100%;
    padding-left:300px;
    padding-top:50px;
    overflow-y:auto;

    .content{
      padding:10px;
    }
  }

</style>
