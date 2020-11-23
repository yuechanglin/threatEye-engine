<template >
  <div id="syslog_set"
       v-loading.fullscreen.lock="syslog_data.loading">
    <div class="search_box">
      <el-button class="btn_i"
                 @click="open_add">添加SYSLOG配置</el-button>
    </div>
    <div class="syslog_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="syslog_list.data"
                tooltip-effect="dark"
                style="width: 100%">
        <el-table-column label="序号"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            {{(syslog_data.page-1)*(syslog_data.rows) + scope.row.index_cn}}
          </template>
        </el-table-column>
        <el-table-column prop="server_ip"
                         align="center"
                         label="SYSLOG服务器IP"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="server_port"
                         align="center"
                         label="端口"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="protocol"
                         align="center"
                         label='传输协议'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label='状态'
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status == '1'?'启用':'未启用'}}</span>
          </template>

        </el-table-column>
        <el-table-column label='操作'
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='edit_box(scope.row)'>编辑</el-button>
            <el-button type="primary"
                       class="btn_edit"
                       @click.stop='del_box(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="syslog_list.pageNow"
                     :page-sizes="[10,20,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="syslog_list.count">
      </el-pagination>
    </div>
    <!-- 添加p配置 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="syslog_pop.add.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加SYSLOG配置</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_top">
            <span style="margin-right:10px;">是否启用</span>
            <el-switch v-model="syslog_pop.add.switch">
            </el-switch>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">SYSLOG服务器IP</span>
              <span class="red_necessary">*</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入SYSLOG服务器IP"
                      v-model="syslog_pop.add.server_ip"
                      clearable>
            </el-input>
          </div>
        </div>
        <div class="content_space"></div>
        <div class="content_item">
          <div class="item_top">
            <span style="margin-right:10px;">状态</span>
            <el-radio v-model="syslog_pop.add.protocol"
                      label="udp"
                      class="r_radio_item">udp</el-radio>
            <el-radio v-model="syslog_pop.add.protocol"
                      label="tcp"
                      class="r_radio_item">tcp</el-radio>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">端口</span>
              <span class="red_necessary">*</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入端口"
                      v-model="syslog_pop.add.server_port"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="addsyslog">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑配置 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="syslog_pop.edit.show">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑SYSLOG配置</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_top">
            <span>是否启用</span>
            <el-switch v-model="syslog_pop.edit.switch">
            </el-switch>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">SYSLOG服务器IP</span>
              <span class="red_necessary">*</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入SYSLOG服务器IP"
                      v-model="syslog_pop.edit.ip"
                      clearable>
            </el-input>
          </div>
        </div>
        <div class="content_space"></div>
        <div class="content_item">
          <div class="item_top">
            <span>状态</span>
            <el-radio v-model="syslog_pop.edit.radio"
                      label="udp"
                      class="r_radio_item">udp</el-radio>
            <el-radio v-model="syslog_pop.edit.radio"
                      label="tcp"
                      class="r_radio_item">tcp</el-radio>
          </div>
          <div class="item_bottom">
            <p>
              <span class="title">端口</span>
              <span class="red_necessary">*</span>
            </p>
            <el-input class="select_box"
                      placeholder="请输入端口"
                      v-model="syslog_pop.edit.port"
                      clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="editsyslog">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  components: {
    vmEmergePicker,
  },
  name: "syslog_set",
  data () {
    return {
      syslog_data: {
        page: 1,
        rows: 10,
        loading: false
      },
      syslog_list: {},
      syslog_pop: {
        add: {
          show: false,
          switch: true,
          protocol: 'udp',
          server_ip: '',
          server_port: ''
        },
        edit: {
          show: false,
          switch: true,
          radio: '',
          status: '',
          ip: '',
          id: '',
          port: ''
        }
      }
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
    // 获取列表
    get_data () {
      this.syslog_data.loading = true;
      this.$axios.get('/yiiapi/syslog/list', {
        params: {
          page: this.syslog_data.page,
          rows: this.syslog_data.rows
        }
      })
        .then(response => {
          console.log(response);
          this.syslog_data.loading = false;
          this.syslog_list = response.data.data
          this.syslog_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })

    },
    // 删除syslog
    del_box (item) {
      console.log(item);
      this.$confirm('此操作删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/yiiapi/syslog/del-conf', {
          data: {
            id: item.id
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_data();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
          .catch(error => {
            console.log(error);
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    // 分页
    handleSizeChange (val) {
      this.syslog_data.rows = val;
      this.syslog_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.syslog_data.page = val
      this.get_data();
    },
    open_add () {
      this.syslog_pop.add.show = true
      this.syslog_pop.add.switch = true;
      this.syslog_pop.add.protocol = 'udp';
      this.syslog_pop.add.server_ip = '';
      this.syslog_pop.add.server_port = '';
    },
    // 添加
    addsyslog () {
      if (this.syslog_pop.add.switch) {
        this.syslog_pop.add.status = '1'
      } else {
        this.syslog_pop.add.status = '0'
      }
      this.$axios.post('/yiiapi/syslog/add-conf', {
        server_ip: this.syslog_pop.add.server_ip,
        server_port: this.syslog_pop.add.server_port,
        protocol: this.syslog_pop.add.protocol,
        status: this.syslog_pop.add.status,
      })
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          } else if (response.data.status == 0) {
            this.syslog_pop.add.show = false
            this.get_data();

          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 编辑
    edit_box (item) {
      this.syslog_pop.edit.show = true
      console.log(item);
      if (item.status == '1') {
        this.syslog_pop.edit.switch = true
      } else {
        this.syslog_pop.edit.switch = false
      }
      this.syslog_pop.edit.status = item.status
      this.syslog_pop.edit.radio = item.protocol
      this.syslog_pop.edit.ip = item.server_ip
      this.syslog_pop.edit.port = item.server_port
      this.syslog_pop.edit.id = item.id
    },
    editsyslog () {
      if (this.syslog_pop.edit.switch) {
        this.syslog_pop.edit.status = '1'
      } else {
        this.syslog_pop.edit.status = '0'
      }
      this.$axios.put('/yiiapi/syslog/edit-conf', {
        id: this.syslog_pop.edit.id,
        server_ip: this.syslog_pop.edit.ip,
        server_port: this.syslog_pop.edit.port,
        protocol: this.syslog_pop.edit.radio,
        status: this.syslog_pop.edit.status,
      })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.get_data();
            this.syslog_pop.edit.show = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    closed_add_box () {
      this.syslog_pop.add.show = false
    },
    closed_edit_box () {
      this.syslog_pop.edit.show = false
    }
  }
};
</script>

<style scoped lang="less">
#syslog_set {
  text-align: left;
  .search_box {
    margin-bottom: 24px;
    .btn_i {
      padding: 0;
      width: 177px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
  }
  .btn_edit {
    padding: 0;
    background: #5389e0;
    border-radius: 2px;
    width: 72px;
    height: 30px;
  }
  .syslog_table {
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
@import '../../../../assets/css/less/report_less/rewrite_radio.less';
#syslog_set {
  .add_box {
    .el-dialog {
      width: 840px;
      .content {
        display: flex;
        .content_space {
          width: 20px;
        }
        .content_item {
          flex: 1;
          .item_top {
            margin: 37px 0;
          }
        }
      }
      .btn_box {
        margin-top: 36px;
      }
    }
    .el-switch__core {
      width: 40px !important;
    }
  }
}
</style>
