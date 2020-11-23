<template>
  <div class="vm-screen-progress">
    <div class="item" v-for="(item,$index) in get_pg_data" :key="$index">
      <span class="vam-progress-title">
        <span class="progress-title" :title="item.name">{{item.name | sys}}</span>
      </span>
      <el-progress :show-text="true" :text-inside="false" :percentage="item.value">
      </el-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-screen-progress',
    props:{
      pg_data:{
        type:Object,
        default:() => {}
      }
    },
    data(){
      return{
        progress_data:[{name:'CPU',count:24,color:'#fff'},
          {name:'内存',count:41,color:'#fff'},
          {name:'硬盘',count:35,color:'#fff'}]
      }
    },
    computed:{
      get_pg_data(){
        let pg_data = this.pg_data;
        let pg_attr = [];
        for (let key in pg_data) {
          if(key == 'cpu' || key == 'disk' || key == 'mem'){
            pg_attr.push({name:key,value:Number(pg_data[key]).toFixed(0) * 1});
          }
        }
        return pg_attr;
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="less">
  .vm-screen-progress{
    height: auto;
   /* padding: 0 5px;*/
    .item{
      display: flex;
      line-height: 28px;
      padding: 0 5px;
      .vam-progress-title{
        /*width: 180px;*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        cursor: default;
        width: 50px;
        .progress-title{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #fff;
          padding: 0 10px 0 0;
        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 4px 0;
        text-align: left;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 0;
            background: rgba(255,255,255,0.12);
            .el-progress-bar__inner{
              border-radius: 0;
              background: #fff;
            }
          }
        }
        .el-progress__text{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #fff;
          transform: scale(.75);
        }
      }
    }
  }
</style>

