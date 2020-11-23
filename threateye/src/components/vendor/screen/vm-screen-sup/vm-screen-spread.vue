<template>
    <div class="vm-screen-spread">
      <el-carousel class="spread" direction="vertical" :interval="10000">
        <el-carousel-item v-for="(item,$index) in speadData" :key="$index">
          <ul class="spread-list">
            <li class="item" v-for="(it,$idx) in item" :key="$idx">
              <div class="its it1">
                <h4 class="s_name">分支名称</h4>
                <h2 class="s_content" :title="it.branch_name">{{it.branch_name}}</h2>
              </div>
              <div class="its it2">
                <h4 class="s_name">资产数</h4>
                <h2 class="s_content">{{it.asset_count}}</h2>
              </div>
              <div class="its it3">
                <h4 class="s_name">风险资产数</h4>
                <h2 class="s_content">{{it.risk_asset_count}}</h2>
              </div>
              <div class="its it4">
                <h4 class="s_name">外联资产数</h4>
                <h2 class="s_content">{{it.external_count}}</h2>
              </div>
              <div class="fs">
                <i class="fs-img"></i>
              </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-spread",
      data(){
        return{
          speadData:[],
        }
      },
      created() {
        this.getData();
      },
      methods:{
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/branch-situation')
            .then((resp) => {
              let {status, data} = resp.data;

              let newAttr = [];

              if(status == 0){
                newAttr = this.getNewArray(data,6);
                this.speadData = newAttr;
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
      }
    }
</script>

<style scoped lang="less">
.vm-screen-spread{
  .spread{
    .spread-list {
      font-size: 0;
      .item{
        width: 376px;
        height: 136px;
        display: inline-block;
        margin-bottom: 10px;
        position: relative;
        &:nth-child(odd){
          float: left;
        }
        &:nth-child(even){
          float: right;
        }
        .its{
          width: 186px;
          height: 66px;
          position: absolute;
          background-repeat: no-repeat;
          background-size: 186px 66px;
          &.it1{
            left: 0;
            top: 0;
            text-align: left;
            padding-left: 16px;
            background-image: url("../../../../assets/images/screen/spread/bg1.png");
          }
          &.it2{
            top: 0;
            right: 0;
            text-align: right;
            padding-right: 16px;
            background-image: url("../../../../assets/images/screen/spread/bg2.png");
          }
          &.it3{
            left: 0;
            bottom: 0;
            text-align: left;
            padding-left: 16px;
            background-image: url("../../../../assets/images/screen/spread/bg3.png");
          }
          &.it4{
            bottom: 0;
            right: 0;
            text-align: right;
            padding-right: 16px;
            background-image: url("../../../../assets/images/screen/spread/bg4.png");
          }
        }
        .fs{
          position: absolute;
          width: 32px;
          height: 32px;
          left: 172px;
          top: 52px;
          background-image: linear-gradient(180deg, #00D7E9 0%, #007AFF 100%);
          border-radius: 100%;
          padding: 6px;
          .fs-img{
            width: 20px;
            height: 20px;
            background-size: 20px;
            display: block;
            background-repeat: no-repeat;
            background-image: url("../../../../assets/images/screen/spread/fs.png");
          }
        }
        .s_name{
          opacity: 0.8;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          height: 32px;
          line-height: 32px;
        }
        .s_content{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #00D6E9;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    /deep/
    .el-carousel__button{
      display: none;
    }
  }
}
</style>
