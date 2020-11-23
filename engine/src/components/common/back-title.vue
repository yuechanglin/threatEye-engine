<template>
  <div class="back-title"
       v-cloak>
    <a class="back"
       onclick="javascript:window.history.go(-1);">
      <span class="el-icon-arrow-left"></span>
      <span class="e-title">返回</span>
    </a>
    <h4 class="e-name">{{titleName}}</h4>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "backTitle",
  props: {
    titleName: {
      type: String,
      default: "通知消息"
    }
  },
  directives: {
    /* back: {
       inserted(el, binding) {
         let back = document.createElement("a");
         back.className = "back";
         back.style = `position: absolute;left:56px;top: 24px;font-size: 14px;display: block;cursor: pointer;color: #999999;`;
         back.innerHTML = `<span class="el-icon-arrow-left"></span><span class="va-title">返回</span>`;
         back.onclick = function() {
           window.history.go(-1);
         };
         el.appendChild(back);
       }
     }*/
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.back-title {
  height: 106px;
  background-color: #f8f8f8;
  padding: 0 56px;
  position: relative;
  .back {
    position: absolute;
    left: 56px;
    top: 24px;
    font-size: 14px;
    display: block;
    cursor: pointer;
    color: #999999;
    .e-title {
      font-family: PingFang;
      font-size: 14px;
      color: #999999;
      line-height: 18px;
      margin-left: -4px;
    }
  }
  .e-name {
    position: absolute;
    left: 56px;
    bottom: 12px;
    font-size: 20px;
    font-family: PingFangMedium;
    color: #333333;
  }
}
</style>
