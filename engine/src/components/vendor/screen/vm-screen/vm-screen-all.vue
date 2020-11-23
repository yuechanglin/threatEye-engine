<template>
    <div class="vm-screen-all">
      <header class="title">{{data.name}}<i class="t_img"></i></header>

      <i class="close" v-show="!close" @click="asideDelClick(data.aside_id);"></i>

      <div v-if="data.aside_id == 0">
        <vm-screen-main0></vm-screen-main0>
      </div>
      <div v-else-if="data.aside_id == 1">
        <vm-screen-main1></vm-screen-main1>
      </div>
      <div v-else-if="data.aside_id == 2">
        <vm-screen-main2></vm-screen-main2>
      </div>
      <div v-else-if="data.aside_id == 3">
        <vm-screen-main3></vm-screen-main3>
      </div>
      <div v-else-if="data.aside_id == 4">
        <vm-screen-main4></vm-screen-main4>
      </div>
      <div v-else-if="data.aside_id == 5">
        <vm-screen-main5></vm-screen-main5>
      </div>
      <div v-else-if="data.aside_id == 6">
        <vm-screen-main6></vm-screen-main6>
      </div>
      <div v-else-if="data.aside_id == 7">
        <vm-screen-main7></vm-screen-main7>
      </div>
      <div v-else-if="data.aside_id == 8">
        <vm-screen-main8></vm-screen-main8>
      </div>
      <div v-else-if="data.aside_id == 9">
        <vm-screen-main9></vm-screen-main9>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenMain0 from './vm-screen-main0';
  import VmScreenMain1 from './vm-screen-main1';
  import VmScreenMain2 from './vm-screen-main2';
  import VmScreenMain3 from './vm-screen-main3';
  import VmScreenMain4 from './vm-screen-main4';
  import VmScreenMain5 from './vm-screen-main5';
  import VmScreenMain6 from './vm-screen-main6';
  import VmScreenMain7 from './vm-screen-main7';
  import VmScreenMain8 from './vm-screen-main8';
  import VmScreenMain9 from './vm-screen-main9';
  export default {
    name: "vm-screen-all",
    props:['data','close'],
    components: {
      VmScreenMain0,
      VmScreenMain1,
      VmScreenMain2,
      VmScreenMain3,
      VmScreenMain4,
      VmScreenMain5,
      VmScreenMain6,
      VmScreenMain7,
      VmScreenMain8,
      VmScreenMain9
    },
    methods:{
      //两侧内容点击删除
      asideDelClick(id) {
        this.$store.commit('SET_ASIDE_LISTS_ID', {id,id,flag:false});
      },
    }
  }
</script>

<style scoped lang="less">
.vm-screen-all{
  position: relative;
  .close{
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    background-image: url("../../../../assets/images/screen/head-close.png");
    background-repeat: no-repeat;
    background-size: 20px;
    cursor: pointer;
  }
  .title {
    font-size: 18px;
    color: #00D7E9;
    text-align: left;
    padding: 18px 16px 10px 16px;
    font-family: PingFangSC-Medium;
    .t_img {
      width: 140px;
      height: 24px;
      margin-left: 6px;
      display: inline-block;
      vertical-align: bottom;
      background-image: url("../../../../assets/images/screen/content-bt.png");
      background-repeat: no-repeat;
      background-size: 140px 24px;
    }
  }
}
</style>
