<template>
  <div id="aside" v-cloak>
    <div class="aside-breadcrumb">
        <template v-if="!isCollapse">
          <el-breadcrumb class="all-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to={path:crumb.path}>{{crumb.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="aside-crumb" align="right" @click.stop="toggleCollapse();">
            <img class="crumb-image" :src="crumbLeftSrc">
          </div>
        </template>
        <template v-else>
          <div class="aside-crumb-right" align="right" @click.stop="toggleCollapse();">
            <img class="crumb-image" :src="crumbRightSrc">
          </div>
        </template>
      </div>
    <transition name="fade">
      <el-menu :default-active="$route.meta.auth" :collapse="isCollapse" v-cloak>
        <aside-item v-for="item in asideList" :key="item.meta.auth" :item="item"
                    :collapse="isCollapse"></aside-item>
      </el-menu>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  import {mapState, mapGetters} from 'vuex'

  import AsideItem from './AsideItem';

  export default {
    name: 'Aside',
    data() {
      return {
        asideList: [],
        crumb: {
          name: '首页',
          path: '/'
        },
        crumbLeftSrc: require('@/assets/images/layout/aside/crumb-left.png'),
        crumbRightSrc: require('@/assets/images/layout/aside/crumb-right.png')
      };
    },
    components: {AsideItem},
    computed: {
      ...mapState({
        isCollapse: state => state.layout.isCollapse
      }),
      ...mapGetters([
        'addRouters'
      ]),
    },
    created() {

      this.rootAuth = this.$route.meta.rootAuth;
      this.crumb.name = this.$route.matched[0].meta.title;
      this.crumb.path = this.$route.matched[0].path;

      if (!this.rootAuth) return false;
      else this.setHighlightIndex();
    },

    watch: {
      $route(to, from) {
        this.rootAuth = to.meta.rootAuth;
        this.crumb.name = to.matched[0].meta.title;
        this.crumb.path = to.matched[0].path;

        this.setHighlightIndex();
      },
    },

    methods: {
      setHighlightIndex() {
        let rootAuth = this.rootAuth;
        //if(!parentAuth) return false;
        let current = this.addRouters.filter(function (v, k) {
          if (v.meta.auth == rootAuth) return v;
        });
        this.asideList = current[0].children;

      },
      toggleCollapse() {
        let collapse = this.isCollapse;
        this.$store.commit('TOGGLE_COLLAPSE', !collapse);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #aside {
    width: 210px;
    position: relative;
    .aside-breadcrumb {
      height: 60px;
      display: flex;
      .all-breadcrumb {
        flex: 1;
        height: 100%;
        line-height: 60px;
        padding: 0 24px;
        color: #333;
        font-size: 16px;
        font-family: 'PingFangMedium';
        .el-breadcrumb__item {
          .el-breadcrumb__inner {
            cursor: pointer;
          }
        }
      }
      .aside-crumb {
        width: 48px;
        cursor: pointer;
        .crumb-image {
          margin: 21px 21px;
          width: 14px;
        }
      }
      .aside-crumb-right {
        width: 56px;
        cursor: pointer;
        .crumb-image {
          margin: 21px 21px;
          width: 14px;
        }
      }
    }
    /deep/
    .el-menu {
      width: 210px;
      border-width: 0;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease-in-out;
    background-color: #fff
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

