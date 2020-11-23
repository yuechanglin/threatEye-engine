<template>
    <div class="vm-screen-middle1">
      <div id="spreader">
        <el-carousel trigger="click" :autoplay="true"
                     :interval="20000" @change="changeCal">
          <el-carousel-item>
            <vm-screen-map></vm-screen-map>
          </el-carousel-item>
          <el-carousel-item>
            <vm-screen-spread></vm-screen-spread>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenMap from '../vm-screen-sup/vm-screen-map';
  import VmScreenSpread from '../vm-screen-sup/vm-screen-spread'
  export default {
      name: "vm-screen-middle1",
      data(){
          return{
            tabFlag:false,
            data:[]
          }
      },
      components:{
        VmScreenMap,
        VmScreenSpread
      },
      methods:{
        changeCal(){
          this.tabFlag = !this.tabFlag;
          this.$emit('childByValue', this.tabFlag)
        }
      }
  }
</script>

<style scoped lang="less">
.vm-screen-middle1{
  padding: 0 16px 16px;
  position: relative;
  height: 480px;
  #spreader{
    /deep/
    .el-carousel{
      .el-carousel__container{
        height: 472px;
        .el-carousel__arrow{
          display: none!important;
        }
      }
      .el-carousel__indicators{
        .el-carousel__indicator{
          .el-carousel__button{
            width: 8px;
            height: 4px;
            border-radius: 2px;
            opacity: 0.48;
            background: #00D7E9;
          }
          &.is-active{
            .el-carousel__button{
              width: 24px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
