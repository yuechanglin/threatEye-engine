<template>
  <div class="vm-screen-main2" id="box">
    <ul class="box-list" :class="{anim:animate == true}">
      <li v-for="(item,index) in items" :key="item.id" class="item">
        <i class="t-arrow"></i><span class="t-content" :title="item.title">{{item.title}}</span>
        <span class="t-time">{{item.updated_at}}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main2",
      data(){
          return{
            animate:false,
            items:[],
            timer:null,
            timers:null
          }
      },
      created(){
        this.getData();
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
        },10000 * 30);
      },
      destroyed(){
        clearInterval(this.timers);
      },
      methods: {
        //获取数据
        getData(){
          this.$axios
            .get('/yiiapi/demonstration/threat-dynamics')
            .then((resp) => {
              let {status, data} = resp.data;

              clearInterval(this.timer);

              if(status == 0){
                this.items = data;
                this.timer = setInterval(this.scroll,3000);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        scroll(){
          this.animate= true;
          setTimeout(()=>{
            this.items.push(this.items[0]);
            this.items.shift();
            this.animate=false;
          },1000)
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main2{
  padding: 0 16px 16px;
  height: 248px;
  overflow: hidden;
  .box-list{
    &.anim{
      transition: all 0.5s;
      margin-top: -62px;
    }
    .item{
      height: 56px!important;
      line-height: 30px;
      border: 1px solid #007AFF;
      margin-bottom: 6px;
      background-image:
        linear-gradient(90deg, rgba(0,122,255,0.36) 0%,
        rgba(0,122,255,0.00) 100%);
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #FFFFFF;
      /*padding: 0 16px;*/
      position: relative;

      .t-arrow{
        position: absolute;
        left: 16px;
        top: 8px;
        width: 14px;
        height: 14px;
        background-image: url("../../../../assets/images/screen/aside-arrow.png");
        background-size: 14px;
      }
      .t-content{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
        position: absolute;
        left: 40px;
        width: 425px;
      }

      .t-time{
        position: absolute;
        left: 16px;
        top: 24px;
        opacity: 0.36;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
