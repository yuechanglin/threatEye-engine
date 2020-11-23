<template>
    <div class="vm-screen-main3">
      <div class="state-top" v-if="loading">
        <span class="t-info">
          <i class="t-arrow"></i><span class="t-name">攻击源：{{stateData.sourse_count}}</span>
        </span>
        <span class="t-info">
          <i class="t-arrow"></i><span class="t-name">攻击目标：{{stateData.destination_count}}</span>
        </span>
      </div>
      <div class="state-content">
        <div class="disk">
          <h2 class="disk-num">{{stateData.threat_count}}</h2>
          <h5 class="disk-times">威胁次数</h5>
        </div>
        <ul class="state-list">
          <li class="item" :class="{'active':stateIndex == $index}"
              v-for="(item,$index) in stateData.category" :key="$index" @click="state_click($index);">
            <i class="t-arrow"></i><span class="t-name">{{item.category}}</span>
            <span class="t-num">{{item.count}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main3",
      data(){
          return {
            loading:false,
            stateIndex: 0,
            stateData: {},
            timers:null
          }
      },
      created() {
        this.getData();
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
        },10000 * 30);
      },
      destroyed(){
        clearInterval(this.timers);
      },
      methods:{
        //获取数据
        getData(){
          this.loading = false;
          this.$axios
            .get('/yiiapi/demonstration/horizontal-threat-situation')
            .then((resp) => {
              this.loading = true;
              let {status, data} = resp.data;

              if(status == 0){
                this.stateData = data;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        state_click(index){
          this.stateIndex = index;
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main3{
  padding: 0 16px 16px;
  .state-top{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: left;
    .t-info{
      margin-right: 20px;
      .t-arrow{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        background-size: 14px;
        vertical-align: inherit;
        background-image: url("../../../../assets/images/screen/aside-arrow.png");
      }
      .t-name{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
  }
  .state-content{
    height: 190px;
    position: relative;
    border: 1px solid transparent;
    .disk{
      width: 162px;
      height: 162px;
      margin: 10px 0;
      background-image: url("../../../../assets/images/screen/state/disk.png");
      background-repeat: no-repeat;
      background-size: 162px;
      padding: 45px 0;
      .disk-num{
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #00D7E9;
      }
      .disk-times{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
    .state-list{
      position: absolute;
      top: 10px;
      left: 136px;
      color: #fff;
      .item {
        text-align: left;
        width: 328px;
        height: 39px;
        line-height: 39px;
        background-repeat: no-repeat;
        background-size: 328px 39px;
        margin-bottom: 2px;
        position: relative;
        cursor: pointer;
        .t-arrow{
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 8px;
          vertical-align: inherit;
          background-image: url("../../../../assets/images/screen/aside-arrow.png");
          background-size: 14px 14px;
        }
        .t-name{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
        }
        .t-num{
          position: absolute;
          top: 2px;
        }
        &:nth-child(1){
          padding-left: 40px;
          background-image: url("../../../../assets/images/screen/state/st0.png");
          .t-num{
            right: 56px;
          }
        }
        &:nth-child(2){
          padding-left: 60px;
          background-image: url("../../../../assets/images/screen/state/st1.png");
          .t-num{
            right: 30px;
          }
        }
        &:nth-child(3){
          padding-left: 60px;
          background-image: url("../../../../assets/images/screen/state/st2.png");
          .t-num{
            right: 30px;
          }
        }
        &:nth-child(4){
          padding-left: 40px;
          background-image: url("../../../../assets/images/screen/state/st3.png");
          .t-num{
            right: 56px;
          }
        }
        &.active{
          &:nth-child(1){
            background-image: url("../../../../assets/images/screen/state/st0_a.png")!important;
          }
          &:nth-child(2){
            background-image: url("../../../../assets/images/screen/state/st1_a.png")!important;
          }
          &:nth-child(3){
            background-image: url("../../../../assets/images/screen/state/st2_a.png")!important;
          }
          &:nth-child(4){
            background-image: url("../../../../assets/images/screen/state/st3_a.png")!important;
          }
          .t-arrow{
            vertical-align: middle;
            background-image: url("../../../../assets/images/screen/aside-write.png")!important;
          }
        }
      }

    }
  }
}
</style>
