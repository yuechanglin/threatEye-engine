<template>
 <div class="Risks">
   <transition name="slider">
     <keep-alive>
       <router-view/>
     </keep-alive>
   </transition>
 </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "Risks",
      created () {
        this.check_passwd();
      },
      methods:{
        // 测试密码过期
        check_passwd () {
          this.$axios.get('/yiiapi/site/check-passwd-reset')
            .then((resp) => {
              let {
                status,
                msg,
                data
              } = resp.data;
              if(status != 0){
                for(let key in msg){
                  if(key == 600){
                    this.$message(
                      {
                        message: msg[key],
                        type: 'warning',
                      }
                    );
                  }
                  if(key == 602){
                    this.$message(
                      {
                        message: msg[key],
                        type: 'warning',
                      }
                    );
                    eventBus.$emit('reset');
                  }
                }
              }
            })
        }
      }
    }
</script>

<style scoped>
  .slider-enter{
    opacity: 0;
    transform: translateX(100px);
  }
  .slider-enter-active{
    transition: all .3s ease;
  }
</style>
