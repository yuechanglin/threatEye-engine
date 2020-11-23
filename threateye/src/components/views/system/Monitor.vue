<template>
  <div id="system_control_monitor"
       class="container">
    <div class="content_box">
      <div class="monitor_title">
        <el-button type="primary"
                   class="btn_i"
                   @click="add_box">新增</el-button>
        <el-button type="primary"
                   class="btn_i"
                   @click="del_monitor">删除</el-button>
        <el-button type="primary"
                   class="btn_o"
                   @click="import_box">导入</el-button>
        <el-button type="primary"
                   class="btn_o"
                   @click="download">导出</el-button>
      </div>
      <div class="monitor_table">
        <el-table ref="multipleTable"
                  class="reset_table"
                  align="center"
                  border
                  :data="monitor_data.data"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @row-click="alert_detail">
          <el-table-column type="selection"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column label="序号"
                           align="center"
                           width="50"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{(monitor_page.page-1)*(monitor_page.rows) + scope.row.index_cn}}
            </template>
          </el-table-column>
          <el-table-column prop="name"
                           align="center"
                           label="IP段名称"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="IP地址段"
                           align="center"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <li v-for="item in scope.row.ip_segment"
                  class="btn_tag_box">
                <p>{{item}}</p>
              </li>
            </template>
          </el-table-column>
          <el-table-column prop="network_type"
                           align="center"
                           label="网段类型"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="标签"
                           align="center"
                           width="400">
            <template slot-scope="scope">
              <span class="btn_tag_box"
                    v-for="item in scope.row.label">
                <el-button type="primary"
                           class="btn_tag">
                  {{item}}
                </el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="person"
                           align="center"
                           label="责任人"
                           width="100"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="更新时间"
                           align="center"
                           width="180"
                           show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.updated_at*1000 |formatDate }}</template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         class="btn_edit"
                         @click.stop='edit_box(scope.row)'>编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination_box"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="monitor_data.pageNow"
                       :page-sizes="[10,20,50,100]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next"
                       :total="monitor_data.count">
        </el-pagination>
      </div>
      <!-- 新增 -->
      <el-dialog class="add_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="monitor_state.add">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_add_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">新增IP段</span>
        </div>
        <div class="content">
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">IP段名称</span>
                <span class="title_color">*</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入IP段名称"
                        v-model="monitor_add.name"
                        clearable>
              </el-input>
            </div>
            <div class="content_item">
              <p>
                <span class="title">网段类型</span>
                <span class="title_color">*</span>
              </p>
              <el-select class="select_box"
                         v-model="monitor_add.type"
                         placeholder="请选择网段类型">
                <el-option v-for="item in monitor_add.type_list"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="content_item">
              <p>
                <span class="title">标签</span>
              </p>
              <div class="item_addrs"
                   v-for="(item,index) in monitor_add.tag_list">
                <el-autocomplete class="inline-input select_box"
                                 :value="item.name"
                                 @input="e => item.name = validSe(e)"
                                 :maxlength='maxlength_num'
                                 show-word-limit
                                 :fetch-suggestions="querySearch"
                                 placement='bottom'
                                 placeholder="请输入标签"
                                 @select="handleSelect"></el-autocomplete>
                <img src="@/assets/images/common/add.png"
                     alt=""
                     class="img_box"
                     v-if="item.icon"
                     @click="add_tag">
                <img src="@/assets/images/common/del.png"
                     alt=""
                     class="img_box"
                     @click="del_tag(item,index)"
                     v-if="!item.icon">
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">注: 标签属性有7个预留字段“**业务” “总部” “**分支” “**部门” “终端” “服务器” “网络设备”。</span>
              </p>
            </div>
          </div>
          <div class="content_item_space">
          </div>
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">IP地址段</span>
                <span class="title_color">*</span>
              </p>
              <div class="item_addrs"
                   v-for="(item,index) in monitor_add.ip_segment_list">
                <el-input class="select_box"
                          placeholder="请输入IP网段（CIDR格式 )或者IP地址"
                          v-model="item.name"
                          clearable>
                </el-input>
                <img src="@/assets/images/common/add.png"
                     alt=""
                     class="img_box"
                     v-if="item.icon"
                     @click="add_ip">
                <img src="@/assets/images/common/del.png"
                     alt=""
                     class="img_box"
                     @click="del_ip(item,index)"
                     v-if="!item.icon">
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">地理位置</span>
              </p>
              <div class="select_box">
                <el-cascader placeholder="请选择地理位置"
                             ref="cascader_add"
                             v-if="cascader_add_if"
                             v-model="monitor_add.selected_cascader_add"
                             @change="change_cascader_add"
                             :options="area_array"
                             filterable
                             clearable></el-cascader>
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">责任人</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入责任人"
                        v-model="monitor_add.person"
                        clearable>
              </el-input>
            </div>

          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_add_box"
                     class="cancel_btn">取消</el-button>
          <el-button class="ok_btn"
                     @click="add_data">确定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑 -->
      <el-dialog class="add_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="monitor_state.edit">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_edit_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">编辑IP段</span>
        </div>
        <div class="content">
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">IP段名称</span>
                <span class="title_color">*</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入IP段名称"
                        v-model="monitor_edit.name"
                        clearable>
              </el-input>
            </div>

            <div class="content_item">
              <p>
                <span class="title">网段类型</span>
                <span class="title_color">*</span>
              </p>
              <el-select class="select_box"
                         v-model="monitor_edit.network_type"
                         placeholder="请选择网段类型">
                <el-option v-for="item in monitor_edit.type_list"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="content_item">
              <p>
                <span class="title">标签</span>
              </p>
              <div class="item_addrs"
                   v-for="(item,index) in monitor_edit.label_list">
                <!-- <el-input class="select_box"
                          placeholder="请输入标签"
                          v-model="item.name"
                          clearable>
                </el-input> -->
                <el-autocomplete class="inline-input select_box"
                                 :fetch-suggestions="querySearch"
                                 placement='bottom'
                                 :value="item.name"
                                 @input="e => item.name = validSe(e)"
                                 :maxlength='maxlength_num'
                                 show-word-limit
                                 placeholder="请输入标签"
                                 @select="handleSelect"></el-autocomplete>
                <img src="@/assets/images/common/add.png"
                     alt=""
                     class="img_box"
                     v-if="item.icon"
                     @click="add_tag_edit">
                <img src="@/assets/images/common/del.png"
                     alt=""
                     class="img_box"
                     @click="del_tag_edit(item,index)"
                     v-if="!item.icon">
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">注: 标签属性有7个预留字段“**业务” “总部” “**分支” “**部门” “终端” “服务器” “网络设备”。</span>
              </p>
            </div>
          </div>
          <div class="content_item_space">
          </div>
          <div class="content_item_box">
            <div class="content_item">
              <p>
                <span class="title">IP地址段</span>
                <span class="title_color">*</span>
              </p>
              <div class="item_addrs"
                   v-for="(item,index) in monitor_edit.ip_segment_list">
                <el-input class="select_box"
                          placeholder="请输入IP网段（CIDR格式 )或者IP地址"
                          v-model="item.name"
                          clearable>
                </el-input>
                <img src="@/assets/images/common/add.png"
                     alt=""
                     class="img_box"
                     v-if="item.icon"
                     @click="add_ip_edit">
                <img src="@/assets/images/common/del.png"
                     alt=""
                     class="img_box"
                     @click="del_ip_edit(item,index)"
                     v-if="!item.icon">
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">地理位置</span>
              </p>
              <div class="select_box">
                <el-cascader placeholder="请选择地理位置"
                             v-model="monitor_edit.selected_cascader_edit"
                             v-if="cascader_edit_if"
                             :options="area_array"
                             filterable
                             clearable></el-cascader>
              </div>
            </div>
            <div class="content_item">
              <p>
                <span class="title">责任人</span>
              </p>
              <el-input class="select_box"
                        placeholder="请输入责任人"
                        v-model="monitor_edit.person"
                        clearable>
              </el-input>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_edit_box"
                     class="cancel_btn">取消</el-button>
          <el-button class="ok_btn"
                     @click="edit_data">确定</el-button>
        </div>
      </el-dialog>
      <!-- 批量导入 -->
      <el-dialog class="import_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="monitor_state.import">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_import_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">批量导入</span>
        </div>
        <div class="content">
          <el-upload class="upload-demo"
                     ref="uploadExcel"
                     :auto-upload="false"
                     :before-upload="beforeUploadFile"
                     :on-change="fileChange"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                     :limit="1"
                     :on-exceed="onExceed"
                     :file-list="fileList"
                     accept=".xls"
                     drag
                     action="/yiiapi/ipsegment/upload-excel"
                     :multiple='false'>
            <img class="upload_img"
                 src="@/assets/images/setting/upload_s.png"
                 alt="">
            <!-- <img class="upload_img" src="@/assets/images/setting/upload_e.png" alt=""> -->
            <div class="el-upload__text">
              <em>点击上传</em>
            </div>
          </el-upload>
          <div class="tip_box">
            <span>温馨提示：请选择 .xls 的文件，且文件大小不得超过10M。没有模板？</span>
            <span class="download"
                  @click="download_template">点击这里下载</span>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_import_box"
                     class="cancel_btn">取消</el-button>
          <el-button class="ok_btn"
                     @click="uploadFile">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment'
