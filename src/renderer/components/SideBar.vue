<template>
  <div class="sidebar-container">
    <div class="sidebar-title">
      <v-tooltip bottom>
        <v-btn color="primary" slot="activator">
          <v-icon>get_app</v-icon>
          &nbsp;导入项目
        </v-btn>
        <span>从配置文件导入</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn color="primary" slot="activator" @click="$router.replace('/home/new/null')">
          <v-icon>add_circle</v-icon>
          &nbsp;新建项目
        </v-btn>
        <span>创建新项目</span>
      </v-tooltip>
    </div>

    <Navbars :data="fmtProjects" v-if="projects.length" @click="navClick"></Navbars>
    <div v-if="loaded && !projects.length" class="secondary--text text-xs-center body-2 noproject">暂无项目</div>
    <Loading v-if="!loaded"></Loading>

    <div class="side-footer">
      <v-tooltip top>
        <v-btn icon slot="activator" @click="openConsole">
          <v-icon>computer</v-icon>
        </v-btn>
        <span>打开日志监控</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/1.
   */
  import Navbars from './common/Navbar.vue'
  import Loading from './common/Load.vue'

  export default{
    components:{
      Navbars,
      Loading
    },
    data(){
      return {
        loaded:false
      }
    },
    computed:{
      projects(){
        return this.$store.state.project.projects
      },
      fmtProjects(){
        return this.projects.map(item => {
          return {
            value:item._id,
            title:item.name,
            second:item.services || []
          }
        })
      }
    },
    methods:{
      openConsole(){
        this.$emit('openConsole')
      },
      navClick(index,value,secondFlag){
        this.$store.commit('SET_ACTIVE_PROJECT',value)
        this.$router.push(`/home/new/${value}`)
      }
    },
    created(){
      this.$store.dispatch('GET_ALL_PROJECT').then(res => {
        this.loaded = true
      }).catch(err => {
        this.loaded = true
        this.$messager.show(err,{color:'error'})
      })
    }
  }

</script>

<style scoped lang="scss">

  .sidebar-container{
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    pointer-events: auto;
    position: fixed;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 300px;
    top: 0;
    left: 0;
    will-change: transform;
    z-index: 6;
    background-color: #424242;
    border-right:1px solid rgba(255,255,255,0.12);
    height:100%;
    padding-bottom:50px;

    .sidebar-title{
      height:50px;
      background:#303030;
      display:flex;
      justify-content: space-around;
      align-items: center;
      padding:0 10px;
    }

    .noproject{
      margin-top:20px;
    }

    .side-footer{
      display:flex;
      flex-direction: row-reverse;
      height:50px;
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      border-top:1px solid rgba(255,255,255,0.12);
    }
  }

</style>
