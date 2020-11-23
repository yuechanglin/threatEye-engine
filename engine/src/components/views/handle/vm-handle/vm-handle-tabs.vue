<template>
  <div class="vm-handle-tabs" v-cloak>
    <el-row :gutter="20" type="flex" class="va-main-1" justify="space-between">
      <el-col :span="6" v-for="(item,index) in tabsData.data" class="va-tabs" :key="index"
              :class="{active:index == tabsData.activeIndex}">
        <div class="va-tabs-item" @click="tabsData.activeIndex = index">
          <i class="vat-img"></i>
          <span class="vat-title">{{item.title}}</span>
          <span class="vat-count">{{item.count}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-handle-tabs',
    props:{
      data_top: {
        type:Object,
        default: () => {}
      },
    },
    data(){
      return {
        tabsData: {
          activeIndex: 0,
          data: [
            {title: '风险资产总数', count: this.data_top.total},
            {title: '高危资产数', count: this.data_top.high},
            {title: '中危资产数', count: this.data_top.medium},
            {title: '低危资产数', count: this.data_top.low}
          ]
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-handle-tabs{
    .va-tabs{
      .va-tabs-item{
        background: #fff;
        border-radius: 4px;
        height: 124px;
        line-height: 124px;
        text-align: left;
        position: relative;
        cursor: pointer;
        .vat-img{
          width: 36px;
          height: 36px;
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size: 36px;
        }
        .vat-title{
          font-family: PingFang;
          width: 120px;
          font-size: 18px;
          color: #333;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
        .vat-count{
          position: absolute;
          font-family: PingFangMedium;
          font-size: 48px;
          color: #333;
          text-align: right;
          right: 10px;
        }
      }
      &:nth-child(1){
        .vat-img{
          background-image: url("../../../../assets/images/handle/tabs/tabs1.png");
        }
      }
      &:nth-child(2){
        .vat-img{
          background-image: url("../../../../assets/images/handle/tabs/tabs2.png");
        }
      }
      &:nth-child(3){
        .vat-img{
          background-image: url("../../../../assets/images/handle/tabs/tabs3.png");
        }
      }
      &:nth-child(4){
        .vat-img{
          background-image: url("../../../../assets/images/handle/tabs/tabs4.png");
        }
      }
      &.active{
        .va-tabs-item{
          background-color: #5389E0;
          box-shadow: 0 0 10px 6px rgba(46,63,96,0.16);
          background-size: inherit;
          background-repeat: no-repeat;
          background-position: bottom right;
          .vat-title{
            color: #fff;
          }
          .vat-count{
            color: #fff;
          }
        }
        &:nth-child(1){
          .va-tabs-item{
            background-image: url("../../../../assets/images/handle/tabsBg/bg1.png");
            .vat-img{
              background-image: url("../../../../assets/images/handle/tabsAt/at1.png");
            }
          }
        }
        &:nth-child(2){
          .va-tabs-item{
            background-image: url("../../../../assets/images/handle/tabsBg/bg2.png");
            .vat-img{
              background-image: url("../../../../assets/images/handle/tabsAt/at2.png");
            }
          }
        }
        &:nth-child(3){
          .va-tabs-item{
            background-image: url("../../../../assets/images/handle/tabsBg/bg2.png");
            .vat-img{
              background-image: url("../../../../assets/images/handle/tabsAt/at2.png");
            }
          }
        }
        &:nth-child(4){
          .va-tabs-item{
            background-image: url("../../../../assets/images/handle/tabsBg/bg2.png");
            .vat-img{
              background-image: url("../../../../assets/images/handle/tabsAt/at2.png");
            }
          }
        }
      }
    }
  }
</style>
