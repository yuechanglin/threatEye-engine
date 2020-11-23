<template>
  <div id="main_content" v-cloak></div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {setRedirect} from '@/assets/js/setRedirect';
  export default {
    name: 'main_content',
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      let path = setRedirect(this.roles)

      this.$router.push(path,() => {});
    },
    updated() {},
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main_content{}
</style>
