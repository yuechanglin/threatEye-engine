<template>
  <div id="invest_dns"
       class="common_invest"
       v-loading.fullscreen.lock="dns_search.loading">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="DNS追查"
                     class="tabs-item"
                     name="first">
          <div class="invest_top">
            <el-input placeholder="主机IP"
                      class="search_box"
                      v-model="dns_search.host_ip"
                      clearable>
            </el-input>
            <el-input placeholder="DNS服务器IP"
                      class="search_box"
                      v-model="dns_search.dns_ip"
                      clearable>
            </el-input>
            <el-input placeholder="域名"
                      class="search_box"
                      v-model="dns_search.domain"
                      clearable>
            </el-input>
            <el-input placeholder="TTL"
                      class="search_box"
                      v-model="dns_search.ttl"
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
                      :data="dns_list.data"
                      tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column label="序号"
                               align="center"
                               width="60">
                <template slot-scope="scope">
                  {{(dns_search.page-1)*(dns_search.rows) + scope.row.index_cn}}
                </template>
              </el-table-column>
              <el-table-column prop="timestamp"
                               align="center"
                               label="时间"
                               width="320"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="dns_ip"
                               align="center"
                               label="DNS服务器IP"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="host_ip"
                               align="center"
                               label="主机地址"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="type"
                               align="center"
                               label="类型"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="rrname"
                               align="center"
                               label="域名"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="rdata"
                               align="center"
                               label="解析地址"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="ttl"
                               align="center"
                               label="TTL"
                               show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="dns_list.pageNow"
                           :page-sizes="[10,20,50,100]"
                           :page-size="10"
                           layout="total, sizes, prev, pager, next"
                           :total="dns_list.count">
            </el-pagination>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "invest_dns",
  components: {
    vmEmergePicker,
  },
  data () {
    return {
      activeName: 'first',
      time_list: {
        time: []
      },
      dns_search: {
        loading: false,
        host_ip: '',
        dns_ip: '',
        domain: '',
        resolve_ip: '',
        ttl: '',
        resolve_result: '',
        start_time: '',
        end_time: '',
        page: 1,
        rows: 10
      },
      dns_list: {
        count: 0,
        pageNow: 1,
      }
    };
  },
  computed: {

  },
  mounted () {
    this.check_passwd();
    this.test()
  },
  methods: {
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'investigate/dns-investigation',
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
      this.dns_list.pageNow = 1
      this.dns_search.page = 1
      this.get_data();
    },
    get_data () {
      this.dns_search.loading = true
      this.$axios.get('/yiiapi/investigate/dns-investigation', {
        params: {
          host_ip: this.dns_search.host_ip,
          dns_ip: this.dns_search.dns_ip,
          domain: this.dns_search.domain,
          resolve_ip: this.dns_search.resolve_ip,
          ttl: this.dns_search.ttl,
          resolve_result: this.dns_search.resolve_result,
          start_time: this.dns_search.start_time,
          end_time: this.dns_search.end_time,
          current_page: this.dns_search.page,
          per_page_count: this.dns_search.rows
        }
      })
        .then(response => {
          this.dns_search.loading = false
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
          this.dns_list = data
          this.dns_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 重置
    reset () {
      this.dns_search.host_ip = ''
      this.dns_search.dns_ip = ''
      this.dns_search.domain = ''
      this.dns_search.ttl = ''
      this.dns_search.start_time = ''
      this.dns_search.end_time = ''
      $(document.querySelector('.el-button--text')).trigger('click');
    },
    // 下载
    download () {
      console.log(this.dns_list);
      if (!this.dns_list.data) {
        this.$message({
          type: 'warning',
          message: '请先搜索需要下载的数据！'
        });
        return false
      }
      // if (this.dns_list.count > 1000) {
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
          var url2 = "/yiiapi/investigate/dns-investigation-export?host_ip=" + this.dns_search.host_ip + "&dns_ip=" + this.dns_search.dns_ip + '&domain=' + this.dns_search.domain + '&resolve_ip=' + this.dns_search.resolve_ip + '&ttl=' + this.dns_search.ttl + '&resolve_result=' + this.dns_search.resolve_result + '&start_time=' + this.dns_search.start_time + '&end_time=' + this.dns_search.end_time + '&current_page=0&per_page_count=0';
          window.location.href = url2;
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 分页
    handleSizeChange (val) {
      this.dns_search.rows = val;
      this.dns_search.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      console.log(val);
      this.dns_search.page = val
      this.get_data();
    },
    changeTime (data) {
      console.log(data);
      if (data) {
        this.dns_search.start_time = parseInt(data[0].valueOf() / 1000);
        this.dns_search.end_time = parseInt(data[1].valueOf() / 1000)
      } else {
        this.dns_search.start_time = ''
        this.dns_search.end_time = ''
      }
    },
  }
}
</script>
<style  lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>
