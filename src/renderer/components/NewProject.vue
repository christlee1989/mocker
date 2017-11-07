<template>
  <div class="new-container">
    <v-form v-model="valid">
      <v-text-field
        label="项目名称"
        v-model="name"
        :rules="nameRules"
        :counter="50"
        required
      ></v-text-field>
      <v-text-field
        label="端口号"
        v-model="port"
        :rules="portRules"
        required
      ></v-text-field>
      <v-text-field
        label="项目描述"
        textarea
        v-model="desc"
        :rules="descRules"
        :counter="200"
        required
      ></v-text-field>
    </v-form>
    <v-btn v-if="projectId === 'null'" :disabled="!valid || loading" color="primary" :loading="loading" @click="goNext">下一步</v-btn>
    <template v-else>
      <v-btn color="primary" @click="updateProject">保存</v-btn>
      <v-btn color="primary" @click="addService">添加服务</v-btn>
    </template>
  </div>
</template>

<script>
  import DB from '../../dao'

  export default{
    data(){
      return {
        valid: false,
        name:'',
        nameRules: [
          (v) => !!v || '必须输入项目名称',
          (v) => v.length <= 50 || '项目名称长度不能超过50个字符'
        ],
        port: '8081',
        portRules: [
          (v) => !!v || '必须输入端口号',
          (v) => !isNaN(v) || '端口号必须为数字',
          (v) => v >= 1 && v <= 65536 || '端口号不合法'
        ],
        desc:'',
        descRules: [
          (v) => !!v || '必须输入项目描述',
          (v) => v.length <= 200 || '项目描述长度不能超过200个字符'
        ],
        loading:false,
      }
    },
    computed:{
      projectId(){
        return this.$route.params.projectId
      },
      projects(){
        return this.$store.state.project.projects
      },
      activeProject(){
        return this.$store.state.project.activeProject
      },
      activeDoc(){
        return this.projects.find((doc, index, arr) => {
          return doc._id === this.activeProject
        })
      }
    },
    methods:{
      goNext(){
        this.loading = true
        this.$store.dispatch('NEW_PROJECT',{
          name:this.name,
          port:this.port,
          desc:this.desc
        }).then(res => {
          this.loading = false
          this.$router.push('/home/new_service')
        }).catch(err => {
          this.loading = false
          this.$messager.show(err,{color:'error'})
        })
      },
      updateProject(){
        //修改项目信息
        this.$store.dispatch('UPDATE_PROJECT',{
          _id:this.projectId,
          name:this.name,
          port:this.port,
          desc:this.desc
        }).then(doc => {
          this.$messager.show('修改成功',{color:'success'})
        }).catch(err => {
          this.$messager.show(err,{color:'error'})
        })
      },
      addService(){

      }
    },
    created(){
      if(this.projectId !== 'null'){
        this.name = this.activeDoc.name
        this.desc = this.activeDoc.desc
        this.port = this.activeDoc.port
      }
    },
    beforeRouteUpdate (to, from, next) {
      if(to.params.projectId !== 'null'){
        this.name = this.activeDoc.name
        this.desc = this.activeDoc.desc
        this.port = this.activeDoc.port
      }else{
        this.name = ''
        this.desc = ''
        this.port = '8081'
      }
      next()
    },
  }

</script>

<style scoped lang="scss">

  .new-container{

  }

</style>
