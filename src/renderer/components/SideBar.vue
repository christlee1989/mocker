<template>
  <div class="sidebar-container">
    <div class="sidebar-title">
      <v-tooltip bottom>
        <v-btn color="primary" slot="activator" @click="importJson">
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

    <Navbars ref="navbar" :data="fmtProjects" v-if="projects.length" @click="navClick" @contextmenu="onContextMenu"></Navbars>
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

    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline">确认删除？</v-card-title>
        <v-card-text>点击确认将永久删除{{secondFlag ? '服务' : '项目'}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="deleteItem">确认</v-btn>
          <v-btn color="darken-1" flat @click.native="dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/1.
   */
  import Navbars from './common/Navbar.vue'
  import Loading from './common/Load.vue'
  import {remote} from 'electron'
  const {Menu,MenuItem} = remote

  export default{
    components:{
      Navbars,
      Loading
    },
    data(){
      return {
        dialog:false,
        loaded:false,
        contextMenuValue:'',
        projectMenu:null,
        serviceMenu:null,
        secondFlag:false
      }
    },
    computed:{
      projects(){
        return this.$store.state.project.projects
      },
      services(){
        return this.$store.state.project.services
      },
      fmtProjects(){
        return this.projects.map(item => {
          return {
            value:item._id,
            title:item.name,
            second:this.services[item._id] || []
          }
        })
      },
      activeService(){
        return this.$store.state.project.activeService
      },
      activeProject(){
        return this.$store.state.project.activeProject
      }
    },
    methods:{
      openConsole(){
        this.$emit('openConsole')
      },
      navClick(index,value,secondFlag){
        if(secondFlag){
          this.$store.commit('SET_ACTIVE_SERVICE',value)
          this.$router.push(`/home/new_service/${value}`)
        }else{
          this.$store.commit('SET_ACTIVE_PROJECT',value)
          this.$router.push(`/home/new/${value}`)
          this.$store.dispatch('GET_SERVICES').then(res => {

          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })

        }
      },
      importJson(){
        this.$store.dispatch('IMPORT_JSON').then(res => {
          this.$messager.show('导入项目成功',{color:'success'})
        }).catch(err => {
          this.$messager.show(err,{color:'error'})
        })
      },
      onContextMenu(value,secondFlag){
        this.contextMenuValue = value
        this.secondFlag = secondFlag
        if(!secondFlag){
          this.openProjectMenu()
        }else{
          this.openServiceMenu()
        }
      },
      openProjectMenu(){
        if(!this.projectMenu){
          this.projectMenu = new Menu()
          this.projectMenu.append(new MenuItem({
            label:'添加服务',
            click:() => {
              this.$router.replace('/home/new_service/null')
            }
          }))
          this.projectMenu.append(new MenuItem({type:'separator'}))
          this.projectMenu.append(new MenuItem({
            label:'删除',
            click:() => {
              this.dialog = true
            }
          }))
        }

        this.projectMenu.popup(remote.getCurrentWindow())
      },
      openServiceMenu(){
        if(!this.serviceMenu){
          this.serviceMenu = new Menu()
          this.serviceMenu.append(new MenuItem({
            label:'删除',
            click:() => {
              this.dialog = true
            }
          }))
        }

        this.serviceMenu.popup(remote.getCurrentWindow())
      },
      deleteItem(){
        this.dialog = false
        if(this.secondFlag){
          this.$store.dispatch('REMOVE_SERVICE',this.contextMenuValue).then(res => {
            this.$messager.show('删除成功',{color:'success'})
            this.$router.replace('/home/new_service/null')
          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })
        }else{
          this.$store.dispatch('REMOVE_PROJECT',this.contextMenuValue).then(res => {
            this.$messager.show('删除成功',{color:'success'})
            this.$router.replace('/home/new/null')
          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })
        }
      }
    },
    created(){
      this.$store.dispatch('GET_ALL_PROJECT').then(res => {
        this.loaded = true
      }).catch(err => {
        this.loaded = true
        this.$messager.show(err,{color:'error'})
      })
    },
    watch:{
      activeService(newVal,oldVal){
        this.$refs.navbar.setSecondActive(newVal)
      },
      activeProject(newVal,oldVal){
        this.$refs.navbar.setActive(newVal)
      }
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
