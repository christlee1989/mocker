<template>
    <div class="nav-container">
        <div class="nav-block" v-for="(item,index) in data" :key="item.value">
            <div class="nav" :class="{active:active === item.value}" @click="navClick(index,item.value)">
                {{item.title}}
                <i class="caret"></i>
            </div>
            <div class="nav-second-block" :style="{height:active === item.value ? (item.second.length || 1) * 40 + 'px' : 0}">
                <template v-if="item.second.length">
                  <div class="nav-second" v-for="(secondItem,secondIndex) in item.second" :class="{active:secondActive === secondItem.value}" @click="navClick(secondIndex,secondItem.value,'second')">{{secondItem.title}}</div>
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
            reset(){
                this.active = ''
                this.secondActive = ''
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

            .caret{
                display:inline-block;
                position:absolute;
                right:10px;
                top:50%;
                margin-top:-11px;
                width:22px;
                height:22px;
                transition:transform .2s;
                background:url(../../assets/img/pulldown-active.png) no-repeat center;
                background-size:15px auto;
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
