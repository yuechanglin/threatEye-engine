<template>
  <div class="handle-work"
       v-cloak>
    <!--按钮组-->
    <el-row class="common_btn">
      <el-col :span="24"
              class="common_btn_list">
        <el-dropdown @command="change_state"
                     trigger="click"
                     placement='bottom-start'
                     size='148'>
          <el-button type="primary"
                     class="change_btn">
            <span>状态变更</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown"
                            class="dropdown_ul_box">
            <el-dropdown-item command="处置中"
                              class="select_item">处置中</el-dropdown-item>
            <el-dropdown-item command="已处置"
                              class="select_item">已处置</el-dropdown-item>
            <el-dropdown-item command="已忽略"
                              class="select_item">已忽略</el-dropdown-item>
            <el-dropdown-item command="误报"
                              class="select_item">误报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="change_task"
                     placement='bottom-start'
                     trigger="click">
          <el-button type="primary"
                     class="change_btn">
            <span>工单任务</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown"
                            class="dropdown_ul_box">
            <el-dropdown-item command="新建工单">新建工单</el-dropdown-item>
            <el-dropdown-item command="添加到工单">添加到工单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box"
               :modal-append-to-body="false"
               :visible.sync="state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_state"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">状态变更</span>
      </div>
      <div class="content">
        <p class="content_p"
           style="font-size:0">
          <span style="font-size:14px">是否将已勾选的</span>
          <span style="font-size:14px">{{multipleSelection.length}}</span>
          <span style="font-size:14px">项状态变更为“</span>
          <span style="font-size:14px">{{process_state}}</span>
          <span style="font-size:14px">”?</span>
        </p>
      </div>
      <div class="btn_box">
        <el-button @click="cancel_state"
                   class="cancel_btn">取消</el-button>
        <el-button @click="ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 工单任务 -->
    <el-dialog class="task_new_box"
               :modal-append-to-body="false"
               :visible.sync="task.new">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_task_new"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑工单</span>
      </div>
      <div class="step_box">
        <div class="step_box1">
          <span class="step1_span"
                :class="task.new_contet?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt="">
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!task.new_contet?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content"
           v-if="task.new_contet">
        <div class="task_content_box">
          <div class="content_top">
            <div class="content_top_left">
              <li class="left_item">
                <div class="title">
                  <span>工单名称</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-input class="task_new_input"
                          placeholder="请输入工单名称"
                          v-model="task_params.name"
                          clearable>
                </el-input>
              </li>
              <li class="left_item">
                <div class="title">
                  <span>经办人</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="task_params.operator"
                           clearable
                           placeholder="请选择经办人">
                  <el-option v-for="item in task_new.operator_list"
                             @click.native="select_changced(item)"
                             :key="item.id"
                             :label="item.username"
                             :value="item.username">
                  </el-option>
                </el-select>
              </li>
            </div>
            <div class="content_top_right">
              <li class="right_item">
                <div class="title">
                  <span>优先级</span>
                  <span class="improtant_ico">*</span>
                </div>
                <el-select class="task_new_input"
                           v-model="task_params.level"
                           clearable
                           placeholder="请选择优先级">
                  <el-option v-for="item in task_new.level_list"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li class="right_item">
                <el-checkbox-group v-model="task_params.notice">
                  <el-checkbox label="email"
                               value="email">邮件通知</el-checkbox>
                  <el-checkbox label="message"
                               value="message">短信通知</el-checkbox>
                  <el-checkbox label="news"
                               value="news">消息中心通知</el-checkbox>
                </el-checkbox-group>
              </li>
            </div>
          </div>
          <div class="content_remarks">
            <p class="title">备注</p>
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="task_params.textarea">
            </el-input>
          </div>
          <div class="content_table">
            <el-table :data="table_operator.tableData"
                      align="center"
                      border
                      style="width: 100%">
              <el-table-column prop="username"
                               align="center"
                               label="经办人"></el-table-column>
              <el-table-column prop="department"
                               align="center"
                               label="部门"></el-table-column>
              <el-table-column prop="email_addr"
                               align="center"
                               label="邮箱"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="next_task_new"
                     class="next_btn">下一步</el-button>
        </div>
      </div>

      <!-- 处置内容 -->
      <div class="task_handle_content"
           v-if="!task.new_contet">
        <div class="task_content_box">
          <div class='table_box'>
            <ul class="table_box_title">
              <li class="active">{{handle.table_title[0]}}</li>
            </ul>
            <div>
              <div v-show="handle.cagetory == 0">
                <el-table :data="table.tableData"
                          align="center"
                          border
                          tooltip-effect="dark"
                          @selection-change="handle_sel_table_mul">
                  <el-table-column align='left'
                                   align="center"
                                   type="selection"
                                   width="50"></el-table-column>
                  <el-table-column prop="asset_ip"
                                   align="center"
                                   label="资产"></el-table-column>
                  <el-table-column label="资产组"
                                   align="center"
                                   min-width="120"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <div>
                        <span v-for="(it,$idx) in scope.row.label"
                              :key="$idx"
                              class="a_label">{{it}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="category_group"
                                   align="center"
                                   label="关联威胁"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column width="100">
                    <template slot-scope="scope">{{ scope.row.degree | degree }}</template>
                  </el-table-column>
                  <el-table-column label="失陷确定性"
                                   align="center">
                    <template slot-scope="scope">
                      <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                        {{ scope.row.fall_certainty | certainty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态"
                                   align="center"
                                   width="80">
                    <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="handle.cagetory == 1">
                <el-table :data="table.tableData"
                          align="center"
                          border
                          class="common-table"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handle_sel_table_mul">
                  <el-table-column type="selection"
                                   align="center"
                                   width="50"></el-table-column>
                  <el-table-column prop="category"
                                   align="center"
                                   label="告警类型"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="indicator"
                                   align="center"
                                   label="威胁指标"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="application"
                                   align="center"
                                   label="应用"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column label="威胁等级"
                                   align="center"
                                   width="100">
                    <template slot-scope="scope">
                      <span :class="{'high':scope.row.degree =='高','mid':scope.row.degree =='中','low':scope.row.degree =='低'}">
                        {{ scope.row.degree | degree_sino }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="失陷确定性"
                                   align="center"
                                   width="120">
                    <template slot-scope="scope">
                      <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                        {{ scope.row.fall_certainty | certainty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态"
                                   align="center"
                                   width="80">
                    <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
                  </el-table-column>
                </el-table>
              </div>
              <el-pagination class="pagination_box"
                             @size-change="sc_table_pages"
                             @current-change="hcc_table_pages"
                             :page-sizes="[10,20,50,100]"
                             :page-size="table.eachPage"
                             :current-page="table.pageNow"
                             :total="table.count"
                             layout="total, sizes, prev, pager, next">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button @click="closed_task_new"
                     class="cancel_btn">取消</el-button>
          <el-button @click="prev_task_handle"
                     class="prev_btn">上一步</el-button>
          <el-button @click="prev_task_handle_assign"
                     class="prev_btn">分配</el-button>
          <el-button @click="prev_task_handle_save"
                     class="prev_btn">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 添加到工单 -->
    <el-dialog class="pop_state_add"
               :modal-append-to-body="false"
               :visible.sync="add_state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="add_closed_state"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加到工单</span>
      </div>
      <div class="content">
        <el-row class="common-table-pattern">
          <el-col :span="24">
            <el-table class="common-table"
                      align="center"
                      border
                      highlight-current-row
                      v-loading="table_add_works.loading"
                      :data="table_add_works.tableData"
                      @current-change="handle_sel_table_add_works">
              <el-table-column label="单选"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="name"
                               align="center"
                               label="工单名称"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="creator"
                               align="center"
                               label="创建人"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="优先级"
                               align="center"
                               width="120">
                <template slot-scope="scope">
                  {{ scope.row.priority | priority }}
                </template>
              </el-table-column>
              <el-table-column prop="new_perator"
                               align="center"
                               label="经办人"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="状态"
                               width="80"
                               align="center"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.status | work_status }}</template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24"
                  class="e-pagination">
            <el-pagination class="handle-pagination"
                           @size-change="sc_table_add_works"
                           @current-change="hcc_table_add_works"
                           :page-sizes="[10,20,50,100]"
                           :page-size="table_add_works.eachPage"
                           :total="table_add_works.count"
                           :current-page="table_add_works.pageNow"
                           layout="total, sizes, prev, pager, next">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <div class="btn_box">
        <el-button @click="add_closed_state"
                   class="cancel_btn">取消</el-button>
        <el-button @click="add_ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'handle-work',
  props: {
    multipleSelection: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      //弹窗部分
      state_change: false,
      process_state: "",
      //工单任务
      task: {
        new: false,
        new_contet: true
      },
      task_params: {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: []
      },
      task_new: {
        level_list: [
          {
            value: "highest",
            label: "最高"
          },
          {
            value: "high",
            label: "高"
          },
          {
            value: "medium",
            label: "中"
          },
          {
            value: "low",
            label: "低"
          }
        ],
        operator_list: [],
      },
      //经办人数组
      table_operator: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10
      },
      handle: {
        table_title: ["告警"],
        active: 0,
        cagetory: 1
      },
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: []
      },
      //添加到工单
      add_state_change: false,
      table_add_works: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        loading: true
      },
      add_params: {
        name: "",
        level: "",
        operator: [],
        notice: ['email'],
        remarks: "",
        multiple: []
      }
    }
  },
  created () {
    /*console.log('********')
    console.log(this.multipleSelection);*/
  },
  methods: {
    /***************以下是弹窗部分************/
    // 状态变更选择
    change_state (command) {
      this.process_state = command;
      this.open_state();
    },

    //工单任务选择
    change_task (command) {
      if (command == "新建工单") {
        this.open_task_new();
      } else if (command == "添加到工单") {
        this.open_add_new();
      }
    },

    /***************状态变更*****************/

    //打开状态变更弹窗
    open_state () {

      let multiple = this.multipleSelection;

      if (multiple.length == 0) {
        this.$message({ message: '请选择需要变更的告警！', type: 'warning' });
        return false;
      } else {
        this.state_change = true;
      }
    },

    //关闭状态变更弹窗
    closed_state () {
      this.state_change = false;
      this.$emit('clearSel');
    },

    //状态变更取消按钮点击
    cancel_state () {
      this.closed_state();
    },

    //状态变更确定按钮点击
    ok_state () {
      let selected = this.multipleSelection;
      //资产ID处理
      let id_group = selected.map(x => { return x.id; });
      //状态设置
      let process = this.process_state;
      let change_status = 1;

      if (process == '处置中') {
        change_status = 2;
      } else if (process == '已处置') {
        change_status = 3;
      } else if (process == '已忽略') {
        change_status = 4;
      } else if (process == '误报') {
        change_status = 5;
      }
      this.$axios.put('/yiiapi/alert/do-alarm', {
        id: id_group,
        status: change_status
      })
        .then(resp => {
          let { status, data } = resp.data;
          if (status == 0) {
            this.$message.success('状态变更成功！');
            this.closed_state();
            this.$emit('updateData');
          } else {
            this.$message.error('状态变更失败！');
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    /***************工单任务*****************/

    //打开编辑工单
    open_task_new () {

      let multiple = this.multipleSelection;

      let multiple_attr = multiple.map(x => { return x.status });

      if (multiple.length == 0) {
        this.$message({ message: '请选择需要编辑的告警！', type: 'warning' });
        return false;
      } else {
        if (multiple_attr.includes('3')
          || multiple_attr.includes('4')
          || multiple_attr.includes('5')) {
          this.$message({ message: '告警状态为已处置、已忽略、误报的不能新建。', type: 'warning' });
        } else {
          this.table.tableData = multiple;
          this.table.count = multiple.length;
          let pageNow = this.table.pageNow;
          let eachPage = this.table.eachPage;
          let handle_data = this.table.tableData.slice((pageNow - 1) * eachPage, pageNow * eachPage);
          this.table.tableData = handle_data;

          //获取用户列表(经办人使用)
          this.$axios.get('/yiiapi/site/user-list')
            .then(resp => {
              let { status, data } = resp.data;
              if (status == 0) {
                this.task_new.operator_list = data;
              } else {
                this.task_new.operator_list = [];
              }
              this.task.new = true;
              this.task.new_contet = true;
            })
            .catch(err => {
              console.log('用户列表错误');
              console.log(err);
            })

        }
      }
    },

    //关闭编辑工单
    closed_task_new () {
      this.task.new = false;
      this.task.new_contet = false;
      this.task_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: []
      };
      this.table_operator.tableData = [];

      this.$emit('clearSel');
    },

    //下一步时候验证工单名称，优先级、经办人等参数
    next_task_new () {
      var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
      if (this.task_params.name == '') {
        this.$message.error('工单名称不能为空');
        return false
      }
      if (pattern.test(this.task_params.name)) {
        console.log(true);
        this.$message.error('工单名称不能包含特殊字符');
        return false
      }
      if (this.task_params.level == '') {
        this.$message.error('优先级未选择');
      } else if (this.task_params.operator == '') {
        this.$message.error('经办人未选择');
      } else {
        this.task.new_contet = false;
        this.handle.active = 0;
      }
    },

    //上一步
    prev_task_handle () {
      this.task.new_contet = true;
    },

    //经办人change处理
    select_changced (item) {

      let level_list = this.table_operator.tableData;
      let selected_id_attr = level_list.map(x => { return x.id });

      if (selected_id_attr.includes(item.id)) {
        this.$message.error('已存在');
      } else {
        this.table_operator.tableData.unshift(item);
      }
      let selected_name_attr = this.table_operator.tableData.map(x => { return x.username });
      this.task_params.new_operator = selected_name_attr;
    },

    //tabs下table每页显示多少条
    sc_table_pages (val) {
      this.table.eachPage = val;
      this.table.pageNow = 1;
      let handle_data = this.table.tableData.slice(0, val);
      this.table.tableData = handle_data;
    },

    //tabs下table页数点击
    hcc_table_pages (val) {
      this.table.pageNow = val;
      let eachPage = this.table.eachPage;
      let handle_data = this.table.tableData.slice((val - 1) * eachPage, val * eachPage);
      this.table.tableData = handle_data;
    },

    //tab下table多选
    handle_sel_table_mul (val) {
      this.table.multipleSelection = val;
      let selected = val.map(x => { return x.alert_id });
      this.task_params.multiple = selected;
    },

    //编辑工单分配
    prev_task_handle_assign () {
      if (this.task_params.multiple.length == 0) {
        this.$message({ message: '请选择至少一条告警列表！', type: 'warning' });
      } else {
        this.$axios.put('/yiiapi/alert/distribution-workorder',
          {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            te_alert: this.task_params.multiple,
            remind: this.task_params.notice
          })
          .then((resp) => {
            let { status, msg, data } = resp.data;
            if (status == 0) {
              this.$message.success('分配成功');
              //关闭弹窗
              this.closed_task_new();
              this.$emit('updateData');
            } else if (status == 1) {
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //编辑工单保存
    prev_task_handle_save () {
      if (this.task_params.multiple.length == 0) {
        this.$message({ message: '请选择至少一条告警列表！', type: 'warning' });
      } else {
        this.$axios.post('/yiiapi/alert/add-workorder',
          {
            name: this.task_params.name,
            priority: this.task_params.level,
            perator: this.task_params.new_operator,
            remarks: this.task_params.textarea,
            te_alert: this.task_params.multiple,
            remind: this.task_params.notice
          })
          .then((resp) => {
            let { status, msg, data } = resp.data;
            if (status == 0) {
              this.$message.success('保存成功');
              //关闭弹窗
              this.closed_task_new();
              this.$emit('updateData');
            } else if (status == 1) {
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new () {
      this.add_open_state();
    },

    //新加到工单打开状态
    add_open_state () {

      let multiple = this.multipleSelection;
      let multiple_attr = multiple.map(x => { return x.status });

      //未选择状态
      if (multiple.length == 0) {
        this.$message({ message: '请选择需要添加到工单的告警！', type: 'warning' });
        return false;
      } else {
        //3、4、5状态不能加入
        if (multiple_attr.includes('3')
          || multiple_attr.includes('4')
          || multiple_attr.includes('5')) {
          this.$message({ message: '告警状态为已处置、已忽略、误报的不能添加到工单。', type: 'warning' });
        } else {
          this.add_state_change = true;
          this.get_table_works_list();
        }
      }
    },

    //新加到工单取消状态
    add_closed_state () {
      this.add_state_change = false;
      this.$emit('clearSel');
    },

    //获取列表
    get_table_works_list () {
      this.table_add_works.loading = true;
      this.$axios.get('/yiiapi/alert/workorder-list', {
        params: {
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage
        }
      }).then((resp) => {
        this.table_add_works.loading = false;
        let { status, data } = resp.data;
        let datas = data;
        if (status == 0) {
          let { data, count, maxPage, pageNow } = datas;
          data.map(function (v, k) {
            v.new_perator = (JSON.parse(v.perator)).join(',');
            v.checked = false;
          });
          this.table_add_works.tableData = data;
          this.table_add_works.count = count;
          this.table_add_works.maxPage = maxPage;
          this.table_add_works.pageNow = Number(pageNow);
        }
      })
    },

    //新加工单列表勾选某一条记录
    handle_sel_table_add_works (row) {
      // el-radio单选框,不需要这一步
      if (row != undefined) {
        this.table_add_works.tableData.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id != row.id) {
            item.checked = false
          }
        });
        this.add_params.id = row.id;
        this.add_params.name = row.name;
        this.add_params.level = row.priority;
        this.add_params.perator = JSON.parse(row.perator);
        this.add_params.remarks = row.remarks;
        this.add_params.remind = JSON.parse(row.remind);
      }
    },

    //新加到工单确定
    add_ok_state () {

      let selected_attr = this.multipleSelection
        .map(x => { return x.alert_id * 1 });
      this.add_params.multiple = selected_attr;
      this.$axios.post('/yiiapi/alert/add-workorder',
        {
          id: this.add_params.id,
          type: "alert",
          name: this.add_params.name,
          priority: this.add_params.level,
          perator: this.add_params.perator,
          remind: this.add_params.remind,
          remarks: this.add_params.remarks,
          te_alert: this.add_params.multiple
        })
        .then((resp) => {
          let { status, msg, data } = resp.data;

          if (status == 0) {
            this.$message.success('添加到工单成功');
            //状态清空
            this.add_params = {
              name: "",
              level: "",
              operator: "",
              new_operator: [],
              notice: ['email'],
              textarea: "",
              multiple: []
            };
            this.add_closed_state();
            this.$emit('updateData');

          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //每页显示多少条
    sc_table_add_works (val) {
      this.table_add_works.eachPage = val;
      this.table_add_works.pageNow = 1;
      this.get_table_works_list();
    },

    //新加工单列表分页页面切换
    hcc_table_add_works (val) {
      this.table_add_works.pageNow = val;
      this.get_table_works_list();
    }
  }
};
</script>
<style scoped lang="less">
.handle-work {
  margin: 19px 0;
  display: inline-block;
  /* 弹窗 */
  /* 状态变更 */
  /deep/ .pop_state_box {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        height: 260px;
        padding: 30px;

        .closed_img {
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
          width: 46px;
          height: 46px;
        }

        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .content {
          height: 128px;
          padding-top: 48px;
          .content_p {
            text-align: center;
          }
        }

        .btn_box {
          height: 42px;
          text-align: center;
          margin-bottom: 24px;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }
      }
    }
  }

  // 编辑工单
  /deep/ .task_new_box {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        padding: 30px;

        .closed_img {
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
          width: 46px;
          height: 46px;
        }

        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .step_box {
          height: 36px;
          margin: 20px 0 24px 0;
          .step_box1 {
            background-image: url('../../assets/images/emerge/step1.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 120px;
            height: 36px;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;

            .step1_span {
              font-size: 14px;
            }

            .selected_img {
              position: absolute;
              left: 0;
              top: 0;
            }
          }

          .step_box2 {
            width: 120px;
            height: 36px;
            background-image: url('../../assets/images/emerge/step2.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: left;
            position: relative;
            line-height: 36px;
            text-align: center;
            margin-left: -10px;

            .step2_span {
              font-size: 14px;
            }
          }

          .step_now {
            color: #0070ff;
          }

          .step_past {
            color: #999999;
          }
        }

        .task_new_content {
          /*height: 480px;*/

          .task_content_box {
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

            .content_top {
              overflow: hidden;
              .content_top_left {
                float: left;
                width: 45%;

                .left_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }

              .content_top_right {
                float: right;
                width: 45%;

                .right_item {
                  margin-bottom: 16px;
                  display: flex;

                  .title {
                    width: 100px;
                    line-height: 38px;

                    .improtant_ico {
                      color: #ff3a36;
                    }
                  }

                  .task_new_input {
                    flex: 1;

                    .el-input__inner {
                      height: 38px;
                    }
                  }
                }
              }
            }

            .content_remarks {
              .title {
                font-size: 12px;
                color: #999999;
              }

              /deep/ .el-textarea {
                height: 92px;
                textarea {
                  resize: none;
                  height: 92px;
                  font-size: 14px;
                  color: #333;
                  font-family: PingFang;
                }
              }
              .el-textarea__inner:hover {
                border: none;
              }

              .el-textarea__inner {
                border: none;
                background: #f8f8f8;
              }
            }

            .content_table {
              margin-top: 16px;

              /deep/ .el-table td {
                padding: 0;
                height: 32px;
              }
              /deep/ .el-table th {
                padding: 0;
                height: 36px;
                background: #f8f8f8;
                .cell {
                }
              }

              /deep/ .el-pagination {
                margin-top: 20px;
                text-align: center;
              }
            }
          }

          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
            .next_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
          }
        }

        .task_handle_content {
          .handle_content_top {
            height: 42px;
            text-align: left;
            .change_btn,
            .ref {
              background-color: #0070ff;
              border-color: #0070ff;
              width: 136px;
              height: 42px;
              color: #fff;
            }

            .cel {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              margin-left: 0;
            }
          }

          .table_box {
            margin-top: 24px;

            .table_box_title {
              height: 38px;
              li {
                height: 38px;
                width: 92px;
                float: left;
                font-size: 14px;
                line-height: 38px;
                color: #bbbbbb;
                text-align: center;
                border-top: 2px solid #fff;
              }

              li.active {
                cursor: pointer;
                background: #eef6ff;
                color: #0070ff;
                border-top: 2px solid #0070ff;
              }
            }
            /deep/ .el-table {
              font-size: 12px;
              thead.has-gutter {
                th {
                  color: #333333;
                  background: #f8f8f8;
                  .cell {
                  }
                }
              }
              .cell {
                color: #333333;
              }
            }

            /deep/ .el-pagination {
              margin-top: 20px;
              text-align: center;
            }
          }

          .btn_box {
            margin-top: 36px;
            margin-bottom: 24px;
            height: 42px;
            text-align: center;

            .cancel_btn {
              border: 1px solid #0070ff;
              background: #fff;
              color: #0070ff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }

            .prev_btn {
              background-color: #0070ff;
              color: #fff;
              width: 136px;
              height: 42px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  //添加到工单
  /deep/ .pop_state_add {
    .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        max-height: 640px;
        padding: 30px;

        .closed_img {
          position: absolute;
          top: -18px;
          right: -18px;
          cursor: pointer;
          width: 46px;
          height: 46px;
        }

        .title {
          height: 24px;
          line-height: 24px;
          text-align: left;

          .title_name {
            font-size: 20px;
            color: #333333;
            line-height: 24px;
          }

          .mask {
            width: 24px;
            height: 0px;
            border-top: 0px;
            border-right: 2px solid transparent;
            border-bottom: 5px solid #0070ff;
            border-left: 2px solid transparent;
            transform: rotate3d(0, 0, 1, 90deg);
            display: inline-block;
            margin-right: -5px;
            margin-bottom: 4px;
            margin-left: -10px;
          }
        }

        .content {
          padding-top: 48px;
        }

        .btn_box {
          height: 42px;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 36px;

          .ok_btn {
            width: 136px;
            height: 42px;
            background: #0070ff;
            color: #fff;
          }

          .cancel_btn {
            width: 136px;
            height: 42px;
            border-color: #0070ff;
            background: #fff;
            color: #0070ff;
          }
        }
      }
    }
  }
}
</style>
