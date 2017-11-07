<template>
  <div class="welcome-container grey--text">
    您可以
    <v-btn color="primary" @click="$router.replace('/new')">
      <v-icon>add_circle</v-icon>
      &nbsp;新建项目
    </v-btn>
    或
    <v-btn color="info">
      <v-icon>get_app</v-icon>
      &nbsp;导入项目
    </v-btn>
  </div>
</template>

<script>

  export default{
    data(){
      return {}
    }
  }

</script>

<style scoped lang="scss">

  .welcome-container{
    display:flex;
    justify-content: center;
    align-items:center;
    height:100%;
  }

</style>
