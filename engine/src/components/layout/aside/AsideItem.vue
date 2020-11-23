<template>
  <div class="aside-item" v-cloak>

      <template v-if="!item.children">
        <router-link class="item" :to="item.path" :key="item.meta.auth" active-class="" exact-active-class="">
          <el-menu-item :index="String(item.meta.auth)" v-show="item.meta.title != '沙箱' ? true : sandbox">
            <i v-if="item.meta.deep == 1" class="e-aside-icon" :class="item.meta.icon"></i>
            <span slot="title" class="title">{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>

      <el-submenu v-else :index="item.meta.auth">
        <template slot="title">
          <i v-if="item.meta.deep == 1" class="e-aside-icon" :class="item.meta.icon"></i>
          <span v-show="!collapse">{{item.meta.title}}</span>
          <i class="el-icon-caret-bottom" v-show="!collapse"></i>
        </template>

        <aside-item v-for="child in item.children" :key="child.path" :item="child"></aside-item>
      </el-submenu>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  export default {
    name: 'aside-item',
    props: {
      item: {
        type: Object,
        required: true
      },
      collapse:{
        type: Boolean,
        default: false
      }
    },
    computed:{
      ...mapState({
        sandbox: state => state.layout.sandbox,
      })
    }
  }
</script>
<style scoped lang="less">
  .aside-item{
    .item{
      text-decoration: none;
      .el-menu-item {
        font-size: 14px;
        color: #333;
        text-align: left;
        position: relative;
        padding: 0 24px;
        -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
        transition: 0s height, 0s padding-top, 0s padding-bottom;
        i.e-aside-icon{
          margin-right: 5px;
          width: 18px;
          height: 18px;
          display: inline-block;
          background-repeat: no-repeat;
          vertical-align: middle;
          background-size: 16px;
          &.e-aside-overview{
            background-image: url("../../../assets/images/layout/aside/default/overview.png");
          }
          &.e-aside-screen{
            background-image: url("../../../assets/images/layout/aside/default/screen.png");
          }
          &.e-aside-assets{
            background-image: url("../../../assets/images/layout/aside/default/assets.png");
          }
          &.e-aside-works{
            background-image: url("../../../assets/images/layout/aside/default/works.png");
          }
          &.e-aside-network{
            background-image: url("../../../assets/images/layout/aside/default/network.png");
          }
          &.e-aside-terminal{
            background-image: url("../../../assets/images/layout/aside/default/terminal.png");
          }
          &.e-aside-journal{
            background-image: url("../../../assets/images/layout/aside/default/journal.png");
          }
          &.e-aside-create{
            background-image: url("../../../assets/images/layout/aside/default/create.png");
          }
          &.e-aside-sending{
            background-image: url("../../../assets/images/layout/aside/default/sending.png");
          }
          &.e-aside-dns{
            background-image: url("../../../assets/images/layout/aside/default/dns.png");
          }
          &.e-aside-url{
            background-image: url("../../../assets/images/layout/aside/default/url.png");
          }
          &.e-aside-host{
            background-image: url("../../../assets/images/layout/aside/default/host.png");
          }
          &.e-aside-user{
            background-image: url("../../../assets/images/layout/aside/default/user.png");
          }
          &.e-aside-file{
            background-image: url("../../../assets/images/layout/aside/default/file.png");
          }
          &.e-aside-sign{
            background-image: url("../../../assets/images/layout/aside/default/sign.png");
          }
          &.e-aside-data{
            background-image: url("../../../assets/images/layout/aside/default/data.png");
          }
          &.e-aside-flow{
            background-image: url("../../../assets/images/layout/aside/default/flow.png");
          }
          &.e-aside-ioc{
            background-image: url("../../../assets/images/layout/aside/default/ioc.png");
          }
          &.e-aside-big{
            background-image: url("../../../assets/images/layout/aside/default/big.png");
          }
        }
        span.title{
          vertical-align: inherit;
        }
        &.is-active {
          color: #fff;
          background-color: #0070ff;
          i.e-aside-icon{
            &.e-aside-overview{
              background-image: url("../../../assets/images/layout/aside/active/overview.png");
            }
            &.e-aside-screen{
              background-image: url("../../../assets/images/layout/aside/active/screen.png");
            }
            &.e-aside-assets{
              background-image: url("../../../assets/images/layout/aside/active/assets.png");
            }
            &.e-aside-works{
              background-image: url("../../../assets/images/layout/aside/active/works.png");
            }
            &.e-aside-network{
              background-image: url("../../../assets/images/layout/aside/active/network.png");
            }
            &.e-aside-terminal{
              background-image: url("../../../assets/images/layout/aside/active/terminal.png");
            }
            &.e-aside-journal{
              background-image: url("../../../assets/images/layout/aside/active/journal.png");
            }
            &.e-aside-create{
              background-image: url("../../../assets/images/layout/aside/active/create.png");
            }
            &.e-aside-sending{
              background-image: url("../../../assets/images/layout/aside/active/sending.png");
            }
            &.e-aside-dns{
              background-image: url("../../../assets/images/layout/aside/active/dns.png");
            }
            &.e-aside-url{
              background-image: url("../../../assets/images/layout/aside/active/url.png");
            }
            &.e-aside-host{
              background-image: url("../../../assets/images/layout/aside/active/host.png");
            }
            &.e-aside-user{
              background-image: url("../../../assets/images/layout/aside/active/user.png");
            }
            &.e-aside-file{
              background-image: url("../../../assets/images/layout/aside/active/file.png");
            }
            &.e-aside-sign{
              background-image: url("../../../assets/images/layout/aside/active/sign.png");
            }
            &.e-aside-data{
              background-image: url("../../../assets/images/layout/aside/active/data.png");
            }
            &.e-aside-flow{
              background-image: url("../../../assets/images/layout/aside/active/flow.png");
            }
            &.e-aside-ioc{
              background-image: url("../../../assets/images/layout/aside/active/ioc.png");
            }
          }
          &:after{
            content: "";
            display: block;
            width: 0px;
            height: 0px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid #0070FF;
            position: absolute;
            top: 20px;
            right: -8px;
            z-index: 999;
          }
        }
      }
    }
    /deep/
    .el-submenu{
      .el-submenu__title{
        text-align: left;
        position: relative;
        overflow: hidden;
        i.e-aside-icon{
          margin-right: 5px;
          width: 18px;
          height: 18px;
          display: inline-block;
          background-repeat: no-repeat;
          vertical-align: middle;
          background-size: 16px;
          &.e-aside-risks{
            background-image: url("../../../assets/images/layout/aside/default/risks.png");
          }
          &.e-aside-control{
            background-image: url("../../../assets/images/layout/aside/default/control.png");
          }
          &.e-aside-setting{
            background-image: url("../../../assets/images/layout/aside/default/setting.png");
          }
          &.e-aside-big{
            background-image: url("../../../assets/images/layout/aside/default/big.png");
          }
        }
        i.el-submenu__icon-arrow{
          display: none;
        }
        i.el-icon-caret-bottom{
          position: absolute;
          right: 10px;
          top: 20px;
          color: #666;
          font-size: 14px;
        }
      }
      .el-menu{
        .aside-item{
          a.item{
            .el-menu-item{
              color: #999;
              padding-left: 60px!important;
              &.is-active{
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
