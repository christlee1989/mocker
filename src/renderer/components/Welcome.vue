<template>
  <div class="welcome-container grey--text">
    <Loading color="#000"></Loading>
    <span>数据加载中，请稍候...</span>
  </div>
</template>

<script>
  import Loading from './common/Load.vue'

  export default{
    components:{
      Loading
    },
    data(){
      return {}
    }
  }

</script>

<style scoped lang="scss">

  .welcome-container{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height:100%;

    span{
      color:#404040;
    }
  }

</style>
