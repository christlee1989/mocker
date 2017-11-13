<template>
  <div class="header-container">
    <div class="left-box">
      <v-tooltip bottom>
        <v-btn v-show="activeProject && projectServices.length" slot="activator" class="header-btn" icon large @click="toggleServer">
          <v-icon large>{{isStart ? 'stop' : 'play_arrow'}}</v-icon>
        </v-btn>
        <span>{{isStart ? '停止服务' : '启动服务'}}</span>
      </v-tooltip>
      <!--<v-tooltip bottom>-->
        <!--<v-btn v-show="activeProject && projectServices.length" slot="activator" class="header-btn" icon large @click="stopServer">-->
          <!--<v-icon large>play_arrow</v-icon>-->
        <!--</v-btn>-->
        <!--<span>停止服务</span>-->
      <!--</v-tooltip>-->
    </div>

    <span class="header-title">{{title}}</span>

    <div class="right-box">
      <v-tooltip left>
        <v-btn v-show="activeProject && projectServices.length" slot="activator" class="header-btn" icon @click="exportJson">
          <v-icon>file_upload</v-icon>
        </v-btn>
        <span>导出配置</span>
      </v-tooltip>
    </div>

  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/1.
   */

  export default{
    data(){
      return {}
    },
    computed:{
      activeProject(){
        return this.$store.state.project.activeProject
      },
      services(){
        return this.$store.state.project.services
      },
      projectServices(){
        return this.services[this.activeProject] || []
      },
      title(){
        return this.$store.state.common.title
      },
      startedServer(){
        return this.$store.state.server.startedServer
      },
      isStart(){
        return !!this.startedServer.find(id => {
          return id === this.activeProject
        })
      }
    },
    methods:{
      exportJson(){
        this.$store.dispatch('GET_WRITE_FILE_PATH').then(filename => {
          this.$store.dispatch('WRITE_JSON_FILE',filename).then(res => {
            this.$messager.show('导出配置文件成功',{color:'success'})
          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })
        }).catch(err => {

        })
      },
      startServer(){
        this.$store.dispatch('startServer').then(res => {
          this.$messager.show('开启服务成功',{color:'success'})
        }).catch(err => {
          this.$messager.show(err,{color:'error'})
        })
      },
      stopServer(){
        this.$store.dispatch('stopServer').then(res => {
          this.$messager.show('停止服务成功',{color:'success'})
        }).catch(err => {
          this.$messager.show(err,{color:'error'})
        })
      },
      toggleServer(){
        if(this.isStart){
          this.stopServer()
        }else{
          this.startServer()
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../assets/css/variable.scss";

  .header-container{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:5;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    will-change: padding-left;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12);
    background-color: $primary-color;
    border-color: $primary-color;
    padding-left:300px;
    height:50px;
    line-height:50px;
    text-align:center;

    .left-box{
      height:100%;
      display:flex;
      align-items:center;
      position:absolute;
      left:300px;
      top:0;
    }

    .right-box{
      height:100%;
      display:flex;
      align-items:center;
      position:absolute;
      right:0;
      top:0;
    }

    .header-btn{
      margin:0 8px;
    }

    .header-title{
      font-size:16px;
    }
  }

</style>
