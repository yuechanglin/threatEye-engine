<template>
  <div id="audit_log"
       v-loading.fullscreen.lock="loading">
    <div class="search_box">
      <el-input class="search_key"
                placeholder="搜索关键词"
                v-model="audit_data.key"
                clearable>
        <i slot="prefix"
           class="el-input__icon el-icon-search"></i>
      </el-input>
      <vm-emerge-picker @changeTime='changeTime'
                        :option='time_list'></vm-emerge-picker>
      <el-button class="btn_i"
                 @click="get_data"> 搜索</el-button>
      <span class="reset"
            @click="reset">重置</span>
      <el-button class="btn_right"
                 @click="download">下载</el-button>
    </div>
    <p class="line"></p>
    <div class="audit_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="audit_log.data"
                tooltip-effect="dark"
                style="width: 100%">
        <el-table-column label="序号"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            {{(audit_data.page-1)*(audit_data.rows) + scope.row.index_cn}}
          </template>
        </el-table-column>
        <el-table-column prop="created_at"
                         align="center"
                         label="时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="username"
                         align="center"
                         label="用户标识"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="info"
                         align="center"
                         label='描述'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userip"
                         align="center"
                         label='主机地址'
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="audit_log.pageNow"
                     :page-sizes="[10,20,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="audit_log.count">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    vmEmergePicker,
  },
  name: "audit_log",
  data () {
    return {
      loading: false,
      time_list: {
        time: []
      },
      audit_log: {},
      audit_data: {
        start_time: "",
        end_time: "",
        key: "",
        page: 1,
        rows: 10
      },
      // changeTimes:[]
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data()
    this.check_passwd()
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/check-passwd-reset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
          if (status == '600') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
          }
        })
    },
    get_data () {
      this.loading = true;
      this.$axios.get('/yiiapi/userlog/page', {
        params: {
          username: this.audit_data.key,
          start_time: this.audit_data.start_time,
          end_time: this.audit_data.end_time,
          page: this.audit_data.page,
          rows: this.audit_data.rows
        }
      })
        .then(response => {
          this.loading = false;
          console.log(response);
          this.audit_log = response.data.data;
          this.audit_log.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })

    },
    add_box () {
    },
    edit_box () {
    },
    changeTime (data) {
      console.log(data);
      if (data) {
        this.audit_data.start_time = data[0].valueOf() / 1000;
        this.audit_data.end_time = data[1].valueOf() / 1000;
      } else {
        this.audit_data.start_time = ''
        this.audit_data.end_time = ''
      }
    },
    // 分页
    handleSizeChange (val) {
      this.audit_data.rows = val;
      this.audit_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.audit_data.page = val
      this.get_data();
    },
    reset () {
      this.audit_data.key = ''
      this.audit_data.start_time = ""
      this.audit_data.end_time = ""
      this.time_list = {
        time: []
      }
    },
    download () {
      this.$axios.get('/yiiapi/site/check-passwd-reset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          } else {
            this.$axios.get('/yiiapi/site/check-auth-exist', {
              params: {
                pathInfo: 'yararule/download',
              }
            })
              .then(response => {
                var url2 = "/yiiapi/userlog/export?username=" + this.audit_data.key + "&start_time=" + this.audit_data.start_time + '&end_time=' + this.audit_data.end_time;
                window.location.href = url2;
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
    }
  }
};
</script>

<style scoped lang="less">
#audit_log {
  .search_box {
    .search_key {
      width: 240px;
      height: 38px;
    }
    .btn_i {
      margin-left: 24px;
      padding: 0;
      width: 102px;
      height: 38px;
      background: #0070ff;
      color: #fff;
    }
    .btn_right {
      padding: 0;
      width: 148px;
      height: 38px;
      background: #0070ff;
      color: #fff;
      float: right;
      margin-right: 24px;
    }

    .reset {
      cursor: pointer;
      margin-left: 24px;
      font-size: 16px;
      color: #0070ff;
    }
  }
  .line {
    margin: 16px 0 24px 0;
    width: 100%;
    height: 1px;
    background-color: #ececec;
  }
  .audit_table {
    padding-right: 24px;
  }
  .pagination_box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#audit_log {
}
</style>
