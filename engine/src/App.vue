<template>
  <div id="App">
    <transition :name="transitionName">
      <router-view :key="key"/>
    </transition>
  </div>
</template>

<script>
import config from '../package.json'
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  created () {
    console.log(config.version, '当前版本号')
  },
  computed: {
    key () {
      return this.$route.path + Math.random();
    }
  },
  watch: {
    $route (to, from) {
      if (to.path == 'main_content') {
        this.transitionName = "";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
}
</script>

<style lang="less">
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nprogress {
  .bar {
    background: #0070ff !important;
  }
}
/*向右过渡*/
.slide-right-enter {
  opacity: 0;
  /*transform: translate(-50%, 0);*/
  transform: translate(-100px, 0);
}
.slide-right-enter-active {
  transition: all 300ms ease;
}
</style>
