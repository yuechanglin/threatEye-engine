<template>
  <div id="invest_ioc"
       class="common_invest"
       v-loading.fullscreen.lock="ioc_data.loading">
    <div class="invest_box">
      <el-tabs v-model="activeName"
               class="reset_tab">
        <el-tab-pane label="IOC扫描器"
                     class="tabs-item"
                     name="first">
          <div class="invest_top">
            <div class="invest_upload">
              <uploader :options="options"
                        :autoStart='true'
                        :fileStatusText='fileStatusText'
                        @file-added="onFileAdded"
                        @upload-start="onFilestart"
                        @file-success="onFileSuccess"
                        @file-progress="onFileProgress"
                        @file-error="onFileError"
                        class="uploader_box">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                  <uploader-btn class="select_btn"
                                :directory="false"
                                :attrs="attrs"
                                :single='true'>
                    <p style="text-align: center;">
                      <img class="upload_img"
                           src="@/assets/images/setting/upload_s.png"
                           alt="">
                    </p>
                    <span>点击上传</span>
                  </uploader-btn>
                </uploader-drop>
                <p style="margin-top: 15px;font-size: 14px;">
                  <span>请选择 .txt
                    <span @click="download_template"
                          style="color: #0070ff;cursor: pointer;"
                          class="common_color">(下载模板)</span> 或者 .ioc的格式文件搜索
                  </span>
                </p>
                <uploader-list></uploader-list>
              </uploader>
            </div>
            <div>
              <el-button class="btn_down"
                         @click="download_list">下载</el-button>
              <el-button class="btn_del"
                         @click="del_list">删除</el-button>
            </div>

          </div>
          <!-- <div class="invest_top">
            <div class="invest_upload">
              <el-upload class="upload-demo"
                         :before-upload="onBeforeUpload"
                         :on-change="onChange"
                         :on-success='onsuccess'
                         :on-exceed="handleExceed"
                         :on-error='onerror'
                         accept=".txt,.ioc"
                         drag
                         action="/yiiapi/investigate/upload-file">
                <img class="upload_img"
                     src="@/assets/images/setting/upload_s.png"
                     alt="">
                <div class="el-upload__text">
                  <em>点击上传</em>
                </div>
                <div slot="tip"
                     class="el-upload__tip">
                  <span>请选择 .txt
                    <span @click="download_template"
                          class="common_color">(下载模板)</span> 或者 .ioc的格式文件搜索
                  </span>
                </div>
              </el-upload>
            </div>
            <div>
              <el-button class="btn_down"
                         @click="download_list">下载</el-button>
              <el-button class="btn_del"
                         @click="del_list">删除</el-button>
            </div>

          </div> -->
          <div class="invest_bom">
            <el-table ref="multipleTable"
                      class="reset_table"
                      align="center"
                      border
                      :data="ioc_list.data"
                      tooltip-effect="dark"
                      @selection-change="handleSelectionChange"
                      style="width: 100%">
              <el-table-column type="selection"
                               align="center"
                               :selectable="checkSelectable"
                               width="50">
              </el-table-column>
              <el-table-column label="序号"
                               align="center"
                               width="60">
                <template slot-scope="scope">
                  {{(ioc_data.page-1)*(ioc_data.rows) + scope.row.index_cn}}
                </template>
              </el-table-column>
              <el-table-column prop="upload_file_name"
                               align="center"
                               label="文件名"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="进度"
                               align="center"
                               width="100"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.create_percent+'%' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态"
                               align="center"
                               width="100"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.create_status ==1?"完成":'未完成' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="create_time"
                               align="center"
                               width="180"
                               label="创建时间"
                               show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination_box"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="ioc_list.pageNow"
                           :page-sizes="[10,20,50,100]"
                           :page-size="10"
                           layout="total, sizes, prev, pager, next"
                           :total="ioc_list.count">
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
  name: "invest_ioc",
  components: {
    VmEmergePicker
  },
  data () {
    return {
      activeName: 'first',
      select_list: [],
      ioc_list: {
        count: 0,
        pageNow: 1,
      },
      ioc_data: {
        page: 1,
        rows: 10,
        loading: false
      },
      // 修改上传插件
      options: {
        target: '/yiiapi/investigate/upload-file',
        chunkSize: '10048000',   //分块大小
        singleFile: true,
        testChunks: false,     //是否开启服务器分片校验
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
        },
      },
      attrs: {
        accept: '.txt,.ioc'//接受文件类型
      },
      fileStatusText: {
        success: '上传成功',
        error: '上传失败，请重新上传',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待'
      },
    };
  },
  mounted () {
    this.get_data()
    this.test()
    this.check_passwd();
  },
  methods: {
    // 测试600专用
    test () {
      this.$axios.get('/yiiapi/investigate/ioc-scanning-list', {
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
    // 获取列表
    get_data () {
      this.ioc_data.loading = true
      this.$axios.get('/yiiapi/investigate/ioc-scanning-list', {
        params: {
          page: this.ioc_data.page,
          rows: this.ioc_data.rows,
        }
      })
        .then(response => {
          this.ioc_data.loading = false
          let { status, data } = response.data;
          if (status == '602') {
            return false
          }
          console.log(data);
          this.ioc_list = data
          this.ioc_list.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
          console.log(status);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 上传
    onFileAdded (file) {
      console.log(file);
      if (file.name.indexOf('.txt') < 0 && file.name.indexOf('.ioc') < 0) {
        this.$message({
          message: '请上传.txt或者.ioc的格式文件',
          type: 'warning'
        });
        file.ignored = true
      }
    },
    onFileSuccess (rootFile, file, params_response, chunk) {
      console.log(rootFile);
      console.log(file);

      console.log(params_response);
      console.log(chunk);
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          if (JSON.parse(params_response).status == 1) {
            // rootFile.ignored = true
            file.cancel()
            this.$message(
              {
                message: JSON.parse(params_response).msg,
                type: 'error',
              }
            );
          } else if (JSON.parse(params_response).status == 0) {
            this.$message(
              {
                message: '上传成功！',
                type: 'success',
              }
            );
            setTimeout(() => {
              this.get_data();
            }, 100);
            // file.cancel()
          }
        })
        .catch(error => {
          console.log(error);
        })
      console.log(chunk);
    },
    onFileError (params, file) {
      console.log(params);
      console.log(file);
      file.ignored = true
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          this.$message(
            {
              message: '上传失败!',
              type: 'error',
            }
          );
        })
        .catch(error => {
          console.log(error);
        })
    },

    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    // 分页
    handleSizeChange (val) {
      this.ioc_data.rows = val;
      this.ioc_data.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.ioc_data.page = val
      this.get_data();
    },
    // 下载模板
    download_template () {
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
                var url1 = "/yiiapi/investigate/download-ioc-template";
                window.location.href = url1;
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
    },
    // 禁止选中的项目
    checkSelectable (row) {
      return row.create_status == "1"
    },
    // 下载列表
    download_list () {
      console.log(this.select_list);
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请先选中需下载的信息!',
            type: 'warning',
          }
        );
        return false
      }
      var id_list = []
      this.select_list.forEach(element => {
        id_list.push(element.id)
      });
      console.log(id_list);
      var id_list_str = JSON.stringify(id_list)
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          var url1 = "/yiiapi/investigate/ioc-scanning-download?id=" + id_list_str;
          window.location.href = url1;
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 删除列表
    del_list () {
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请先选中要删除的信息',
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
        console.log(id_list);
        this.$axios.delete('/yiiapi/investigate/ioc-scanning-del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.status == 0) {
              this.get_data();
              this.$message(
                {
                  message: '删除成功!',
                  type: 'success',
                }
              );
            } else {
              this.$message(
                {
                  message: '删除失败!',
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
    // 重置
    reset () {
      this.flow_search.direction = '0'
      this.flow_search.host_ip = ''
      //$(document.querySelector('.el-button--text')).trigger('click');
    },
  },
  beforeDestroy () {
    clearInterval(this.timer); //关闭
  },
}
</script>
<style scoped lang="less">
#invest_ioc {
  .invest_upload {
    overflow: auto;
    margin-bottom: 24px;
    .uploader_box {
      width: 100%;
      // background: #f8f8f8;
      .uploader-drop {
        border: none;
        width: 168px;
        height: 88px;
        background: #f8f8f8;
        padding: 0;
        text-align: center;
      }
      .select_btn {
        border: none;
        color: #0070ff;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
      }
      .uploader-list {
        position: absolute;
        left: 200px;
        top: 0;
        width: 77%;
      }
      /deep/ .uploader-file {
        border: none !important;
      }
      .uploader-btn:hover {
        background: #f8f8f8;
      }
      .upload_img {
        margin-top: 20px;
        width: 27px;
      }
    }
    /deep/ .upload-demo {
      // float: left;
      margin-bottom: 10px;
      .el-upload-list__item:focus {
        outline: 0;
      }
      .el-upload {
        float: left;
        .el-upload-dragger {
          width: 164px;
          height: 88px;
          background: #f8f8f8;
          border: 0;
          .upload_img {
            margin-top: 20px;
            width: 27px;
          }
        }
      }
      .el-upload__tip {
        float: left;
        width: 164px;
        height: 88px;
        margin: 0 10px;
        font-size: 14px;
        color: #999999;
        .common_color {
          color: #0070ff;
          cursor: pointer;
        }
      }
      .el-upload-list {
        float: left;
        .el-upload-list__item:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .btn_down {
    padding: 0;
    width: 148px;
    height: 42px;
    background: #0070ff;
    color: #fff;
  }
  .btn_del {
    padding: 0;
    width: 148px;
    height: 42px;
    background: #fff;
    border-color: #0070ff;
    color: #0070ff;
  }
}
</style>
<style lang="less">
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_invest.less';
@import '../../../assets/css/less/reset_css/reset_tab.less';
</style>


