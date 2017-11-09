<template>
  <div class="new-service-container">
    <v-form v-model="valid">
      <v-select
        box dark
        label="请求方式"
        v-model="method"
        :items="items"
        :rules="[v => !!v || '必须选择请求方式']"
        required
      ></v-select>
      <v-text-field
        box dark
        label="服务路径"
        placeholder="例如：/service/path"
        v-model="path"
        :rules="pathRules"
        :counter="100"
        required
      ></v-text-field>
      <v-text-field
        box dark
        label="服务描述"
        placeholder="请用简短的文字描述该服务"
        multi-line
        v-model="description"
        :rules="descRules"
        :counter="200"
        required
      ></v-text-field>
    </v-form>
    <label for="" class="label-json required" :class="{err:!jsonValid}">响应数据</label>
    <div class="json-editor" :class="{err:!jsonValid}" ref="jsoneditor"></div>
    <div></div>
    <v-btn :disabled="!valid || !jsonValid || loading" color="primary" :loading="loading" @click="saveService">保存</v-btn>
    <v-dialog v-if="activeService" v-model="dialog" persistent>
      <v-btn slot="activator" flat dark color="error">删除</v-btn>
      <v-card>
        <v-card-title class="headline">确认删除？</v-card-title>
        <v-card-text>点击确认将永久删除服务</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="deleteService">确认</v-btn>
          <v-btn color="darken-1" flat @click.native="dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn flat dark @click="resetForm">重置</v-btn>

  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/10/30.
   */
//  import Ace from 'brace'
//  import 'brace/mode/json'
  import 'jsoneditor/dist/jsoneditor.css'
  import Editor from 'jsoneditor'
  import 'brace/theme/monokai'

  export default{
    data(){
      return {
        editor:null,
        valid:false,
        jsonValid:true,
        loading:false,
        path:'',
        description:'',
        resData:{},
        pathRules: [
          (v) => !!v || '必须输入服务路径',
          (v) => v.length <= 100 || '服务路径长度不能超过100个字符'
        ],
        descRules: [
          (v) => !!v || '必须输入服务描述',
          (v) => v.length <= 200 || '服务描述长度不能超过200个字符'
        ],
        items: [
          'GET',
          'POST',
          'PUT',
          'DELETE',
          'HEAD',
          'CONNECT',
          'OPTIONS',
          'TRACE'
        ],
        method:'POST',
        dialog:false
      }
    },
    computed:{
      activeProject(){
        return this.$store.state.project.activeProject
      },
      doc(){
        return {
          method:this.method,
          path:this.path,
          description:this.description,
          data:this.resData,
          pid:this.activeProject
        }
      },
      serviceId(){
        return this.$route.params.serviceId
      },
      services(){
        return this.$store.state.project.services
      },
      activeService(){
        return this.$store.state.project.activeService
      },
      activeDoc(){
        return this.services[this.activeProject].find((doc) => {
          return doc._id === this.activeService
        })
      }
    },
    methods:{
      jsonEditorChange(){
        try{
          this.resData = this.editor.get()
          this.jsonValid = true
        }catch(err){
          this.jsonValid = false
          console.log(err)
        }
      },
      jsonEditorError(err){
        console.log(err)
      },
      resetForm(){
        this.valid = false
        this.jsonValid = true
        this.method = 'POST'
        this.path = ''
        this.description = ''
        this.resData = {}
        this.editor.set({})
        this.$store.commit('SET_ACTIVE_SERVICE','')
      },
      saveService(){
        if(this.activeService){
          console.log(this.editor.get())
          this.$store.dispatch('UPDATE_SERVICE',{_id:this.activeService,...this.doc}).then(res => {
            this.$messager.show('修改成功',{color:'success'})
          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })
        }else{
          this.$store.dispatch('NEW_SERVICE',this.doc).then(res => {
            this.$messager.show('保存成功',{color:'success'})
            this.$router.replace(`/home/new_service/${this.activeService}`)
          }).catch(err => {
            this.$messager.show(err,{color:'error'})
          })
        }
      },
      deleteService(){
        this.dialog = false
        this.$store.dispatch('REMOVE_SERVICE',this.activeService).then(res => {
          this.$messager.show('删除成功',{color:'success'})
          this.$router.replace('/home/new_service/null')
        }).catch(err => {
          this.$messager.show(err,{color:'error'})
        })
      }
    },
    mounted(){
//      var editor = ace.edit(this.$refs.jsoneditor);
//      editor.getSession().setMode('ace/mode/json');
//      editor.setTheme('ace/theme/monokai');
      let editor = this.editor = new Editor(this.$refs.jsoneditor,{
        mode:'code',
        theme:'ace/theme/monokai',
        modes:['code','tree','view','form','text'],
        onChange:this.jsonEditorChange,
        onError:this.jsonEditorError
      })
      editor.set({ })

      if(this.serviceId !== 'null'){
        this.method = this.activeDoc.method
        this.path = this.activeDoc.path
        this.description = this.activeDoc.description
        this.resData = this.activeDoc.data
        this.editor.set(this.activeDoc.data)
      }
    },
    beforeRouteUpdate (to, from, next) {
      if(to.params.serviceId !== 'null'){
        this.method = this.activeDoc.method
        this.path = this.activeDoc.path
        this.description = this.activeDoc.description
        this.resData = this.activeDoc.data
        this.editor.set(this.activeDoc.data)
      }else{
        this.method = 'POST'
        this.path = ''
        this.description = ''
        this.resData = {}
        this.editor.set({})
      }
      next()
    },
  }

</script>

<style scoped lang="scss">

  .new-service-container{

    .label-json{
      display: inline-block;
      font-size: 12px;
      line-height: 32px;
      height: 30px;
      overflow: hidden;
      pointer-events: none;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      color:rgba(255,255,255,0.7);
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

      &.required:after{
        content:'*';
        color:#f44336;
      }

      &.err{
        color:#f44336;
      }
    }

    .json-editor{
      height:300px;
    }
  }

</style>

<style lang="scss">
  @import "../assets/css/variable.scss";

  .json-editor div.jsoneditor-menu a.jsoneditor-poweredBy{
    display:none;
  }

  .json-editor{

    div.jsoneditor{
      border:1px solid $primary-color;
    }

    div.jsoneditor-menu{
      background-color:$primary-color;
      border-bottom:1px solid $primary-color;
    }

    &.err div.jsoneditor{
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      border:1px solid #f44336;
    }
  }

</style>
