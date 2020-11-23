<template>
    <div class="detail-computer" v-cloak>
        <back-title :title-name="title_name"></back-title>
        <div class="detail_base_top">
            <div class="top_left">
                <img src="@/assets/images/emerge/top1.png" alt="">
                <span class="top_left_title" @click="computer_active">JamesWin7-64Pro</span>
                <ul class="src_ul" v-show='src_active_ul'>
                    <li @click="computer_active_item()">威胁追查</li>
                </ul>
            </div>
        </div>
        <div class="detail_base_bom">
            <div class="bom_item">
                <li>
                    <span class="title">操作系统:</span>
                    <span class="content">Windows 7 , Enterprise Edition , 6.1.7601 SP1 , x64 architecture , 64 bits OS</span>
                </li>
                <li>
                    <span class="title">所在域:</span>
                    <span class="content"></span>
                </li>
                <li>
                    <span class="title">IP地址:</span>
                    <span class="content">114.242.16.83</span>
                </li>
                <li>
                    <span class="title">配置文件:</span>
                    <span class="content">2.2.0.23</span>
                </li>
                <li>
                    <span class="title">分组:</span>
                    <span class="content">
                        北京
                    </span>
                </li>
            </div>
            <div class="bom_item">
                <li>
                    <span class="title">状态:</span>
                    <span class="content">
                        <span class="status">断开</span>
                    </span>
                </li>
                <li>
                    <span class="title">隔离:</span>
                    <span class="content">
                        <el-switch v-model="value1">
                        </el-switch>
                    </span>
                </li>
                <li>
                    <span class="title">Sensor版本:</span>
                    <span class="content">2.2.0.23</span>
                </li>
                <li>
                    <span class="title">SensorID:</span>
                    <span class="content">42949673002</span>
                </li>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-computer",
  components: {
    backTitle
  },
  data() {
    return {
      title_name: "计算机详情",
      src_active_ul: false,
      value1: true
    };
  },
  methods: {
    computer_active() {
      this.src_active_ul = !this.src_active_ul;
    },
    computer_active_item(num) {
      this.src_active_ul = false;
    }
  }
};
</script>

<style scoped lang="less">
.detail-computer {
  text-align: left;
  .detail_base_top {
    padding: 0 56px;
    height: 62px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #ececec;
    .top_left {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 56px;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      .top_left_title {
        font-family: PingFangMedium;
        vertical-align: middle;
        font-size: 16px;
        color: #0070ff;
        cursor: pointer;
      }
      .src_ul {
        width: 180px;
        padding: 10px 0;
        background: #fff;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
        position: absolute;
        left: 42px;
        top: 30px;
        z-index: 99;
        li {
          height: 32px;
          line-height: 32px;
          padding: 0 12px;
          cursor: pointer;
        }
        li:hover {
          background: #eef6ff;
        }
      }
    }
  }
  .detail_base_bom {
    padding: 24px 56px;
    background: #fff;
    display: flex;
    .bom_item {
      flex: 1;
      li {
        display: flex;
        margin-bottom: 16px;
        .title {
          width: 100px;
          font-family: PingFang;
          font-size: 16px;
          color: #333333;
        }
        .content {
          flex: 1;
          font-size: 16px;
          color: #666666;
          .status {
            background: #eef6ff;
            border-radius: 2px;
            font-size: 10px;
            color: #999999;
            padding: 5px 14px;
          }
        }
      }
    }
  }
}
</style>
