<template>
  <div class="e-dropdown" ref="eDropdown" v-badge="options.count" v-cloak>
    <el-button class="e-btn" :class="{'is-active':options.data && options.data.length}"
               @click.stop.native="toggleDropdown($event,options.pid)">
      {{title}}<i class="el-icon-caret-bottom" v-if="options.data && options.data"></i>
    </el-button>
    <ul class="e-dropdown-menu" v-if="options.data && options.data.length" :class="{'hide':!options.showMenu}"
        @mouseleave="mouseLeave">
      <li class="item" v-for="(option,$index) in options.data" :key="$index" :title="option.name"
          @click.stop.prevent="updateOption(option,options.pid);" @mouseover="mouseOver($index);" >
        <a class="item_a" href="javascript:void(0);">
          {{ option.name }}
        </a>
        <ul class="e-dropdown-menu__item" v-if="option.children" :class="{'show':Object.is(showIndex,$index)}">
          <li class="item__item" v-for="(opt,idx) in option.children" :key="idx" :title="opt.name">
            <a class="item_a__item" href="javascript:void(0);" @click.stop.prevent="updateOption(opt,options.pid);">
              {{ opt.name }}
            </a>
          </li>
        </ul>
        <i v-if="option.children" class="e-icon-arrow el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'e-dropdown',
    // 传入子组件的参数写到props
    props: {
      title: {
        type: String,
        default: '凭证访问'
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        showIndex: '',
        selectedOption: {}
      }
    },
    mounted() {
      let that = this;
      document.addEventListener('click', function (e) {
        e.stopPropagation();
        if (e.target.className != 'e-dropdown') {
          that.options.showMenu = false;
        }
      })
    },
    methods: {
      //按钮点击事件
      toggleDropdown(e,pid) {
        if(pid == undefined){return false;}
        this.$emit('updateShowMenu', pid);
      },
      //下拉框点击事件
      updateOption(opts,pid) {
        if (opts.children && opts.children.length) {
          return false;
        } else {
          this.selectedOption = opts;
          this.$emit('updateOption', opts);
          this.$emit('updateShowMenu', pid);
        }
      },
      mouseOver(index) {
        this.showIndex = index;
      },
      mouseLeave() {
        this.showIndex = '';
      }
    }
  }
</script>

<style scoped lang="less">
  .e-dropdown {
    width: auto;
    position: relative;

    .e-btn {
      border-radius: 2px;
      border-width: 0;
      width: 100%;
    }

    .e-dropdown-menu {
      background: #FFFFFF;
      border-radius: 2px;
      width: 100%;
      box-shadow: 0 0 10px 6px rgba(0, 0, 0, .1);
      position: absolute;
      margin-top: 6px;
      border-top: 2px solid #0070FF;
      padding-bottom: 2px;
      z-index: 1001;

      &.hide {
        display: none;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        height: 0;
        top: -6px;
        left: 44%;
        margin-right: 4px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #0070FF;
      }

      .item {
        height: 32px;
        line-height: 32px;
        text-align: left;
        list-style: none;
        padding: 0 10px;
        position: relative;

        &:hover {
          background: #EEF6FF;
        }

        .item_a {
          text-decoration: none;
          color: #333333;
          font-family: PingFang;
          font-size: 12px;
          @media (min-width: 1600px) {
            font-size: 14px;
          }
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .e-dropdown-menu__item {
          display: none;
          position: absolute;
          min-width: 50px;
          top: 0;
          left: 100%;
          background: #FFFFFF;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 10px 6px rgba(0, 0, 0, .05);
          /* box-shadow: 0 0 10px 6px rgba(238,246,255,1);*/

          .item__item {
            list-style: none;
            text-align: left;

            &:hover {
              background: #EEF6FF;
            }

            .item_a__item {
              padding: 0 10px;
              text-decoration: none;
              color: #333;
              font-size: 12px;
              @media (min-width: 1600px) {
                font-size: 14px;
              }
            }
          }
          &.show {
            display: block;
          }
        }
      }
      .e-icon-arrow {
        position: absolute;
        top: 10px;
        right: 6px;
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
