
<template>
  <div id="invest_file"
       class="common_invest"
       v-loading.fullscreen.lock="file_search.loading">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="文件追查"
                     class="tabs-item"
                     name="first">
          <div class="invest_top">
            <el-input placeholder="文件名"
                      class="search_box"
                      v-model="file_search.file_name"
                      clearable>
            </el-input>
            <el-input placeholder="哈希值"
                      class="search_box"
                      v-model="file_search.md5"
                      clearable>
            </el-input>
            <el-input placeholder="主机地址"
                      class="search_box"
                      v-model="file_search.host_ip"
                      clearable>
            </el-input>
            <vm-emerge-picker @changeTime='changeTime'
                              :option='time_list'></vm-emerge-picker>
            <el-button class="btn_i"
                       @click="search"> 搜索</el-button>
            <span class="reset"
                  @click="reset">重置</span>
            <el-button class="btn_right"
                       @click="download">下载</el-button>
          </div>
          <div class="invest_bom">
            <el-table ref="multipleTable"
                      class="reset_table"
                      align="center"
                      border
                      :data="file_list_data.data"
                      tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column label="序号"
                               align="center"
                               width="60">
                <template slot-scope="scope">
                  {{(file_search.page-1)*(file_search.rows) + scope.row.index_cn}}
                </template>
              </el-table-column>
              <el-table-column prop="timestamp"
                               align="center"
                               width="320"
                               label="时间"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="file_name"
                               align="center"
                               label="文件名"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="md5"
                               align="center"
                               label="哈希值"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="source"
                               align="center"
                               label="来源"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="host_ip"
                               align="center"
                               label="主机地址"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="application"
                               align="center"
                               label="应用"
                               show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="file_list.pageNow"
                           :page-sizes="[10,20,50,100]"
                           :page-size="10"
                           layout="total, sizes, prev, pager, next"
                           :total="file_list.count">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "invest_file",
  components: {
    VmEmergePicker
  },
  data () {
    return {
      activeName: 'first',
      time_list: {
        time: []
      },
      file_search: {
        loading: false,
        file_name: '',
        md5: '',
        host_ip: '',
        start_time: "",
        end_time: "",
        page: 1,
        rows: 10
      },
      file_list: {
        count: 0,
        pageNow: 1,
      },
      file_list_data: {
      }
    };
  },
  mounted () {
    this.test()
    this.check_passwd();
  },
  methods: {
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'investigate/file-investigation',
        }
      })
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        })
    },
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
    },
    search () {
      this.file_search.page = 1
      this.file_list.pageNow = 1
      this.get_data();
    },
    get_data () {
      this.file_search.loading = true
      this.$axios.get('/yiiapi/investigate/file-investigation', {
        params: {
          file_name: this.file_search.file_name,
          md5: this.file_search.md5,
          host_ip: this.file_search.host_ip,
          start_time: this.file_search.start_time,
          end_time: this.file_search.end_time,
          current_page: this.file_search.page,
          per_page_count: this.file_search.rows
        }
      })
        .then(response => {
          this.file_search.loading = false
          let { status, data } = response.data;
          if (status == '602') {
            return false
          }
          // if (data.count > 10000) {
          //   this.$message({
          //     type: 'warning',
          //     message: '数据超过一万条,请缩小搜索条件!'
          //   });
          //   return false
          // }
          this.file_list = data
          this.file_list_data = data.data
          this.file_list_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 重置
    reset () {
      this.file_search.file_name = ''
      this.file_search.md5 = ''
      this.file_search.host_ip = ''
      this.file_search.start_time = ''
      this.file_search.end_time = ''
      $(document.querySelector('.el-button--text')).trigger('click');
    },
    // 下载
    download () {
      if (!this.file_list.data || this.file_list.data.data.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先搜索需要下载的数据！'
        });
        return false
      }
      // if (this.file_list.count > 1000) {
      //   this.$message({
      //     type: 'warning',
      //     message: '下载数据不能超出1000条！'
      //   });
      //   return false
      // }
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          var url1 = "/yiiapi/investigate/file-investigation-export?file_name=" + this.file_search.file_name +
            '&md5=' + this.file_search.md5 +
            '&host_ip=' + this.file_search.host_ip +
            '&start_time=' + this.file_search.start_time +
            '&end_time=' + this.file_search.end_time +
            '&current_page=0&per_page_count=0';
          window.location.href = url1;
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 分页
    handleSizeChange (val) {
      this.file_search.rows = val;
      this.file_search.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      console.log(val);
      this.file_search.page = val
      this.get_data();
    },
    changeTime (data) {
      console.log(data);
      if (data) {
        this.file_search.start_time = parseInt(data[0].valueOf() / 1000);
        this.file_search.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        this.file_search.start_time = ''
        this.file_search.end_time = ''
      }
    }
  }
}
</script>
<style  lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>


