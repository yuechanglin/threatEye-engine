<template>
  <div id="white_list"
       v-loading.fullscreen.lock="loading">
    <div class="btn_box">
      <el-button class="btn_i"
                 @click="open_add_box">添加白名单</el-button>
      <el-button class="btn_i"
                 @click="download">下载模板</el-button>
      <el-upload class="upload-demo"
                 style="display: inline-block;"
                 action="/yiiapi/whitelist/add-import"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 :show-file-list='false'
                 :before-upload="onBeforeUpload"
                 :on-change="onChange"
                 multiple
                 :auto-upload='true'
                 :on-success='onsuccess'
                 :on-error='onerror'
                 :on-exceed="handleExceed"
                 :file-list="fileList">
        <el-button class="btn_o"
                   type="primary">批量导入</el-button>
      </el-upload>

      <el-button class="btn_o"
                 @click="del_white">删除</el-button>
    </div>
    <div class="user_table">
      <el-table ref="multipleTable"
                class="reset_table"
                align="center"
                border
                :data="white_list.data"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column type="selection"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column label="序号"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            {{(white_data.page-1)*(white_data.rows) + scope.row.index_cn}}
          </template>
        </el-table-column>
        <el-table-column prop="indicator"
                         align="center"
                         label="指标"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="alert_type"
                         align="center"
                         label="类型"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="create_time"
                         align="center"
                         label='创建时间'
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination_box"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="white_list.pageNow"
                     :page-sizes="[10,20,50,100]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="white_list.count">
      </el-pagination>
    </div>
    <!-- 添加白名单 -->
    <el-dialog class="add_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="white_add.add">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_add_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加白名单</span>
      </div>
      <div class="content">
        <div class="content_item">
          <p>
            <span class="title">指标</span>
            <span class="red_necessary">*</span>
          </p>
          <el-input class="select_box"
                    placeholder="请输入指标"
                    v-model="white_add.indicator"
                    clearable>
          </el-input>
        </div>
        <div class="content_item">
          <p>
            <span class="title">类型</span>
            <span class="red_necessary">*</span>
          </p>
          <el-select class="select_box"
                     v-model="white_add.type"
                     placeholder="请选择类型">
            <el-option v-for="item in white_add.type_list"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </div>

      </div>
      <div class="btn_box">
        <el-button @click="closed_add_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="add_white">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "white_list",
  data () {
    return {
      loading: false,
      white_list: {},
      white_data: {
        page: 1,
        rows: 10,
      },
      white_add: {
        add: false,
        type_list: ["MD5", "IP", "URL", 'Indicator','AlertType'],
        indicator: '',
        type: 'MD5'
      },
      fileList: [],
      select_list: []
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.get_data();
    this.check_passwd();
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
    get_data () {
      this.loading = true;
      this.$axios.get('/yiiapi/whitelist/list', {
        params: {
          page: this.white_data.page,
          rows: this.white_data.rows
        }
      })
        .then(response => {
          this.loading = false;
          this.white_list = response.data.data
          this.white_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    open_add_box () {
      this.white_add.add = true;
      this.white_add.indicator = '';
      this.white_add.type = 'MD5';
    },
    // 添加
    add_white () {
      console.log(this.white_add);
      if (this.white_add.indicator == '') {
        this.$message(
          {
            message: '请输入指标',
            type: 'warning',
          }
        );
        return false
      }
      this.$axios.post('/yiiapi/whitelist/add', {
        indicator: this.white_add.indicator,
        alert_type: this.white_add.type
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
            this.get_data();
            this.$message(
              {
                message: '添加成功',
                type: 'success',
              }
            );
            this.white_add.add = false;
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    closed_add_box () {
      this.white_add.add = false;
    },
    // 分页
    handleSizeChange (val) {
      this.white_data.rows = val;
      this.white_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.white_data.page = val
      this.get_data();
    },
    // 下载模板
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
                var url2 = "/yiiapi/whitelist/download-ioc-template";
                window.location.href = url2;
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
    },
    // 批量上传
    handlePreview () { },
    handleRemove () { },
    beforeRemove () { },
    onBeforeUpload () { },
    onChange (params) {
      console.log(params);
      if (params.status == 'fail') {
        this.$message(
          {
            message: '上传失败！',
            type: 'error',
          }
        );
      }
    },

    onsuccess (params) {
      console.log(params);
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          if (params.status == 1) {
            this.$message(
              {
                message: params.msg,
                type: 'error',
              }
            );
          } else if (params.status == 0) {
            this.get_data();
            this.$message(
              {
                message: '上传成功！',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    onerror (params) {
      console.log(params);
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          if (params.status == 'fail') {
            this.$message(
              {
                message: '上传失败！',
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })


    },
    handleExceed () { },
    handleSelectionChange (val) {
      console.log(val);
      this.select_list = val
    },
    del_white () {
      console.log(this.select_list);
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请选择需要删除的白名单！',
            type: 'warning',
          }
        );
        return false
      }
      this.$confirm('此操作删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id_list = []
        this.select_list.forEach(element => {
          id_list.push(element.id)
        });
        this.$axios.delete('/yiiapi/whitelist/del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            console.log(response.data);
            if (response.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功！',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败！',
                  type: 'error',
                }
              );
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

  }
};
</script>

<style scoped lang="less">
#white_list {
  padding-right: 24px;
  .btn_box {
    .btn_i {
      width: 148px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
    .btn_o {
      width: 148px;
      height: 42px;
      background: #fff;
      border: 1px solid #0070ff;
      color: #0070ff;
    }
    margin-bottom: 24px;
  }
}
</style>
<style lang='less'>
@import '../../../../assets/css/less/reset_css/reset_table.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
#white_list {
  .add_box {
    .el-dialog {
      width: 440px;
      .content_item {
        margin-top: 24px;
        .select_box {
          width: 100%;
          height: 38px;
          margin-top: 6px;
          .el-input__inner {
            background: #f8f8f8;
            border: 0;
          }
        }
      }
      .btn_box {
        margin: 0;
        margin-top: 24px;
      }
    }
  }
}
</style>
