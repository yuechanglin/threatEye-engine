<template>
  <div class="vm-progress-list-handle">
    <div class="item" v-for="(item,index) in progress_data_list">
      <span class="vam-progress-title">
         <!--<img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">-->
        <span class="progress-title" :title="item.ip">IP: {{item.ip}}</span>
      </span>
      <el-progress :color="item.color" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="item.count"></el-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-progress-list',
    props:{
      progress_data:{
        type:Array,
        default:[]
      }
    },
    computed:{
      progress_data_list(){
        let progress_data = this.progress_data;
        let that = this;
         progress_data.filter(function (v,k) {
          if(k == 0){
            that.$set(v,'color','#0288D1');
          }else if(k == 1){
            that.$set(v,'color','#CDDC39');
          }else if(k == 2){
            that.$set(v,'color','#4CAF50');
          }else if(k == 3){
            that.$set(v,'color','#00BCD4');
          }else if(k == 4){
            that.$set(v,'color','#F57C00');
          }
        });
        return progress_data;
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  .vm-progress-list-handle{
    height: auto;
    .item{
      display: flex;
      line-height: 45px;
      .vam-progress-title{
        width: 180px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        cursor: default;
        /*.progress-img{
          display: inline-block;
          width: 36px;
          height: 24px;
          margin: 10px 0;
        }*/
        .progress-title{
          display: inline-block;
          font-family: PingFang;
          font-size: 14px;
          color: #333333;
          margin: 0 20px 0 0;

        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 8px 0;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 2px;
            background: #F8F8F8;
            .el-progress-bar__inner{
              border-radius: 2px 0 0 2px;
            }
          }
        }
      }
    }
  }
</style>

