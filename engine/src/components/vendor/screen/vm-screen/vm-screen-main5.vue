<template>
  <div class="vm-screen-main5">
    <div class="state-top" >
        <span class="t-info t-info_0">
          <i class="t-arrow"></i><span class="t-name">预警：{{sysData.warning_count}}</span>
        </span>
      <span class="t-info t-info_1">
          <i class="t-arrow"></i><span class="t-name">健康：{{sysData.healthy_count}}</span>
        </span>
      <span class="t-info t-info_2">
          <i class="t-arrow"></i><span class="t-name">离线：{{sysData.offline_count}}</span>
        </span>
    </div>
    <div class="state-content" v-if="loading">
      <div v-if="items.length < 4">
        <div class="item" :class="calculate(item.status)" v-for="(item,$index) in items" :key="$index">
          <h3 class="item_fs0">{{item.name}}</h3>
          <div class="item_fs1">
            <i class="t_fork"></i>
            <span class="t_name">{{item.ip}}</span>
          </div>
          <vm-screen-progress :pg_data="item"></vm-screen-progress>
          <div class="item_fs2">
            <i class="t_aw t-aw_1"></i><span class="t-name">{{item.flow}}MB</span>
            <!--<i class="t_aw t-aw_2"></i><span class="t-name">0MB</span>-->
          </div>
        </div>
        <!--数据长度小于三的时候显示-->
        <div v-if="items.length < 3" style="display: inline-block;">
          <div class="item item3" v-for="(item,$idx) in (3 - items.length)" :key="$idx">
            <img class="t_disabled" src="../../../../assets/images/screen/system/disabled.png">
          </div>
        </div>
      </div>
      <div v-if="items.length > 3">
        <el-carousel>
          <el-carousel-item v-for="(item,$index) in itemAttr" :key="$index">
            <div class="item" :class="calculate(it.status)" v-for="(it,$idx) in item" :key="$idx">
              <h3 class="item_fs0">{{it.name}}</h3>
              <div class="item_fs1">
                <i class="t_fork"></i>
                <span class="t_name">{{it.ip}}</span>
              </div>
              <vm-screen-progress :pg_data="it"></vm-screen-progress>
              <div class="item_fs2">
                <i class="t_aw t-aw_1"></i><span class="t-name">{{it.flow}}MB</span>
                <!--<i class="t_aw t-aw_2"></i><span class="t-name">0MB</span>-->
              </div>
            </div>
            <!--数据长度小于三的时候显示-->
            <div v-if="item.length < 3" style="display: inline-block;">
              <div class="item item3" v-for="(it,$idx) in (3 - item.length)" :key="$idx">
                <img class="t_disabled" src="../../../../assets/images/screen/system/disabled.png">
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenProgress from '../vm-screen-sup/vm-screen-progress';
  export default {
    name: "vm-screen-main5",
    components: {VmScreenProgress},
    data(){
      return{
        loading:false,
        animate:false,
        sysData: {},
        itemAttr:[],
        items:[],
        timers:null
      }
    },
    created(){
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
      getData() {
        this.loading = false;
        this.$axios
          .get('/yiiapi/demonstration/system-status')

          .then((resp) => {
            this.loading = true;

            let {status, data} = resp.data;
            //console.log(data);
            if(status == 0){
              //console.log(data);
              this.sysData = data;
              let items = this.sysData.dev_info;
              this.items = items;
              //items = this.items;
              if(this.items.length > 3){
                let newAttr = this.getNewArray(items,3);
                this.itemAttr = newAttr;
                //console.log(this.itemAttr)
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getNewArray(arr, size){
        const arrNum = Math.ceil(arr.length/size, 10);
        let index = 0; // 定义初始索引
        let resIndex = 0; // 用来保存每次拆分的长度
        const result = [];
        while(index< arrNum){
          result[index]= arr.slice(resIndex,size+resIndex);
          resIndex += size;
          index++;
        }
        return result;
      },

      //获取类名
      calculate(alias) {
        if(alias == 'warning'){
          return "item0";
        }else if(alias == 'health'){
          return "item1";
        }else if(alias == 'offline'){
          return "item2";
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main5{
    padding: 0 16px 16px;
    overflow: hidden;
    .state-top{
      width: 100%;
      height: 40px;
      line-height: 40px;
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
        }
        .t-name{
          font-family: PingFangSC-Regular;
          font-size: 14px;
        }
        &.t-info_0{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow0.png");
          }
          .t-name{
            color: #D0A13F;
          }
        }
        &.t-info_1{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow1.png");
          }
          .t-name{
            color: #60C160;
          }
        }
        &.t-info_2{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow2.png");
          }
          .t-name{
            color: #D44361;
          }
        }
      }
    }
    .state-content{
      height: 200px;
      justify-content:space-between;
      overflow: hidden;
      text-align: left;
      width: 100%;
      font-size: 0;
      /*&.anim{
        transition: all 0.5s;
        margin-left: -168px;
      }*/
      .item {
        width: 146px;
        height: 198px;
        padding: 0 5px;
        margin: 0 5px;
        font-size: 14px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 146px 198px;
        text-align: center;
        overflow: hidden;
        &.item0{
          background-image: url("../../../../assets/images/screen/system/bg0.png");
        }
        &.item1{
          background-image: url("../../../../assets/images/screen/system/bg1.png");
        }
        &.item2{
          background-image: url("../../../../assets/images/screen/system/bg2.png");
        }
        &.item3{
          background-image: url("../../../../assets/images/screen/system/bg3.png");
          .t_disabled{
            width: 48px;
            height: 48px;
            margin: 75px 0;
          }
        }
        .item_fs0{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 40px;
          height: 40px;
        }
        .item_fs1{
          height: 30px;
          padding: 0 5px;
          text-align: left;
          .t_fork{
            width: 18px;
            height: 18px;
            display: inline-block;
            background-image: url("../../../../assets/images/screen/system/fs.png");
            background-repeat: no-repeat;
            background-size: 18px;
            vertical-align: text-top;
          }
          .t_name{
            ont-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 14px;
          }
        }
        .item_fs2{
          margin: 12px 0;
          .t_aw{
            width: 12px;
            height: 16px;
            display: inline-block;
            background-repeat: no-repeat;
            vertical-align: text-top;
            background-size: 12px 16px;
            margin-top: 1px;
            &.t-aw_1{
              margin-right: 5px;
              background-image: url("../../../../assets/images/screen/system/aw1.png");
            }
            &.t-aw_2{
              background-image: url("../../../../assets/images/screen/system/aw2.png");
            }
          }
          .t-name{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
          }
        }
      }

      /deep/
      .el-carousel{
        .el-carousel__arrow{
          display: none;
        }
      }
    }
  }
</style>
