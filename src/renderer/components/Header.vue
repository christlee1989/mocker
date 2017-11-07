<template>
  <div class="header-container">
      <v-btn icon large>
        <v-icon large>play_arrow</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
  </div>
</template>

<script>
  /**
   * Created by liyunfeng on 2017/11/1.
   */

  export default{
    data(){
      return {}
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
  }

</style>
