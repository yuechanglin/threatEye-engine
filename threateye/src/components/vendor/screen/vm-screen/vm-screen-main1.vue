<template>
    <div class="vm-screen-main1">
      <div class="reli_box">
        <ul>
          <li class="reli_item"
              v-for="item in reli_list"
              :style="item.style">
          <span class="reli_item_span"
                :class="item.change?'changed':''" :title="item.indicator">
            {{item.indicator}}
          </span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main1",
      data(){
          return{
            data:[],
            count: 0,
            reli_list: [],
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
      methods:{
        random (lower, upper) {
          return Math.floor(Math.random() * (upper - lower + 1)) + lower;
        },
        getData() {
          this.$axios
            .get('/yiiapi/demonstration/threat-indicators')
            .then((resp) => {
              let {status, data} = resp.data;

              clearInterval(this.timer);

              if(status == 0){

                data.forEach(item => {
                  item.style = {
                    top: this.random(0.4, 12) + 'rem',
                    left: this.random(0.4, 18) + 'rem'
                  };
                  item.change = false;
                });

                this.reli_list = data;

                this.heatHandle();

                this.timer = setInterval(() => {
                  this.heatHandle();
                }, 5000);

              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        heatHandle(){
          if (this.reli_list.length == this.count) {
            this.count = 0;
          }
          this.reli_list.forEach(item => {
            item.change = false;
          });
          this.reli_list[this.count].change = true;
          this.count++;
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-main1{
  padding: 0 16px 16px;

  .reli_box {
    width: 100%;
    height: 240px;
    position: relative;
    .reli_item {
      width: 150px;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      position: absolute;
      .reli_item_span {
        display: block;
        opacity: 0.48;
        background: rgba(232, 57, 93, 0.2);
        border: 1px solid rgba(232, 57, 93, 0.42);
        font-size: 16px;
        color: #e8395d;
        width: 150px;
        height: 32px;
        margin: 0 auto; /*从中间向两边扩开*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.changed {
          animation: reli 2s ease-in-out 0.2s;
          animation-iteration-count: 1;
          z-index: 999;
          opacity: 1;
          animation-fill-mode: forwards;
        }
      }
    }
  }
}
@keyframes reli {
  0% {
    color: #e8395d;
    background: rgba(232, 57, 93, 0.2);
    border: 1px solid rgba(232, 57, 93, 0.42);
    width: 0;
    height: 32px;
    line-height: 32px;
    margin: 0 auto; /*从中间向两边扩开*/
    z-index: 999;
    opacity: 1;
  }
  /*70% {
    width: 120px;
    height: 32px;
    line-height: 32px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; !*从中间向两边扩开*!
    opacity: 1;
  }
  90% {
    width: 100px;
    height: 32px;
    line-height: 32px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; !*从中间向两边扩开*!
    opacity: 1;
  }*/
  100% {
    width: 150px;
    height: 32px;
    line-height: 32px;
    color: #ffffff;
    background: rgba(232, 57, 93, 1);
    border: 1px solid #e8395d;
    margin: 0 auto; /*从中间向两边扩开*/
    opacity: 1;
  }
}
</style>
