<template>
    <div class="loading">
        <div class="spinner clearfix">
            <div class="rect rect1" :style="{backgroundColor:color}"></div>
            <div class="rect rect2" :style="{backgroundColor:color}"></div>
            <div class="rect rect3" :style="{backgroundColor:color}"></div>
            <div class="rect rect4" :style="{backgroundColor:color}"></div>
            <div class="rect rect5" :style="{backgroundColor:color}"></div>
        </div>
    </div>
</template>

<script>

    export default{
        props:{
            color:{
                type:String,
                default:'#fff'
            }
        },
        data(){
            return {

            }
        }
    }

</script>

<style scoped lang="scss">

    @keyframes spinner {
        0%,40%,100%{
            transform:scaleY(0.4);
        }

        20%{
            transform:scaleY(1.0);
        }
    }

    .loading{
        text-align:center;
        padding:10px 0;

        .spinner{
            display:inline-block;
            height:40px;
            vertical-align:middle;

            .rect{
                width:5px;
                height:100%;
                float:left;
                margin-left:5px;
                /*background-color:#fe5344;*/
                animation:spinner 1.2s infinite ease-in-out;
            }

            .rect:first-child{
                margin-left:0;
            }

            .rect1{
                animation-delay:-1.1s;
            }
            .rect2{
                animation-delay:-1.0s;
            }
            .rect3{
                animation-delay:-0.9s;
            }
            .rect4{
                animation-delay:-0.8s;
            }
            .rect5{
                animation-delay:-0.7s;
            }

        }

        &.btn-use .spinner{
            height:80%;
         }
    }

    .clearfix:after{
        content:' ';
        display:block;
        clear:both;
    }

</style>
