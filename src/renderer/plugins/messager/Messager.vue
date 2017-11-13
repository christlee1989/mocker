<template>
  <v-snackbar
    :color="color"
    :timeout="timeout"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :multi-line="multiLine"
    :vertical="vertical"
    v-model="showMsg"
  >
    {{ text }}
    <v-btn flat color="white" @click.native="showMsg = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/3.
   */
  const defaultProps = {
    timeout:3000,
    top:true,
    bottom:false,
    right:true,
    left:false,
    multiLine:true,
    vertical:false,
    color:'info'
  }

  export default{
    data(){
      return {
        timeout:3000,
        top:true,
        bottom:false,
        right:true,
        left:false,
        multiLine:true,
        vertical:false,
        showMsg:false,
        text:'',
        color:'info'
      }
    },
    methods:{
      show(text,options = {}){
        Object.assign(this,defaultProps,options)
        this.text = text
        this.showMsg = true
      }
    }
  }

</script>

<style scoped>

</style>
