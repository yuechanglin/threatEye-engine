<template>
  <div class="e-combobox"  :class="bussinessType?'show':'hidde'" v-cloak>
   <!-- <dl>
      <dt>业务类型:</dt>
      <dd ref="bussinessTypeRef">
        <a href="javascript:void(0)" rel="external nofollow" rel="external nofollow" rel="external nofollow" rel="external nofollow" name=""
           @click="getchildMenu($event)" class="active">全部</a>
        <a href="javascript:void(0)" rel="external nofollow" rel="external nofollow" rel="external nofollow" rel="external nofollow" :name="item.code" v-for="item in projectType"
           @click="getchildMenu($event)">{{item.name}}</a>
      </dd>
      <i class="unfold" @click="bussinessType = !bussinessType"
         v-show="bussinessHeight>40">
        {{ bussinessType ? '收起' : '更多'}}
        <Icon :type="bussinessType?'chevron-down':'chevron-up'" ></Icon>
      </i>
    </dl>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'e-combobox',
    data() {
      return {
        currentPage: 1
      };
    },
    methods: {
      businessType: function () {
        this.$nextTick(function(){
          let cur = this.$refs['industryRef'];
          if(cur){
            this.industryHeight = cur.clientHeight;
          }
        });
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.e-combobox{
  text-align: center;
  margin-top: 30px;
}

.show{
  height: auto;
  border-bottom: 1px solid #ebebeb;
}

.hidde{
  height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #ebebeb;
}
.list-filter {
  position: relative;
  margin-bottom: 20px;
  font-size: 14px;
}

.list-filter dl {
  overflow: hidden;
}

.list-filter dt {
  float: left;
  height: 40px;
  line-height: 40px;
}

.list-filter dd {
  margin-left: 30px;
  float: left;
  width: 85%;
  line-height: 40px;

}
.unfold{
  font-size: 14px;
  color: #00A971;
  cursor: pointer;
  font-style: normal;
  vertical-align: middle;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.list-filter a {
  color: #333;
  display: inline-block;
  margin-right: 20px;
  padding: 0 5px;
  text-decoration: none;
  line-height: 2em;
  z-index: 0;
}
</style>
