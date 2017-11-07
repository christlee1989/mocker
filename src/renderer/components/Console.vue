<template>
  <div class="console-container" :class="{show:show}">
    <div class="console-header">
      <span>控制台</span>
      <i class="pulldown" @click="$emit('close')"></i>
    </div>
    <div class="console-sidebar"></div>
  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/1.
   */

  export default{
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {}
    }
  }

</script>

<style scoped lang="scss">

  .console-container{
    position:fixed;
    width:100%;
    height:200px;
    bottom:0;
    left:0;
    transition:transform .3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transform:translate(0,100%);
    background:#303030;
    z-index:22;
    border-top:1px solid rgba(255,255,255,0.12);

    &.show{
      transform:translate(0,0);
    }

    .console-header{
      background:#424242;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:30px;
      display:flex;
      justify-content: space-between;
      font-size:14px;
      padding:0 10px;
      align-items:center;
      z-index:2;
      border-bottom:1px solid rgba(0,0,0,0.3);

      .pulldown{
        display:inline-block;
        background:url(../assets/img/pulldown.png) no-repeat center;
        background-size:18px auto;
        width:20px;
        height:20px;
        vertical-align: top;
        cursor:pointer;

        &:hover{
          background:url(../assets/img/pulldown-active.png) no-repeat center;
          background-size:18px auto;
        }
      }
    }

    .console-sidebar{
      position:absolute;
      top:0;
      left:0;
      width:25px;
      height:100%;
      background:#424242;
      border-right:1px solid rgba(255,255,255,0.12);
      z-index:1;
    }
  }

</style>
