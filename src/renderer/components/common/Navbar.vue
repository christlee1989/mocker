<template>
  <div class="nav-container">
    <div class="nav-block" v-for="(item,index) in data" :key="item.value">
      <div class="nav" :class="{active:active === item.value}" @click="navClick(index,item.value)" @contextmenu="onContextMenu(item.value)">
        {{item.title}}
        <div class="right-btns">
          <i class="add" title="添加服务" v-show="active === item.value" @click.stop="addClick(item.value)"></i>
          <i class="del" title="删除" v-show="active === item.value" @click.stop="delClick(item.value)"></i>
          <i class="caret"></i>
        </div>

      </div>
      <div class="nav-second-block" :style="{height:active === item.value ? (item.second.length || 1) * 40 + 'px' : 0}">
        <template v-if="item.second.length">
          <div class="nav-second" :key="secondItem._id" v-for="(secondItem,secondIndex) in item.second" :class="{active:secondActive === secondItem._id}" @click="navClick(secondIndex,secondItem._id,'second')" @contextmenu="onContextMenu(secondItem._id,true)">{{secondItem.path}}</div>
        </template>
        <div class="nodata" v-else>暂无服务</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        active:'',
        secondActive:'',
      }
    },
    computed:{

    },
    methods:{
      navClick(index,value,secondFlag){
        if(secondFlag){
          if(this.secondActive === value){
            return;
          }
          this.secondActive = value
          this.$emit('click',index,value,secondFlag)
        }else{
          if(this.active === index){
            return;
          }
          this.active = value;
          this.secondActive = ''
          this.$emit('click',index,value,secondFlag)
        }
      },
      onContextMenu(value,second){
//              this.navClick(undefined,value,second)
        this.$emit('contextmenu',value,second)
      },
      reset(){
        this.active = ''
        this.secondActive = ''
      },
      setActive(value){
        this.active = value
      },
      setSecondActive(value){
        this.secondActive = value
      },
      addClick(value){
        this.$emit('add',value)
      },
      delClick(value){
        this.$emit('delete',value)
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../../assets/css/variable.scss";

  .nav-container{
    width:100%;

  .nav{
    height:40px;
    width:100%;
    line-height:40px;
    /*border-right:1px solid rgba(0,0,0,0.15);*/
    border-bottom:1px solid rgba(0,0,0,0.15);
    text-align:left;
    font-size:14px;
    color:#aaa;
    position:relative;
    padding:0 10px;
    cursor:pointer;
    transition:all .3s ease;

    /*&:hover{*/
      /*.right-btns{*/
        /*.add,.del{*/
          /*display:block;*/
        /*}*/
      /*}*/
    /*}*/

    .right-btns{
      position:absolute;
      top:0;
      right:10px;
      display:flex;
      height:100%;
      align-items:center;

      .add,.del{
        margin-right:5px;
        display:inline-block;
        width:22px;
        height:22px;
        vertical-align:middle;

        &:hover{
          background-color:#303030;
        }
      }

      .add{
        background:url(../../assets/img/add.png) no-repeat center;
        background-size:15px auto;
      }

      .del{
        background:url(../../assets/img/delete.png) no-repeat center;
        background-size:15px auto;
      }

      .caret{
        display:inline-block;
        width:22px;
        height:22px;
        transition:transform .2s;
        background:url(../../assets/img/pulldown-active.png) no-repeat center;
        background-size:15px auto;
      }
    }

  &.active{
     font-size:14px;
     color:#fff;
     border-right:none;

  &:before{
     content:' ';
     display:inline-block;
     position:absolute;
     left:0;
     top:0;
     height:100%;
     width:4px;
     background:$primary-color;
   }

  .caret{
    transform:rotate(180deg);
  }
  }
  }

  .nav-second-block{
    overflow:hidden;
    height:0;
    background:#303030;
    /*transition:height,visibility .35s ease;*/
    transition-property:height,visibility;
    transition-duration:.35s;
    transition-timing-function:ease;

  .nav-second{
    height:40px;
    width:100%;
    line-height:40px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    text-align:left;
    font-size:14px;
    color:#aaa;
    position:relative;
    padding-left:40px;
    cursor:pointer;
    transition:all .3s ease;

  &.active{
     color:#fff;
   }
  }

  .nodata{
    height:40px;
    width:100%;
    line-height:40px;
    text-align:center;
    font-size:14px;
    color:#aaa;
  }
  }

  }

</style>
