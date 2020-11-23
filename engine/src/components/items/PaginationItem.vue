<template>
  <div class="pagination-item" v-cloak>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10,20,50,100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'detail-item',
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pagination-item{
  text-align: center;
  margin: 20px 0 0;
}
</style>