import { pca, pcaa } from "area-data";
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "system_control_monitor",
  data () {
    return {
      maxlength_num: 25,
      area_array: [],
      monitor_data: {},
      cascader_add_if: false,
      cascader_edit_if: false,
      monitor_page: {
        page: 1,
        rows: 10,
      },
      monitor_state: {
        add: false,
        edit: false,
        import: false,
        import_loading: false
      },
      monitor_add: {
        name: "",
        ip_segment: [],
        ip_segment_list: [{ name: '', icon: true }],
        type: "static",
        type_list: ["static", 'dhcp', 'public'],
        person: "",
        tag: [],
        selected_cascader_add: [],
        tag_list: [{ name: '', icon: true }],
        test: {
          headquarters: false,
          server: false
        }
      },
      monitor_edit: {
        id: '',
        name: '',
        network_type: '',
        person: '',
        label_list: [],
        tag: [],
        type_list: ["static", 'dhcp', 'public'],
        ip_segment: [],
        ip_segment_list: [],
        selected_cascader_edit: [],
        test: {
          headquarters: false,
          server: false
        }
      },
      select_list: [],
      fileList: []
    };
  },
  mounted () {
    this.get_data()
    this.check_passwd()

    this.GetLabels();

    var options = []
    // 遍历省级
    Object.keys(pca[86]).forEach(function (key) {
      var obj = {}
      obj.id = key
      obj.value = pca[86][key]
      obj.label = pca[86][key]
      obj.children = []
      options.push(obj)
    });
    // 添加市级
    options.forEach(element => {
      Object.keys(pca).forEach(function (key) {
        if (element.id == key) {
          Object.keys(pca[key]).forEach(function (item) {
            var obj = {}
            obj.value = pca[key][item]
            obj.label = pca[key][item]
            element.children.push(obj)
          })
        }
      });
    });
    this.area_array = options
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
    init () {
      var options = []
      // 遍历省级
      Object.keys(pca[86]).forEach(function (key) {
        var obj = {}
        obj.id = key
        obj.value = pca[86][key]
        obj.label = pca[86][key]
        obj.children = []
        options.push(obj)
      });
      // 添加市级
      options.forEach(element => {
        Object.keys(pca).forEach(function (key) {
          if (element.id == key) {
            Object.keys(pca[key]).forEach(function (item) {
              var obj = {}
              obj.value = pca[key][item]
              obj.label = pca[key][item]
              element.children.push(obj)
            })
          }
        });
      });
      return options
    },
    isRepeat (arr) {
      var hash = {};
      for (var i in arr) {
        if (hash[arr[i]]) //hash 哈希
          return true;
        hash[arr[i]] = true;
      }
      return false;
    },
    // 获取列表
    get_data () {
      this.$axios.get('/yiiapi/ipsegment/list', {
        params: {
          page: this.monitor_page.page,
          rows: this.monitor_page.rows,
        }
      })
        .then(response => {
         // console.log(response);
          this.monitor_data = response.data.data;
          this.monitor_data.data.forEach((item, index) => {
            item.index_cn = index + 1
          });
        })
        .catch(error => {
          console.log(error);
        })
    },
    change_cascader_add (value) {
      console.log(value);
    },
    // 添加IP
    add_box () {
      this.monitor_state.add = true;
      this.monitor_add.name = '';
      this.monitor_add.type = 'static';
      this.monitor_add.person = '';
      this.monitor_add.tag = [];
      this.monitor_add.ip_segment = [];
      this.monitor_add.selected_cascader_add = [];
      this.monitor_add.tag_list = [{ name: '', icon: true }]
      this.monitor_add.ip_segment_list = [{ name: '', icon: true }]
      this.cascader_add_if = true;
    },
    add_data () {
      this.monitor_add.tag = [];
      var isRepeat_ip_segment = []
      this.monitor_add.ip_segment = [];
      this.monitor_add.ip_segment = [];
      var isRepeat_tag = []
      var tag_test = []
      var tag_test_str = ''
      this.monitor_add.ip_segment_list.forEach(item => {
        if (item.name != '') {
          isRepeat_ip_segment.push(item.name)
        }
      });
      if (isRepeat_ip_segment.length == 0) {
        this.$message(
          {
            message: 'IP地址段不能为空！',
            type: 'warning',
          }
        );
        return false
      }
      if (this.isRepeat(isRepeat_ip_segment)) {
        this.$message(
          {
            message: 'IP地址或地址段有重复项,请重新输入！',
            type: 'warning',
          }
        );
        return false
      }
      // 标签处理
      this.monitor_add.tag_list.forEach(item => {
        if (item.name != '') {
          tag_test.push(item.name)
        }
      });
      if (this.isRepeat(tag_test)) {
        this.$message(
          {
            message: '标签有重复项,请重新输入。',
            type: 'warning',
          }
        );
        return false
      }
      tag_test_str = JSON.stringify(tag_test)
      if (tag_test_str.indexOf("总部") != -1 && (tag_test_str.indexOf("分支") != -1)) {
        this.$message(
          {
            message: '“总部”和“分支”标签只能设置其中的一种，请重新设置！',
            type: 'warning',
          }
        );
        return false
      }

      if (tag_test_str.indexOf("终端") != -1 && (tag_test_str.indexOf("服务器") != -1 || tag_test_str.indexOf("网络设备") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'warning',
          }
        );
        return false
      }
      if (tag_test_str.indexOf("服务器") != -1 && (tag_test_str.indexOf("终端") != -1 || tag_test_str.indexOf("网络设备") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'warning',
          }
        );
        return false
      }
      if (tag_test_str.indexOf("网络设备") != -1 && (tag_test_str.indexOf("服务器") != -1 || tag_test_str.indexOf("终端") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'warning',
          }
        );
        return false
      }
      //console.log(isRepeat_tag);
      //console.log(isRepeat_ip_segment);
      this.monitor_add.tag_list.forEach(item => {
        if (item.name != '') {
          this.monitor_add.tag.push(item.name)
        }
      });
      this.monitor_add.ip_segment_list.forEach(item => {
        if (item.name != '') {
          this.monitor_add.ip_segment.push(item.name)
        }
      });

      this.$axios.post('/yiiapi/ipsegment/set-ip-segment', {
        name: this.monitor_add.name,
        ip_segment: this.monitor_add.ip_segment,
        network_type: this.monitor_add.type,
        person: this.monitor_add.person,
        label: this.monitor_add.tag,
        location: this.monitor_add.selected_cascader_add,
      })
        .then(response => {
          //console.log(response);
          if (response.data.status == 0) {
            this.monitor_state.add = false;
            this.get_data();
            this.$message(
              {
                message: '添加成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    //  添加标签
    add_tag () {
      this.monitor_add.tag_list.forEach(item => {
        item.icon = false;
      });
      this.monitor_add.tag_list.push({ name: '', icon: true })
    },
    del_tag (item, index) {
      this.monitor_add.tag_list.splice(index, 1);
    },
    //  添加ip地址段
    add_ip () {
      this.monitor_add.ip_segment_list.forEach(item => {
        item.icon = false;
      });
      this.monitor_add.ip_segment_list.push({ name: '', icon: true })
    },
    del_ip (item, index) {
      this.monitor_add.ip_segment_list.splice(index, 1);
    },
    // 编辑标签
    add_tag_edit () {
      this.monitor_edit.label_list.forEach(item => {
        item.icon = false;
      });
      this.monitor_edit.label_list.push({ name: '', icon: true })
    },
    del_tag_edit (item, index) {
      this.monitor_edit.label_list.splice(index, 1);
    },
    // 编辑ip
    add_ip_edit () {
      this.monitor_edit.ip_segment_list.forEach(item => {
        item.icon = false;
      });
      this.monitor_edit.ip_segment_list.push({ name: '', icon: true })
    },
    del_ip_edit (item, index) {
      this.monitor_edit.ip_segment_list.splice(index, 1);
    },
    alert_detail () { },
    edit_box (row) {
      this.monitor_state.edit = true;
      this.cascader_edit_if = true;
      var item_str = JSON.stringify(row);
      var obj_edit = JSON.parse(item_str);
      this.monitor_edit.id = obj_edit.id
      this.monitor_edit.name = obj_edit.name
      this.monitor_edit.network_type = obj_edit.network_type
      this.monitor_edit.person = obj_edit.person
      this.monitor_edit.label_list = [];
      this.monitor_edit.tag = [];
      this.monitor_edit.ip_segment = [];
      this.monitor_edit.ip_segment_list = [];
      this.monitor_edit.selected_cascader_edit = obj_edit.location
      if (obj_edit.label.length == 0) {
        this.monitor_edit.label_list.push({
          name: '',
          icon: true
        })
      } else {
        obj_edit.label.forEach(item => {
          this.monitor_edit.label_list.push({
            name: item,
            icon: false
          })
        });
        this.monitor_edit.label_list[this.monitor_edit.label_list.length - 1].icon = true
      }
      if (obj_edit.ip_segment.length == 0) {
        this.monitor_edit.ip_segment_list.push({
          name: '',
          icon: true
        })
      } else {
        obj_edit.ip_segment.forEach(item => {
          this.monitor_edit.ip_segment_list.push({
            name: item,
            icon: false
          })
        });
        this.monitor_edit.ip_segment_list[this.monitor_edit.ip_segment_list.length - 1].icon = true
      }
    },
    edit_data () {
      console.log(this.monitor_edit.ip_segment_list);
      console.log(this.monitor_edit.label_list);

      var isRepeat_ip_segment_edit = []
      var isRepeat_tag_edit = []
      this.monitor_edit.ip_segment = []
      this.monitor_edit.tag = []
      var tag_test = []
      var tag_test_str = ''

      this.monitor_edit.ip_segment_list.forEach(item => {
        if (item.name != '') {
          isRepeat_ip_segment_edit.push(item.name)
        }
      });
      this.monitor_edit.label_list.forEach(item => {
        if (item.name != '') {
          tag_test.push(item.name)
        }
      });
      tag_test_str = JSON.stringify(tag_test)
      console.log(tag_test_str.indexOf("终端") != -1);
      if (tag_test_str.indexOf("总部") != -1 && (tag_test_str.indexOf("分支") != -1)) {
        this.$message(
          {
            message: '“总部”和“分支”标签只能设置其中的一种，请重新设置！',
            type: 'warning',
          }
        );
        return false
      }
      if (tag_test_str.indexOf("终端") != -1 && (tag_test_str.indexOf("服务器") != -1 || tag_test_str.indexOf("网络设备") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'error',
          }
        );
        return false
      }
      if (tag_test_str.indexOf("服务器") != -1 && (tag_test_str.indexOf("终端") != -1 || tag_test_str.indexOf("网络设备") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'error',
          }
        );
        return false
      }
      if (tag_test_str.indexOf("网络设备") != -1 && (tag_test_str.indexOf("服务器") != -1 || tag_test_str.indexOf("终端") != -1)) {
        this.$message(
          {
            message: '“终端”、“服务器”、“网络设备”三类标签只能设置其中的一种，请重新设置！',
            type: 'error',
          }
        );
        return false
      }
      this.monitor_edit.label_list.forEach(item => {
        if (item.name != '') {
          isRepeat_tag_edit.push(item.name)
        }
      });
      if (this.isRepeat(isRepeat_ip_segment_edit)) {
        this.$message(
          {
            message: 'IP地址或地址段有重复项,请重新输入。',
            type: 'error',
          }
        );
        return false
      }
      if (this.isRepeat(isRepeat_tag_edit)) {
        this.$message(
          {
            message: '标签有重复项,请重新输入。',
            type: 'error',
          }
        );
        return false
      }
      this.monitor_edit.ip_segment_list.forEach(item => {
        if (item.name != '') {
          this.monitor_edit.ip_segment.push(item.name)
        }
      });
      this.monitor_edit.label_list.forEach(item => {
        if (item.name != '') {
          this.monitor_edit.tag.push(item.name)
        }
      });
      this.$axios.put('/yiiapi/ipsegment/edit-ip-segment', {
        id: this.monitor_edit.id,
        name: this.monitor_edit.name,
        ip_segment: this.monitor_edit.ip_segment,
        network_type: this.monitor_edit.network_type,
        person: this.monitor_edit.person,
        label: this.monitor_edit.tag,
        location: this.monitor_edit.selected_cascader_edit,
      })
        .then(response => {
          //console.log(response);
          if (response.data.status == 0) {
            this.monitor_state.edit = false;
            this.get_data();
            this.$message(
              {
                message: '修改成功',
                type: 'success',
              }
            );
          } else {
            this.$message(
              {
                message: response.data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 分页
    handleSizeChange (val) {
      this.monitor_page.rows = val;
      this.monitor_page.page = 1
      this.get_data();
    },
    handleCurrentChange (val) {
      this.monitor_page.page = val
      this.get_data();
    },
    GetLabels () {
      this.$axios
        .get("/yiiapi/site/get-labels", {
          params: {
            label_name: '',
          },
        })
        .then((resp) => {
          this.restaurants = []
          resp.data.data.map(item => {
            this.restaurants.push({
              value: item.label_name,
              id: item.id
            })
          })

        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 全选择
    handleSelectionChange (val) {
      this.select_list = val
    },
    handleSelect () { },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString != '' ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 删除
    del_monitor () {
      if (this.select_list.length == 0) {
        this.$message(
          {
            message: '请选择需要删除的IP/IP段！',
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
        this.$axios.delete('/yiiapi/ipsegment/del', {
          data: {
            id: id_list
          }
        })
          .then(response => {
            //console.log(response);
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
    import_box () {
      this.monitor_state.import = true;
      this.$refs.uploadExcel.clearFiles();
    },
    closed_add_box () {
      this.monitor_state.add = false;
      this.cascader_add_if = false;

    },
    closed_edit_box () {
      this.monitor_state.edit = false;
      this.cascader_edit_if = false;
    },
    closed_import_box () {
      this.monitor_state.import = false;
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
            this.monitor_state.import = false;
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
                var url1 = '/yiiapi/ipsegment/template-download';
                window.location.href = url1;
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
    },
    // 导入

    onExceed (files, fileList) {
      this.$message.warning('请选择单文件上传!');
      console.log(files)
      // console.log(file.raw)
      console.log(fileList)
    },
    // 文件状态改变时的钩子
    fileChange (file, fileList) {

    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile (file) {
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024 < 10
      if (!size) {
        this.$message.warning('上传文件大小不能超过 10MB!');
      }
      return size

    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      console.log(res);
      if (res.status == 1) {
        this.$message(
          {
            message: res.msg,
            type: 'error',
          }
        );
      } else if (res.status == 0) {
        this.get_data();
        this.monitor_state.import = false;
        this.$message(
          {
            message: '上传成功！',
            type: 'success',
          }
        );
      }
      this.$refs.uploadExcel.clearFiles();
    },
    // 文件上传失败时的钩子
    handleError (err, file, fileList) {
      this.$message(
        {
          message: err,
          type: 'error',
        }
      );
      this.$refs.uploadExcel.clearFiles();
    },
    uploadFile () {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          this.$refs.uploadExcel.submit()
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 导出
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
                var url2 = '/yiiapi/ipsegment/export';
                window.location.href = url2;
              })
              .catch(error => {
                console.log(error);
              })
          }
        })
    }
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
};
</script>
<style lang='less'>
@import '../../../assets/css/less/reset_css/reset_table.less';
@import '../../../assets/css/less/reset_css/reset_pop.less';
#system_control_monitor {
  .add_box {
    .el-dialog {
      width: 900px;
      .el-dialog__body {
        width: 900px;
        .content {
          padding: 24px 10px;
          display: flex;
          height: 400px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
            border-radius: 6px;
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 6px;
            background: #a8a8a8;
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 6px;
            background: #f4f4f4;
          }
          .content_item_box {
            flex: 1;
            .content_item {
              margin-bottom: 24px;
              .item_addrs {
                margin-bottom: 12px;
                display: flex;
              }
              .img_box {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                margin-top: 14px;
                cursor: pointer;
              }
              .title {
                font-size: 12px;
                color: #999999;
              }
              .title_color {
                color: #ff5f5c;
              }
              .select_box {
                width: 100%;
                height: 38px;
                margin-top: 6px;
                .el-input__inner {
                  background: #f8f8f8;
                  border: 0;
                }
              }
              .el-cascader {
                width: 100%;
              }
            }
          }
          .content_item_space {
            width: 20px;
          }
        }
      }
    }
  }
  .import_box {
    .el-dialog {
      width: 440px;
      .el-upload-dragger {
        border: 0;
        height: 140px;
        .upload_img {
          margin-top: 20px;
          width: 88px;
        }
      }
      .tip_box {
        font-size: 14px;
        color: #999999;
        margin: 24px 0;
        .download {
          color: #0070ff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style scoped lang='less'>
@import '../../../assets/css/less/system/setting/common_box.less';
#system_control_monitor {
  .content_box {
    .monitor_title {
      margin-bottom: 24px;
      .btn_i {
        background: #0070ff;
        color: #fff;
        width: 148px;
        height: 42px;
      }
      .btn_o {
        background: #fff;
        border-color: #0070ff;
        color: #0070ff;
        width: 148px;
        height: 42px;
      }
    }
    .monitor_table {
      padding-right: 24px;
      .pagination_box {
        margin-top: 24px;
        text-align: center;
      }
      .btn_tag_box {
        margin: 2px;
        .btn_tag {
          background: #5389e0;
          border-radius: 2px;
          min-height: 20px;
          font-size: 10px;
          color: #ffffff;
          padding: 2px 5px;
        }
      }
      .btn_edit {
        padding: 0;
        background: #5389e0;
        border-radius: 2px;
        width: 72px;
        height: 30px;
      }
    }
  }
}
</style>
