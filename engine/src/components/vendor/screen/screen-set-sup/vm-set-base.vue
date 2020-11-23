<template>
    <div class="vm_set_base">
      <el-form class="content" ref="form">
        <div class="section">
          <h3 class="name">大屏基本设置</h3>
          <div class="form-item">
            <label class="title">大屏名称</label>
            <el-form-item>
              <el-input v-model="baseInfo.ScreenName" placeholder="请输入大屏名称"
                        @input.enter.native="widthCheck($event.target, 28);"></el-input>
            </el-form-item>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="section">
          <h3 class="name">网络地理位置</h3>
          <div class="radio-list">
            <el-radio v-model="radio" label="headquarters">默认位置</el-radio>
            <el-radio v-model="radio" label="branch">分支详情</el-radio>
          </div>
          <div class="form-item">
            <div v-show="radio == 'headquarters'">
              <label class="title">总部</label>
              <el-form-item>
                <div class="item">
                  <span class="title_sub">总部名称</span>
                  <el-input v-model="base_general.name"
                            placeholder="请输入总部名称"
                            class="input_special" disabled>
                  </el-input>
                </div>
                <div class="divider"></div>
                <div class="item">
                  <span class="title_sub">所在城市</span>
                  <el-cascader placeholder="请选择地理位置"
                               v-model="base_general.cascader"
                               :options="area_array"
                               filterable
                               clearable>
                  </el-cascader>
                </div>
              </el-form-item>
            </div>
            <div v-show="radio == 'branch'">
              <div class="net-item">
                <label class="title">分支</label>
                <div class="item" v-for="(item,$index) in branch" :key="$index">
                  <el-checkbox v-model="item.checked" :disabled="item.disabled"></el-checkbox>
                  <span class="name"><span class="na1">分支名称：</span><span class="na2">{{item.branch}}</span></span>
                  <span class="address"><span class="na1">所在城市：</span><span class="na2">{{item.location}}</span></span>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="btn-group">
          <el-button class="btn btn_cacel" @click="click_screen_cancel();">取消</el-button>
          <el-button class="btn btn_ok" @click="click_screen_ok();">保存</el-button>
        </div>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import { pca, pcaa } from "area-data";
    export default {
      name: "vm-set-base",
      data() {
        return {
          radio: '',
          area_array:[],
          baseInfo:{
            ScreenName: 'ThreatEye高级威胁检测系统',
            ExtraneousDistribution:[],
            ExtraneousDistributionType:'headquarters'
          },
          base_general: {
            name: "总部",
            cascader: []
          },
          branch: []
        }
      },
      created(){
        this.getData();

        var options = [];
        // 遍历省级
        Object.keys(pca[86]).forEach(function (key) {
          var obj = {}
          obj.id = key
          obj.value = pca[86][key]
          obj.label = pca[86][key]
          obj.children = []
          options.push(obj)
        });
        // 添加市级
        options.forEach(element => {
          Object.keys(pca).forEach(function (key) {
            if (element.id == key) {
              Object.keys(pca[key]).forEach(function (item) {
                var obj = {}
                obj.value = pca[key][item]
                obj.label = pca[key][item]
                element.children.push(obj)
              })
            }
          });
        });

        this.area_array = options;
      },
      methods:{
        //获取大屏名称
        getData () {
          this.$axios
            .get('/yiiapi/demonstration/get-base-config')

            .then((resp) => {
             // console.log(resp)
              let {status, data} = resp.data;

              if(status == 0){
                this.radio = data.ExtraneousDistributionType;

                if(data.ExtraneousDistributionType == 'headquarters'){
                  let feedback = data.ExtraneousDistribution;
                  if (feedback != null || feedback != ''){
                    var feedAttr = feedback.split('-');
                    this.base_general.cascader = [feedAttr[0],feedAttr[1]];
                  } else {
                    this.base_general.cascader = [];
                  }
                }
                this.baseInfo = data;
                this.getBranch();
              }
            })
            .catch((error) => {

              console.log(error);

            });
        },
        //获取全部分支
        getBranch () {
          this.$axios
            .get('/yiiapi/demonstration/get-branchs')
            .then((resp) => {
              let {status, data} = resp.data;

              //console.log(data)

              if(status == 0){
                data.map(item => {
                  if(item.location == '-'||item.location == ''){
                    item.disabled = true;
                    item.checked = false;
                  }else {
                    item.disabled = false;

                    if(this.baseInfo.ExtraneousDistribution
                      .includes(item.branch)){
                      item.checked = true;
                    }else {
                      item.checked = false;
                    }
                  }
                });

                this.branch = data;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        //取消点击事件
        click_screen_cancel() {
          this.$router.push({path: '/screen'});
        },
        click_screen_ok() {

          let types = this.radio;
          if(types == 'headquarters'){
            let cascader = this.base_general.cascader.toString();
            var distribution = cascader.replace(/,/g, "-");

          }else {

            var distribution = this.branch
              .map(item => {
                if(item.checked) {
                  return item.branch;
                }
              });
            distribution = distribution.filter(item => {
              if (item){return item;}
            })
          }

          if(distribution == ''){
            this.$message.warning('请选择所在城市');
            return false;
          }

          let params = {
            ScreenName:this.baseInfo.ScreenName,
            ExtraneousDistributionType:this.radio,
            ExtraneousDistribution: distribution
          }

          this.$axios
            .put('/yiiapi/demonstration/set-base-config',params)
            .then((resp) => {

              let {status, data} = resp.data;

              if(status == 0){
                this.$message.success('提交成功！');
                this.$router.push({path: '/screen'});
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        widthCheck (str, len) {
          var temp = 0
          for (var i = 0; i < str.value.length; i++) {
            if (/[\u4e00-\u9fa5]/.test(str.value[i])) {
              temp += 2
            } else {
              temp++
            }
            if (temp > len) {
              str.value = str.value.substr(0, i)
            }
          }
        }
      },
      watch:{
        'baseInfo.ScreenName'(newValue, oldValue) {
          this.baseInfo.ScreenName =  this.baseInfo.ScreenName.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,'');
          console.log(this.baseInfo.ScreenName)
        }
      }
    }
</script>

<style scoped lang="less">
.vm_set_base{
  margin-left:12px;
  background: #fff;
  padding: 0 36px 0 24px;
  overflow-y: auto;
  height: calc(100vh - 64px);
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    /* border-radius: 6px;*/
  }
  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 6px;
    background: #a8a8a8;
    /*background: red;*/
  }
  &::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 6px;
    background: #f4f4f4;
  }
  /deep/
  .content{
    .section{
      padding: 20px 0;
      .name{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        text-align: left;
      }
      .form-item{
        text-align: left;
        .title{
          font-size: 12px;
          color: #999999;
          margin: 30px 0 12px;
          display: block;
          font-family: PingFangSC-Regular;
        }
        .el-divider--horizontal{
          width: 788px;
          margin: 0;
          &.el-divider{
            background-color: #ececec;
          }
        }
        .el-form-item{
          text-align: left;
          width: 788px;
          position: relative;
          .el-form-item__content{
            display: flex;
            .title{
              display: block;
            }
            .item {
              flex: 1;
              .title_sub {
                display: inline-block;
                width: 70px;
                line-height: 42px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
              }
              .input_special{
                width: auto;
                float: right;
                .el-input__inner{
                  width: 280px;
                  height: 42px;
                }
              }
              /deep/
              .el-cascader{
                float: right;
                width: 280px;
              }
            }
            .divider{
              width: 60px;
            }
            .el-radio-group{
              .el-radio__label{
                color: #333;
              }
            }
          }
          .e-item-i{
            position: absolute;
            top: 12px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            &.e-item-add{
              right: -30px;
              background-image: url("../../../../assets/images/screen/set-add.png");
            }
            &.e-item-delete{
              right: -60px;
              background-image: url("../../../../assets/images/screen/set-delete.png");
            }
          }
          &.el-form-item_radio{
            margin-top: 20px;
          }
        }
        .net-item{
          width: 788px;
          .names{
            font-size: 12px;
            color: #999999;
            margin: 30px 0 12px;
            display: block;
            font-family: PingFangSC-Regular;
          }
          .item {
            height: 36px;
            line-height: 36px;
            /deep/
            .el-checkbox{
              .el-checkbox__input{
                vertical-align: inherit;
              }
            }
            .name{
              font-family: PingFangSC-Medium;
              font-size: 1rem;
              color: #333333;
              text-align: left;
              display: inline-block;
              width: 360px;
            }
            .na1{
              margin-left: 10px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .na2{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
            }
          }
          &:last-child{
            margin-bottom: 16px;
          }
        }
      }
      .radio-list{
        width: 788px;
        margin: 20px 0;
        text-align: left;
      }
    }
    .btn-group {
      width: 788px;
      text-align: left;
      margin: 10px 0 30px;
      /deep/
      .btn {
        margin: 9px 0;
        border: 1px solid #0070FF;
        width: 136px;
        height: 38px;
        line-height: initial;
        border-radius: 0;
        font-size: 16px;
        padding: 0;
        font-family: PingFangSC-Regular;

        &.btn_cacel {
          background: #fff;
          color: #0070FF;
          margin-right: 10px;
        }

        &.btn_ok {
          background: #0070FF;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
