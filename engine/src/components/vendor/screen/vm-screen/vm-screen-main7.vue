<template>
    <div class="vm-screen-main7">
      <div class="vm-progress-list">
        <div class="item" v-for="(item,index) in progress_list">
          <div class="pgress-item">
            <span class="flag-icon" :class="calculate(item.alias)"></span>
          </div>
          <div class="pgress-title">
            <marquee v-if="item.country_name.length>3" class="country_name" direction="left"
                     behavior="scroll" scrollamount="1"
                     scrolldelay="0" loop="-1" width="50">
              {{item.country_name}}
            </marquee>
            <span class="country_name" v-else>{{item.country_name}}</span>
            <span class="country_count">{{item.num}}</span>
          </div>
          <el-progress :show-text="false" :text-inside="true"
                       :stroke-width="20" :percentage="item.count">
          </el-progress>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main7",
      data(){
          return{
            timers:null,
            progress_list:[{pid:0,name:'CN',country_name:'英国', num:0, count:0},
              {pid:1,name:'CN',country_name:'英国英国英国英国英国英国', num:0,count:0},
              {pid:2,name:'CN',country_name:'英国', num:0,count:0},
              {pid:3,name:'CN',country_name:'中国', num:0,count:0},
              {pid:4,name:'CN',country_name:'中国', num:0,count:0}]
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
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/external-country-top5')

            .then((resp) => {

              let {status, data} = resp.data;

              let allNum = 0;

              if(status == 0){
                data.map(item => {
                  allNum += Number(item.count);
                });

                data.map(item => {

                  let alias = item.country.toLowerCase();

                  item.num = Number(item.count);

                  item.count = ((Number(item.count)/allNum)) * 100;

                  //item.count = Number(/allNum)).toFixed(0) * 100);

                  Object.assign(item,{alias:alias});
                });
                this.progress_list = data;
              }
            })
            .catch((error) => {

              console.log(error);

            });
        },

        //获取国旗类名
        calculate(alias) {
          return "flag-icon-"+alias;
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main7{
  padding: 0 16px 16px;
  .vm-progress-list{
    height: auto;
    margin-top: 6px;
    margin-right: 6px;
    .item{
      display: flex;
      line-height: 45px;
      .pgress-item{
        width: 40px;
        .progress-img{
          vertical-align: middle;
          width: 32px;
        }
      }
      .pgress-title{
        width: 90px;
        text-align: left;
        cursor: default;
        font-family: PingFang;
        border: 1px;
        color: #fff;
        position: relative;
        .country_name{
          width: 45px;
          float: left;
          text-align: left;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .country_count{
          display: inline-block;
          font-size: 14px;
          width: 32px;
          float: right;
        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 12px 0;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 2px;
            background: rgba(0,215,233,0.12);
            .el-progress-bar__inner{
              border-radius: 2px 0 0 2px;
              opacity: 1;
              background: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);
             /* background-image: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);*/
            }
          }
        }
      }
    }
  }
}
</style>
