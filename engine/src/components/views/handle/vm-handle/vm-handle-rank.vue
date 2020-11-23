<template>
  <div class="vm-handle-rank">
    <!--第一行-->
    <el-row type="flex" class="vm_rank vm_rank1" justify="space-between">
      <el-col class="vm_col_btn">
        <e-dropdown title="初始访问"></e-dropdown>
      </el-col>
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="执行"></e-dropdown>
      </el-col>
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="持久化"></e-dropdown>
      </el-col>
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="提权"></e-dropdown>
      </el-col>
      <!--<el-col class="vm_col_btn">
        <e-dropdown title='提权' :options='rankOptions[0]' v-on:updateOption="updateDropdown"
                    v-on:updateShowMenu="showMenu"></e-dropdown>
      </el-col>-->
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="防御逃逸"></e-dropdown>
      </el-col>
     <!-- <el-col class="vm_col_btn">
        <e-dropdown title='防御逃逸' :options='rankOptions[1]' v-on:updateOption="updateDropdown"
                    v-on:updateShowMenu="showMenu"></e-dropdown>
      </el-col>-->
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="凭证访问"></e-dropdown>
      </el-col>
     <!-- <el-col class="vm_col_btn">
        <e-dropdown title='凭证访问' :options='rankOptions[2]' v-on:updateOption="updateDropdown"
                    v-on:updateShowMenu="showMenu"></e-dropdown>
      </el-col>-->
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="信息发现"></e-dropdown>
      </el-col>
      <!--<el-col class="vm_col_btn">
        <e-dropdown title='信息发现' :options='rankOptions[3]' v-on:updateOption="updateDropdown"
                    v-on:updateShowMenu="showMenu"></e-dropdown>
      </el-col>-->
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="横向移动"></e-dropdown>
      </el-col>
     <!-- <el-col class="vm_col_btn">
        <e-dropdown title='横向移动' :options='rankOptions[4]' v-on:updateOption="updateDropdown"
                    v-on:updateShowMenu="showMenu"></e-dropdown>
      </el-col>-->
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="信息收集"></e-dropdown>
      </el-col>
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="命令控制"></e-dropdown>
      </el-col>
      <el-col class="vm_col_arrow_right">
        <div class="rect"></div>
        <div class="triangle"></div>
      </el-col>
      <el-col class="vm_col_btn">
        <e-dropdown title="信息泄露"></e-dropdown>
      </el-col>
    </el-row>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-handle-rank',
    props: {
      option: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        rankOptions: [
          {
            title: '提权',pid:0, count:0,showMenu:false, data: [/*{name: '网络', children: [{name: '168.192.1.456'}, {name: '210.44.133.210'}]}, {name: '端点'}, {name: '站点'}*/]
          },
          {
            title: '防御逃逸',pid:1,count: 0,showMenu:false, data:[/*{name: '端点'}, {name: '站点'}*/]
          },
          {
            title: '凭证访问',pid:2, showMenu:false, data:[]
          },
          {
            title: '信息发现',pid:3,count:0,showMenu:false, data:[]
          },
          {
            title: '横向移动',pid:4,count:0,showMenu:false, data:[/*{name: '横向移动1'}, {name: '横向移动2'}*/]
          }
        ],
        rectStyle: {}
      }
    },
    methods: {
      updateDropdown(option) {
        console.info(option)
      },

      showMenu(args){
        if(args == undefined){return false;}
        return this.rankOptions.filter(function (v,k) {
          if(v.pid == args){
            v.showMenu = !v.showMenu;
          }else {
            v.showMenu = false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-handle-rank {
    position: absolute;
    width: 100%;
    top: 30px;
    .vm_rank {
      display: flex;
      margin-bottom: 36px;

      &:last-child {
        margin-bottom: 0;
      }
      .vm_col_btn {
        width: 104px;
      }

      &.vm_rank1 {
        position: relative;
        .vm_col_arrow_right{
          flex: 1;
          display: flex;
          height: 48px;
          .rect{
            flex: 1;
            background: #EEF6FF;
            height: 12px;
            margin: 18px 0 18px 4px;
          }
          .triangle{
            height: 0;
            margin-top: 15px;
            margin-right: 4px;
            border-top: 7px solid transparent;
            border-bottom: 12px solid transparent;
            border-left: 8px solid #EEF6FF;
          }
        }

      }
      &.vm_rank2 {
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 24px;
          height: 36px;
          left: 40px;
          bottom: -36px;
          position: absolute;
          background-repeat: no-repeat;
          background-position: 0px;
          background-image: url("../../../../assets/images/home/common/arrow_down.png");
          background-size: 24px 32px;
        }
        .vm_col_arrow_left{
          flex: 1;
          display: flex;
          height: 48px;
          .triangle{
            height: 0;
            margin-top: 15px;
            margin-left: 4px;
            border-top: 7px solid transparent;
            border-bottom: 12px solid transparent;
            border-right: 8px solid #EEF6FF;
          }
          .rect{
            flex: 1;
            background: #EEF6FF;
            height: 12px;
            margin: 18px 4px 18px 0px;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .vm_col_btn {
    .e-dropdown {
      width: 104px;
      .e-btn {
        width: 104px;
        height: 48px;
        line-height: 48px;
        background: #EEF6FF;
        font-size: 12px;
        color: #aaa;
        padding: 0;
        border-width: 0;
        font-family: PingFang;
        &.is-active {
          color: #0070FF;
        }
      }
    }
  }
</style>
