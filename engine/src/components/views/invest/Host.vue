<template>
  <div id="invest_host"
       class="common_invest"
       v-loading.fullscreen.lock="host_search.loading">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="主机追查"
                     class="tabs-item"
                     name="first">
          <div class="invest_top">
            <el-input placeholder="主机地址"
                      class="search_box"
                      v-model="host_search.host_ip"
                      clearable>
            </el-input>
            <vm-emerge-picker @changeTime='changeTime'
                              :option='time_list'></vm-emerge-picker>
            <el-button class="btn_i"
                       @click="search_data()"> 搜索</el-button>
            <span class="reset"
                  @click="reset">重置</span>
            <el-button class="btn_right"
                       @click="download">下载</el-button>
          </div>
          <div class="invest_bom">
            <el-button-group>
              <el-button :class="{'active':activeButGroup =='1'}"
                         @click="activeButGroup = '1'">网络通讯</el-button>
              <el-button :class="{'active':activeButGroup =='2'}"
                         @click="activeButGroup = '2'">文件</el-button>
              <el-button :class="{'active':activeButGroup =='3'}"
                         @click="activeButGroup = '3'">用户</el-button>
            </el-button-group>
            <!-- 网络通信 -->
            <div v-show="activeButGroup=='1'">
              <el-table ref="multipleTable"
                        class="reset_table"
                        align="center"
                        border
                        :data="host_network_data.data"
                        tooltip-effect="dark"
                        style="width: 100%">
                <el-table-column label="序号"
                                 align="center"
                                 width="60">
                  <template slot-scope="scope">
                    {{(host_network_page.page-1)*(host_network_page.rows) + scope.row.index_cn}}
                  </template>
                </el-table-column>
                <el-table-column prop="timestamp"
                                 align="center"
                                 width="320"
                                 label="时间"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="src_ip"
                                 align="center"
                                 label="源地址"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="src_port"
                                 align="center"
                                 label="源端口"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="dest_ip"
                                 align="center"
                                 label="目的地址"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="dest_port"
                                 align="center"
                                 label="目的端口"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="email"
                                 align="center"
                                 label="Email地址"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="application"
                                 align="center"
                                 label="应用"
                                 show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="handleSizeChange_network"
                             @current-change="handleCurrentChange_network"
                             :current-page="host_network.pageNow"
                             :page-sizes="[10,20,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="host_network.count">
              </el-pagination>
            </div>
            <!-- 文件 -->
            <div v-show="activeButGroup=='2'">
              <el-table ref="multipleTable"
                        class="reset_table"
                        align="center"
                        border
                        :data="host_file_data.data"
                        tooltip-effect="dark"
                        style="width: 100%">
                <el-table-column label="序号"
                                 align="center"
                                 width="60">
                  <template slot-scope="scope">
                    {{(host_file_page.page-1)*(host_file_page.rows) + scope.row.index_cn}}
                  </template>
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
                             @size-change="handleSizeChange_file"
                             @current-change="handleCurrentChange_file"
                             :current-page="host_file.pageNow"
                             :page-sizes="[10,20,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="host_file.count">
              </el-pagination>
            </div>
            <!-- 用户 -->
            <div v-show="activeButGroup=='3'">
              <el-table ref="multipleTable"
                        class="reset_table"
                        align="center"
                        border
                        :data="host_user_data.data"
                        tooltip-effect="dark"
                        style="width: 100%">
                <el-table-column label="序号"
                                 align="center"
                                 width="60">
                  <template slot-scope="scope">
                    {{(host_user_page.page-1)*(host_user_page.rows) + scope.row.index_cn}}
                  </template>
                </el-table-column>
                <el-table-column prop="user_name"
                                 align="center"
                                 label="用户名"
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
                             @size-change="handleSizeChange_user"
                             @current-change="handleCurrentChange_user"
                             :current-page="host_user.pageNow"
                             :page-sizes="[10,20,50,100]"
                             :page-size="10"
                             layout="total, sizes, prev, pager, next"
                             :total="host_user.count">
              </el-pagination>
            </div>
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
  name: "invest_host",
  data () {
    return {
      activeName: 'first',
      activeButGroup: '1',
      time_list: {
        time: []
      },
      host_search: {
        loading: false,
        host_ip: '',
        start_time: "",
        end_time: "",
      },
      // 网络通讯
      host_network: {
      },
      host_network_data: {
      },
      host_network_page: {
        page: 1,
        rows: 10
      },
      // 文件
      host_file: {
      },
      host_file_data: {
      },
      host_file_page: {
        page: 1,
        rows: 10
      },
      // 用户
      host_user: {
      },
      host_user_data: {
      },
      host_user_page: {
        page: 1,
        rows: 10
      },
    };
  },
  components: {
    VmEmergePicker
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
          pathInfo: 'investigate/host-network-investigation',
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
    search_data () {
      switch (this.activeButGroup) {
        case '1':
          this.host_network_page.page = 1
          this.get_data_network()
          break;
        case '2':
          this.host_file_page.page = 1
          this.get_data_file()
          break;
        case '3':
          this.host_user_page.page = 1
          this.get_data_user()
          break;
        default:
          break;
      }
    },
    // 网络通讯
    get_data_network () {
      this.host_search.loading = true
      this.$axios.get('/yiiapi/investigate/host-network-investigation', {
        params: {
          host_ip: this.host_search.host_ip,
          start_time: this.host_search.start_time,
          end_time: this.host_search.end_time,
          current_page: this.host_network_page.page,
          per_page_count: this.host_network_page.rows
        }
      })
        .then(response => {
          this.host_search.loading = false
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
          this.host_network = data
          this.host_network_data = data.data
          this.host_network_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 文件
    get_data_file () {
      this.host_search.loading = true
      this.$axios.get('/yiiapi/investigate/host-file-investigation', {
        params: {
          host_ip: this.host_search.host_ip,
          start_time: this.host_search.start_time,
          end_time: this.host_search.end_time,
          current_page: this.host_file_page.page,
          per_page_count: this.host_file_page.rows
        }
      })
        .then(response => {
          this.host_search.loading = false
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
          this.host_file = data
          this.host_file_data = data.data
          this.host_file_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 用户
    get_data_user () {
      this.host_search.loading = true
      this.$axios.get('/yiiapi/investigate/host-user-investigation', {
        params: {
          host_ip: this.host_search.host_ip,
          start_time: this.host_search.start_time,
          end_time: this.host_search.end_time,
          current_page: this.host_user_page.page,
          per_page_count: this.host_user_page.rows
        }
      })
        .then(response => {
          this.host_search.loading = false
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
          console.log(data);
          this.host_user = data
          this.host_user_data = data.data
          this.host_user_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 重置
    reset () {
      this.host_search.host_ip = ''
      this.host_search.start_time = ''
      this.host_search.end_time = ''
      $(document.querySelector('.el-button--text')).trigger('click');
    },
    // 下载
    download () {
      switch (this.activeButGroup) {
        case '1':
          if (!this.host_network.data || this.host_network.data.data.length == 0) {
            this.$message({
              type: 'warning',
              message: '请先搜索需要下载的数据！'
            });
            return false
          }
          // if (this.host_network.count > 1000) {
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
              var url1 = "/yiiapi/investigate/host-network-investigation-export?host_ip=" + this.host_search.host_ip + '&start_time=' + this.host_search.start_time + '&end_time=' + this.host_search.end_time + '&current_page=0&per_page_count=0';
              window.location.href = url1;
            })
            .catch(error => {
              console.log(error);
            })

          break;
        case '2':
          if (!this.host_file.data || this.host_file.data.data.length == 0) {
            this.$message({
              type: 'warning',
              message: '请先搜索需要下载的数据！'
            });
            return false
          }
          // if (this.host_file.count > 1000) {
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
              var url2 = "/yiiapi/investigate/host-file-investigation-export?host_ip=" + this.host_search.host_ip + '&start_time=' + this.host_search.start_time + '&end_time=' + this.host_search.end_time + '&current_page=0&per_page_count=0';
              window.location.href = url2;
            })
            .catch(error => {
              console.log(error);
            })

          break;
        case '3':
          if (!this.host_user.data || this.host_user.data.data.length == 0) {
            this.$message({
              type: 'warning',
              message: '请先搜索需要下载的数据！'
            });
            return false
          }
          // if (this.host_user.count > 1000) {
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
              var url3 = "/yiiapi/investigate/host-user-investigation-export?host_ip=" + this.host_search.host_ip + '&start_time=' + this.host_search.start_time + '&end_time=' + this.host_search.end_time + '&current_page=0&per_page_count=0';
              window.location.href = url3;
            })
            .catch(error => {
              console.log(error);
            })

          break;
        default:
          break;
      }

    },

    // 分页-网络
    handleSizeChange_network (val) {
      this.host_network_page.rows = val;
      this.host_network_page.page = 1
      this.get_data_network();
    },
    handleCurrentChange_network (val) {
      this.host_network_page.page = val
      this.get_data_network();
    },
    // 分页-文件
    handleSizeChange_file (val) {
      this.host_file_page.rows = val;
      this.host_file_page.page = 1
      this.get_data_file();
    },
    handleCurrentChange_file (val) {
      this.host_file_page.page = val
      this.get_data_file();
    },
    // 分页-用户
    handleSizeChange_user (val) {
      this.host_user_page.rows = val;
      this.host_user_page.page = 1
      this.get_data_user();
    },
    handleCurrentChange_user (val) {
      this.host_user_page.page = val
      this.get_data_user();
    },



    changeTime (data) {
      console.log(data);
      if (data) {
        this.host_search.start_time = parseInt(data[0].valueOf() / 1000);
        this.host_search.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        this.host_search.start_time = ''
        this.host_search.end_time = ''
      }
    },
  }
}
</script>

<style scoped lang="less">
#invest_host {
  /deep/ .el-button-group {
    padding: 0 0 24px 0;
    .el-button {
      border: 1px solid #0070ff;
      background: #fff;
      font-size: 14px;
      color: #0070ff;
      width: 112px;
      height: 34px;
      padding: 0;
      font-family: PingFang;
      &.active {
        color: #fff;
        background: #0070ff;
      }
      &:first-child {
        border-right-width: 0;
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
