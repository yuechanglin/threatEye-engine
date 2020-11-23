<template>
  <div class="message-container"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="message-content">
      <el-row class="message-top">
        <el-col :span="24">
          <div>
            <el-button class="e-btn e-btn-read"
                       @click="batch_marking">标为已读</el-button>
            <el-button class="e-btn e-btn-remove"
                       @click="del">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="message-bottom common-table-pattern">
        <el-col :span="24">
          <el-table class="common-table"
                    align="center"
                    border
                    ref="multipleTable"
                    :data="news_data.data.data"
                    @row-click='detail'
                    @selection-change="handleSelectionChange">
            <el-table-column label=" "
                             align="center"
                             prop="type"
                             width="20">
              <template slot-scope="scope">
                <div class="new_dot"
                     v-show="scope.row.status=='1'"></div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             type="selection"
                             width="50"></el-table-column>
            <el-table-column label="时间"
                             align="center"
                             width="200"
                             show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.created_at | time }}</template>
            </el-table-column>
            <el-table-column width="240"
                             align="center"
                             label="消息来源"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.type=='1'">密码</span>
                <span v-if="scope.row.type=='2'">许可证</span>
                <span v-if="scope.row.type=='3'">工单</span>
              </template>
            </el-table-column>
            <el-table-column prop="content"
                             align="center"
                             label="描述"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="news_data.data.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         :total="news_data.data.count"
                         layout="total, sizes, prev, pager, next"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'message-container',
  data () {
    return {
      title_name: "通知消息",
      multipleSelection: [],
      news_data: {
        page: 1,
        rows: 10,
        data: []
      },
    }
  },
  components: { backTitle },
  created () {
    this.get_news();
    this.check_passwd();
  },
  mounted () {
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
        })
    },
    random (lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    // 获取新消息
    get_news () {
      // /news/list
      this.$axios.get('/yiiapi/news/list', {
        params: {
          page: this.news_data.page,
          rows: this.news_data.rows,
          status: ''
        }
      })
        .then((resp) => {
          let { status, data } = resp.data;
          let datas = data;
          this.news_data.data = datas
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 标记已读 
    update (id, type) {
      this.$axios.get('/yiiapi/news/update', {
        params: {
          id: id
        }
      })
        .then((resp) => {
          let { status, data, msg } = resp.data;
          let datas = data;
          switch (status) {
            case 1:
              this.$message({ message: msg, type: 'error' });
              break;
            case 0:
              this.get_news()
              switch (type) {
                case '1':
                  eventBus.$emit('reset')
                  break;
                case '2':
                  this.$router.push({ path: '/system/licence' });
                  break;
                case '3':
                  this.$router.push({ path: '/handle/works' });
                  break;
                default:
                  break;
              }
              break;
            default:
              this.$message({ message: msg, type: 'error' });
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 批量标记
    batch_marking () {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请选择需要标记的消息', type: 'warning' });
        return false
      }
      var id_list = []
      this.multipleSelection.forEach(element => {
        id_list.push(element.id * 1)
      });
      this.$axios.put('/yiiapi/news/change-status', {
        id: id_list,
      })
        .then((resp) => {
          let { status, data, msg } = resp.data;
          let datas = data;
          console.log(status);
          console.log(msg);
          this.$refs.multipleTable.clearSelection();
          switch (status) {
            case 1:
              this.$message({ message: msg, type: 'error' });
              break;
            case 0:
              this.get_news()
              this.$message({ message: '标记成功', type: 'success' });
              break;
            default:
              this.$message({ message: msg, type: 'error' });
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    del () {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请选择需要删除的消息', type: 'warning' });
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.multipleSelection.forEach(element => {
          id_list.push(element.id * 1)
        });
        this.$axios.delete('/yiiapi/news/del', {
          data: {
            id: id_list,
          }
        })
          .then((resp) => {
            let { status, data, msg } = resp.data;
            let datas = data;
            console.log(status);
            console.log(msg);
            this.$refs.multipleTable.clearSelection();
            switch (status) {
              case 1:
                this.$message({ message: msg, type: 'error' });
                break;
              case 0:
                this.get_news()
                this.$message({ message: '删除成功', type: 'success' });
                break;
              default:
                this.$message({ message: msg, type: 'error' });
                break;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //  查看详情
    detail (row, column) {
      console.log(row);
      switch (row.type) {
        // 密码
        case '1':
          this.update(row.id, '1')
          break;
        // 许可证
        case '2':
          this.update(row.id, '2')
          break;
        // 工单
        case '3':
          this.update(row.id, '3')
          break;
        default:
          break;
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 分页
    handleSizeChange (val) {
      this.news_data.rows = val;
      this.news_data.page = 1
      this.get_news();
    },
    handleCurrentChange (val) {
      this.news_data.page = val
      this.get_news();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/css/less/common-table-pattern.less';
.message-container {
  .message-content {
    padding: 0 56px;
    background: #fff;
    text-align: left;
    .message-top {
      height: 90px;
      line-height: 90px;
      /deep/ .e-btn {
        width: 148px;
        height: 42px;
        font-family: PingFangMedium;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #0070ff;
        &.e-btn-read {
          background: #0070ff;
          color: #fff;
        }
        &.e-btn-remove {
          background: #fff;
          color: #0070ff;
        }
      }
    }
    .message-bottom {
      min-height: 658px;
    }
  }
}
</style>
