<template>
  <div class="detail-item"
       v-cloak
       v-back>
    <!--<router-link :to="'/'">
      <a class="va-link">
        <i class="va-icon-left"></i>
        <span class="va-title">返回</span>
      </a>
    </router-link>-->
    <h4 class="va-name">{{title}}</h4>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'detail-item',
  props: {
    title: {
      type: String,
      default: '通知消息'
    }
  },
  directives: {
    'back': {
      inserted (el, binding) {
        let back = document.createElement("a");
        back.className = "va-link";
        back.style = `position: absolute;left:56px;top: 8px;display: block;cursor: pointer;`;
        back.innerHTML = `<span class="el-icon-arrow-left"></span><span class="va-title">返回</span>`;
        back.onclick = function () {
          window.history.go(-1);
          //this.$router.go(-1)
        }
        el.appendChild(back);
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.detail-item {
  height: 80px;
  background-color: #f8f8f8;
  padding: 0 56px;
  position: relative;
  .va-link {
    position: absolute;
    left: 56px;
    top: 8px;
    display: block;
    cursor: pointer;
    /*.va-icon-left{
      width: 10px;
      height: 10px;
      display: inline-block;
      background-image: url("../../assets/images/common/back.png");
      background-repeat: no-repeat;
    }*/
    .va-title {
      font-family: PingFang;
      font-size: 14px;
      color: #999999;
      line-height: 18px;
    }
  }
  .va-name {
    position: absolute;
    left: 56px;
    top: 40px;
    font-family: PingFangMedium;
    font-size: 18px;
    color: #333333;
    /*font-weight: normal;*/
  }
}
</style>
