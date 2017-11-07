<template>
  <div class="new-service-container">
    <v-form v-model="valid">
      <v-select
        label="请求方式"
        v-model="method"
        :items="items"
        :rules="[v => !!v || '必须选择请求方式']"
        required
      ></v-select>
      <v-text-field
        label="服务路径"
        placeholder="例如：/service/path"
        v-model="path"
        :rules="pathRules"
        :counter="100"
        required
      ></v-text-field>
      <v-text-field
        label="服务描述"
        placeholder="请用简短的文字描述该服务"
        textarea
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
        method:'POST'
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
      },
      saveService(){

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
    }
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
