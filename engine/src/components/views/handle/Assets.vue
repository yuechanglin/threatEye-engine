<template>
  <div class="handle-assets"
       v-loading.fullscreen.lock="handle.save"
       v-cloak>
    <vm-handle-tabs :data_top="data_top"
                    v-if="data_top_show"></vm-handle-tabs>
    <!--全部资产-->
    <div class="assets_all">
      <el-row class="assets_all_list">
        <h3 class="title">全部资产</h3>
        <div class="all_list">
          <el-tag v-for="(tag,$index) in assets_all.tags"
                  :key="$index"
                  closable
                  size="small"
                  type=""
                  effect="plain"
                  @close="deleteAllAssets(tag)">
            {{tag.name}}
          </el-tag>
        </div>
        <div class="tog">
          <el-button class="assets-toggle"
                     @click="toggle_top_show = !toggle_top_show">
            <span class="name">收起更多</span>
            <i class="icons"
               :class="{'top_down':!toggle_top_show}"></i>
          </el-button>
        </div>
      </el-row>
      <el-row class="assets_all_detail"
              v-show="toggle_top_show">
        <ul class="all_detail">
          <li class="all_detail_item"
              v-for="(item,$index) in assets_all.base"
              :key="$index">
            <h4 class="title">{{item.name}}：</h4>

            <div class="detail_list">
              <el-button class="d_btn"
                         :class="{'d_btn_active':it.flag}"
                         :title="it.name"
                         size="small"
                         :key="$idx"
                         v-for="(it,$idx) in item.value"
                         @click="clickAllAssets(it.name,it.flag,$index, $idx);">{{it.name}}
              </el-button>
            </div>

            <div class="detail-toggle"
                 v-if="$index == item.pid"
                 @click="toggle_types($index,item.toggle_show)"
                 v-show="assets_all.base[$index].souce_value.length > 15">
              <label class="tog-types">
                <span class="name">更多</span>
                <i class="icons"
                   :class="{'checked': item.toggle_show }"></i>
              </label>
            </div>
          </li>
        </ul>
      </el-row>
    </div>

    <!--风险资产-->
    <div class="assets_risk">
      <el-form class="common-pattern">
        <h3 class="title">风险资产</h3>
        <el-row class="common_box"
                style="padding: 15px 0;">
          <el-col :span="24"
                  class="common_box_list">
            <el-input class="s_key"
                      placeholder="搜索关键词"
                      v-model.trim="params.key"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-select class="s_key"
                       v-model="params.threat"
                       clearable
                       placeholder="失陷确定性">
              <el-option v-for="item in options_threat"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key"
                       v-model="params.degree"
                       clearable
                       placeholder="威胁等级"
                       width="100">
              <el-option v-for="item in options_degree"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <el-select class="s_key"
                       v-model="params.status"
                       clearable
                       placeholder="处理状态">
              <el-option v-for="item in options_status"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <el-button class="s_btn"
                       @click="submitClick();">搜索</el-button>
            <el-link class="s_link"
                     @click="resetClick();">重置</el-link>
          </el-col>
        </el-row>
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
      </el-form>
      <el-row class="common-table-pattern">
        <el-col :span="24">
          <el-table ref="multipleTable"
                    align="center"
                    border
                    class="common-table"
                    :row-style="{cursor:'pointer'}"
                    v-loading="table.loading"
                    :data="table.tableData"
                    @row-click="detail_click"
                    @header-click="header_click"
                    @mousedown.native="mousedown"
                    @mouseup.native="mouseup"
                    @selection-change="handleSelChange">
            <el-table-column label=" "
                             prop="type"
                             align="center"
                             width="20">
              <template slot-scope="scope">
                <div class="new_dot"
                     v-show="false"></div>
              </template>
            </el-table-column>
            <el-table-column type="selection"
                             align="center"
                             class="selection"
                             width="50"></el-table-column>
            <el-table-column prop="asset_ip"
                             align="center"
                             label="资产"></el-table-column>
            <el-table-column prop="label_group"
                             align="center"
                             label="资产组"
                             show-overflow-tooltip
                             min-width="120">
            </el-table-column>
            <el-table-column min-width="140"
                             align="center"
                             label="关联威胁">
              <template slot-scope="scope">
                <span class="btn_tag_box"
                      v-if="item!=''"
                      v-for="item in scope.row.category">
                  <el-button type="primary"
                             class="btn_tag">
                    {{item}}
                  </el-button>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="威胁等级"
                             align="center"
                             width="120">
              <template slot-scope="scope">
                <span class="btn_alert_background"
                      :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">
                  {{ scope.row.degree | degree }}</span>
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
              <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24"
                class="e-pagination">
          <el-pagination class="handle-pagination"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="table.eachPage"
                         :current-page="table.pageNow"
                         :total="table.count"
                         layout="total, sizes, prev, pager, next">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗 -->
    <!-- 状态变更 -->
    <el-dialog class="pop_state_box"
               :close-on-click-modal="false"
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
           style="font-size:0;text-align: center;">
          <span style="font-size:14px">是否将已勾选的</span>
          <span style="font-size:14px">{{table.multipleSelection.length}}</span>
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
    <el-dialog class="task_new_box pop_box"
               :close-on-click-modal="false"
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
                          show-word-limit
                          maxlength="32"
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
                      maxlength="500"
                      show-word-limit
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
              <li v-for="(tab,index) in handle.table_title"
                  @click="table_btn_toggle(index)"
                  :class="{active:handle.active==index}">
                {{tab}}
              </li>
            </ul>
            <div v-show="handle.active == 0">
              <el-table class="common-table"
                        align="center"
                        border
                        :data="table_assets.tableData_new"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handle_sel_table_assets">
                <el-table-column type="selection"
                                 align="center"
                                 width="50"></el-table-column>
                <el-table-column prop="asset_ip"
                                 align="center"
                                 label="资产"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column prop="label_group"
                                 align="center"
                                 label="资产组"
                                 width="90"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="关联威胁"
                                 align="center"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span class="btn_tag_box"
                          v-if="item!=''"
                          v-for="item in scope.row.category">
                      <el-button type="primary"
                                 class="btn_tag">
                        {{item}}
                      </el-button>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="威胁等级"
                                 align="center">
                  <template slot-scope="scope">
                    <span class="btn_alert_background"
                          :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">
                      {{ scope.row.degree | degree }}</span>
                  </template>
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
                                 width="60">
                  <template slot-scope="scope">{{ scope.row.status | risk_status }}</template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination_box"
                             @size-change="sc_table_assets"
                             @current-change="hcc_table_assets"
                             :page-sizes="[10,20,50,100]"
                             :page-size="table_assets.eachPage"
                             :current-page="table_assets.pageNow"
                             :total="table_assets.count"
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
    <el-dialog class="pop_state_add pop_box"
               :close-on-click-modal="false"
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
                      @selection-change="handle_sel_table_add_works">
              <el-table-column type="selection"
                               align="center"
                               width="50"></el-table-column>
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
                <template slot-scope="scope">{{ scope.row.priority | priority }}</template>
              </el-table-column>
              <el-table-column prop="new_perator"
                               align="center"
                               label="经办人"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="状态"
                               align="center"
                               width="80"
                               show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
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
import VmHandleTabs from "./vm-handle/vm-handle-tabs";

import {
  forRoleList,
  formatList
} from '@/store/layout/auth'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'assets',
  components: {
    VmHandleTabs
  },

  data () {
    return {
      //
      search_flag: false,
      //頂部數據
      data_top: {},
      data_top_show: false,
      assets_all: {
        tags: [],
        base: [
          { name: '基础分类', souce_value: [], value: [], toggle_show: false, pid: 0 },
          { name: '业务', souce_value: [], value: [], toggle_show: false, pid: 1 },
          { name: '分支', souce_value: [], value: [], toggle_show: false, pid: 2 },
          { name: '部门', souce_value: [], value: [], toggle_show: false, pid: 3 },
          { name: '其他', souce_value: [], value: [], toggle_show: false, pid: 4 }
        ]
      },
      toggle_top_show: true,
      old_params: {
        key: "",
        threat: "",
        degree: "",
        status: "",
      },
      params: {
        key: "",
        threat: "",
        degree: "",
        status: "",
      },
      options_threat: [
        {
          value: "1",
          label: "已失陷"
        }
      ],
      options_degree: [
        {
          value: "low",
          label: "低危"
        },
        {
          value: "medium",
          label: "中危"
        },
        {
          value: "high",
          label: "高危"
        }
      ],
      options_status: [
        {
          value: "1",
          label: "待处置"
        },
        {
          value: "2",
          label: "处置中"
        }
      ],
      table: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        multipleSelection: [],
        loading: true
      },
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
        eachPage: 5
      },
      handle: {
        add: "",
        table_title: ["资产"],
        active: 0,
        dist: false,
        save: false
      },
      table_assets: {
        tableData: [],
        tableData_new: [],
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
        loading: true,
        multipleSelection: []
      },
      add_params: {
        name: "",
        level: "",
        operator: [],
        notice: ['email'],
        remarks: "",
        multiple: [],
        old_as: [],
        remind: ['email']
      },
      detail_click_val: {},
      detail_click_column: {},
      oldPositon: {
        x: '',
        y: ''
      },
      newPositon: {
        x: '',
        y: ''
      }
    };
  },
  created () {
    this.check_passwd();
    //頂部
    this.get_list_top();

    //全部資產
    this.get_list_all();

    //風險資產
    this.get_list_risk();

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
    //资产頂部
    get_list_top () {
      this.$axios.get('/yiiapi/alert/risk-asset-top')
        .then((resp) => {
          this.data_top_show = true;
          let data = resp.data.data;
          this.data_top = data;
          this.$set(this.data_top, data);
        })
    },

    //全部資產列表
    get_list_all () {
      this.$axios.get('/yiiapi/alert/all-asset-labels')
        .then((resp) => {

          let { status, data } = resp.data;

          if (status == 0) {
            data.base_category = data.base_category.map(function (v, k) {
              return { name: v, flag: false };
            });
            data.business = data.business.map(function (v, k) {
              return { name: v, flag: false };
            });
            data.branch = data.branch.map(function (v, k) {
              return { name: v, flag: false };
            });
            data.department = data.department.map(function (v, k) {
              return { name: v, flag: false };
            });

            let obj = data.others;
            let attr = [];
            Object.keys(obj).forEach(function (k) {
              attr.push({ name: obj[k], flag: false });
            });
            data.others = attr;
            this.assets_all.base[0].value = this.assets_all.base[0].souce_value = data.base_category;
            this.assets_all.base[1].value = this.assets_all.base[1].souce_value = data.business;
            this.assets_all.base[2].value = this.assets_all.base[2].souce_value = data.branch;
            this.assets_all.base[3].value = this.assets_all.base[3].souce_value = data.department;
            this.assets_all.base[4].value = this.assets_all.base[4].souce_value = data.others;
          }
        });
    },

    //風險資產列表
    get_list_risk () {

      this.table.loading = true;

      let params = { threat: 0, label: [] };

      //失陷确定性处置
      if (this.old_params.threat != '') {
        params.threat = 1;
      }
      //标签处置
      let labels = this.assets_all.tags;
      labels.forEach(function (v, k) {
        params.label.push(v.name);
      })

      params.label = JSON.stringify(params.label);


      this.$axios.get('/yiiapi/alert/risk-asset',
        {
          params: {
            key_word: this.old_params.key,
            degree: this.old_params.degree,
            status: this.old_params.status,
            fall_certainty: params.threat,

            label: params.label,
            page: this.table.pageNow,
            rows: this.table.eachPage
          }
        })
        .then((resp) => {
          this.table.loading = false;

          let { status, data } = resp.data;

          let datas = data;

          if (status == 0) {

            let { data, count, maxPage, pageNow } = datas;
            data.map(function (v, k) {

              let label_group = (Object.values(v.label)).join(',');
              let category_group = v.category.join(',');
              v.label_group = label_group;
              v.category_group = category_group;
            });

            this.table.tableData = data;
            this.table.count = count;
            this.table.maxPage = maxPage;
            this.table.pageNow = pageNow;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //*******************************需要修改
    //全部资产按钮点击事件
    clickAllAssets (name, flag, $index, $idx) {
      if (!flag) {
        this.assets_all.tags.push({ name: name, index: $index, idx: $idx });
        this.assets_all.base[$index].value[$idx].flag = true;
      } else {
        let tags = this.assets_all.tags;
        const index = tags.findIndex(item => item.name === name);
        this.assets_all.tags.splice(index, 1);
        this.assets_all.base[$index].value[$idx].flag = false;
      }


      if (!this.search_flag) {
        this.params.key = '';
        this.params.threat = '';
        this.params.degree = '';
        this.params.status = '';
      }

      this.get_list_risk();
    },

    //全部资产删除标签事件
    deleteAllAssets (item) {
      let tags = this.assets_all.tags;
      this.assets_all.base[item.index].value[item.idx].flag = false;
      let index = tags.findIndex(x => x.name == item.name);
      this.assets_all.tags.splice(index, 1);

      if (!this.search_flag) {
        this.params.key = '';
        this.params.threat = '';
        this.params.degree = '';
        this.params.status = '';
      }

      this.get_list_risk();
    },
    //*******************************需要修改

    //全部资产小分类展开折叠事件
    toggle_types (index, flag) {
      let souse = this.assets_all.base[index].souce_value;
      let souse_str = souse.slice(0, 15);
      if (!flag) {
        this.assets_all.base[index].value = souse_str;
      } else {
        this.assets_all.base[index].value = souse;
      }
      this.assets_all.base[index].toggle_show = !this.assets_all.base[index].toggle_show;
    },

    //搜索按鈕點擊事件
    submitClick () {
      this.search_flag = true;
      this.table.pageNow = 1;

      this.old_params.key = this.params.key;
      this.old_params.threat = this.params.threat;
      this.old_params.degree = this.params.degree;
      this.old_params.status = this.params.status;

      this.get_list_risk();
    },

    //重置按鈕點擊事件
    resetClick () {

      this.table.pageNow = 1;
      //清空选中全部资产
      this.assets_all.tags = [];

      //取消全部资产选中状态
      this.assets_all.base[0].value.map(item => item.flag = false);
      this.assets_all.base[1].value.map(item => item.flag = false);
      this.assets_all.base[2].value.map(item => item.flag = false);
      this.assets_all.base[3].value.map(item => item.flag = false);
      this.assets_all.base[4].value.map(item => item.flag = false);

      this.params.key = '';
      this.params.threat = '';
      this.params.degree = '';
      this.params.status = '';

      this.old_params.key = this.params.key;
      this.old_params.threat = this.params.threat;
      this.old_params.degree = this.params.degree;
      this.old_params.status = this.params.status;

      this.get_list_risk();
    },

    //每頁多少條切換
    handleSizeChange (val) {
      this.table.eachPage = val;
      this.table.pageNow = 1;
      this.get_list_risk();
    },

    //頁數點擊切換
    handleCurrentChange (val) {
      this.table.pageNow = val;
      this.get_list_risk();
    },

    //多选获取选中数据
    handleSelChange (val) {
      this.table.multipleSelection = val;
    },

    /************************************/
    //进入详情页面
    detail_click (val, column, cell) {
      this.detail_click_val = val
      this.detail_click_column = column
    },
    header_click (val) {
      this.detail_click_val = {}
    },
    mousedown (event) {
      this.oldPositon = {
        x: '',
        y: ''
      }
      this.newPositon = {
        x: '',
        y: ''
      }
      this.oldPositon.x = event.clientX;
      this.oldPositon.y = event.clientY;
    },
    mouseup (event) {
      this.newPositon.x = event.clientX;
      this.newPositon.y = event.clientY;
      if (this.oldPositon.x == this.newPositon.x) {
        setTimeout(() => {
          if (this.detail_click_val.id) {
            console.log('点击详情');
            if (Object.keys(this.detail_click_column).length != 0 && this.detail_click_column.type != 'selection') {
              this.$router.push({
                path: '/detail/assets', name: 'detail_assets',
                query: { id: this.detail_click_val.id, asset_ip: this.detail_click_val.asset_ip, status: this.detail_click_val.status,type:"assets" }
              });
            }
          } else {
            console.log('点击头部');
          }
        }, 10);
      } else {
        console.log('复制');
      }
    },

    /***********************************以下是弹窗部分****************************************/
    /***********************************以下是弹窗部分****************************************/

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
      let sel_table_data = this.table.multipleSelection;
      if (sel_table_data.length == 0) {
        this.$message({ message: '请选择需要变更的资产！', type: 'warning' });
        return false;
      } else {
        this.state_change = true;
      }
    },

    //关闭状态变更弹窗
    closed_state () {
      this.state_change = false;
      this.$refs.multipleTable.clearSelection();
    },

    //状态变更取消按钮点击
    cancel_state () {
      this.closed_state();
    },

    //状态变更确定按钮点击
    ok_state () {

      let selected = this.table.multipleSelection;
      //资产ID处理
      let asset_ip_group = selected.map(x => { return x.asset_ip });
      //状态设置
      let process = this.process_state;
      let change_status = 0;

      if (process == '处置中') {
        change_status = 2;
      } else if (process == '已处置') {
        change_status = 3;
      } else if (process == '已忽略') {
        change_status = 4;
      } else if (process == '误报') {
        change_status = 5;
      }

      this.$axios.put('/yiiapi/alert/change-asset-status', {
        asset_ip: asset_ip_group,
        status: change_status
      })
        .then(resp => {
          let { status, data } = resp.data;
          if (status == 0) {
            this.$message.success('资产状态变更成功！');
            //关闭弹窗
            this.closed_state();
            this.get_list_risk();
          } else {
            this.$message.error('资产状态变更错误！');
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    /***************工单任务*****************/

    //打开编辑工单
    open_task_new () {
      let sel_table_data = this.table.multipleSelection;
      let sel_table_attr = sel_table_data.map(x => { return x.status });
      if (sel_table_data.length == 0) {
        this.$message({ message: '请选择需要编辑的资产！', type: 'warning' });
        return false;
      } else {
        if (sel_table_attr.includes('3')
          || sel_table_attr.includes('4')
          || sel_table_attr.includes('5')) {
          this.$message({ message: '资产状态为已处置、已忽略、误报的不能新建。', type: 'warning' });
        } else {
          this.table_assets.tableData = sel_table_data;
          this.table_assets.count = sel_table_data.length;
          let eachPage = this.table_assets.eachPage;
          let handle_data = this.table_assets.tableData.slice(0, eachPage);
          this.table_assets.tableData_new = handle_data;

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
      this.table_assets.tableData_new = [];
      this.$refs.multipleTable.clearSelection();
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
    sc_table_assets (val) {
      this.table_assets.eachPage = val;
      this.table_assets.pageNow = 1;
      let handle_data = this.table_assets.tableData.slice(0, val);
      this.table_assets.tableData_new = handle_data;
    },

    //tabs下第一个table页数点击(资产);
    hcc_table_assets (val) {
      this.table_assets.pageNow = val;
      let eachPage = this.table_assets.eachPage;
      let handle_data = this.table_assets.tableData
        .slice((val - 1) * eachPage, val * eachPage);
      this.table_assets.tableData_new = handle_data;
    },

    //tab下第一个table多选
    handle_sel_table_assets (val) {
      this.table_assets.multipleSelection = val;
      let selected = val.map(x => { return x.id * 1 });
      this.task_params.multiple = selected;
    },

    //新增工单按钮切换
    table_btn_toggle (index) {
      this.handle.active = index;
    },

    //编辑工单分配
    prev_task_handle_assign () {
      if (this.task_params.multiple.length == 0) {
        let selected = this.table.multipleSelection
          .map(x => { return x.id * 1 });
        this.task_params.multiple = selected;
      }
      this.handle.save = true;
      this.$axios.put('/yiiapi/asset/distribution-workorder',
        {
          name: this.task_params.name,
          priority: this.task_params.level,
          perator: this.task_params.new_operator,
          remarks: this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind: this.task_params.notice,
          type: 'asset'
        })
        .then((resp) => {
          this.handle.save = false;
          let { status, msg, data } = resp.data;
          if (status == 0) {
            this.$message.success('分配成功');
            this.closed_task_new();
            this.get_list_risk();
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //编辑工单保存
    prev_task_handle_save () {
      if (this.task_params.multiple.length == 0) {
        let selected = this.table.multipleSelection
          .map(x => { return x.id * 1 });
        this.task_params.multiple = selected;
      }
      console.log(this.task_params.multiple);
      this.handle.save = true;
      this.$axios.post('/yiiapi/asset/add-workorder',
        {
          name: this.task_params.name,
          priority: this.task_params.level,
          perator: this.task_params.new_operator,
          remarks: this.task_params.textarea,
          risk_asset: this.task_params.multiple,
          remind: this.task_params.notice,
          type: 'asset'
        })
        .then((resp) => {
          this.handle.save = false;
          let { status, msg, data } = resp.data;
          if (status == 0) {
            this.$message.success('保存成功');
            this.closed_task_new();
            this.get_list_risk();
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new () {
      this.add_open_state();
    },

    //新加到工单打开状态
    add_open_state () {
      let sel_table_data = this.table.multipleSelection;
      let sel_table_attr = sel_table_data.map(x => { return x.status });
      if (sel_table_data.length == 0) {
        this.$message({ message: '请选择需要加入工单的资产！', type: 'warning' });
        return false;
      } else {
        if (sel_table_attr.includes('3')
          || sel_table_attr.includes('4')
          || sel_table_attr.includes('5')) {
          this.$message({ message: '资产状态为已处置、已忽略、误报的不能添加到工单。', type: 'warning' });
        } else {
          this.add_state_change = true;
          this.get_table_works_list();
        }
      }
    },

    //获取列表
    get_table_works_list () {
      this.$axios.get('/yiiapi/asset/workorder-list', {
        params: {
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage,
          type: 'asset'
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

    //新加到工单取消状态
    add_closed_state () {
      this.add_state_change = false;
      this.add_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: [],
        old_as: [],
        remind: ['email']
      };
      this.$refs.multipleTable.clearSelection();
    },

    //新加工单列表勾选某一条记录
    handle_sel_table_add_works (row) {
      this.table_add_works.multipleSelection = row;
    },

    //新加到工单确定
    add_ok_state () {

      let selected_attr = this.table.multipleSelection
        .map(x => { return x.id * 1 });
      this.add_params.multiple = selected_attr;

      //判断工单列表长度
      let multipe = this.table_add_works.multipleSelection;

      if (multipe.length == 0) {
        this.$message({ message: '请选择需要添加的工单！', type: 'warning' });
      } else if (multipe.length > 1) {
        this.$message({ message: '资产/告警不能添加到多个工单，请重新选择！', type: 'warning' });
      } else {
        console.log('******************')
        this.add_params.id = multipe[0].id;
        this.add_params.name = multipe[0].name;
        this.add_params.level = multipe[0].priority;
        this.add_params.perator = JSON.parse(multipe[0].perator);
        this.add_params.remarks = multipe[0].remarks;
        this.add_params.remind = JSON.parse(multipe[0].remind);

        this.add_params.old_as = JSON.parse(multipe[0].risk_asset);
        //console.log(this.add_params);
        this.add_params.multiple = [...this.add_params.multiple, ...this.add_params.old_as];

        console.log(this.add_params.multiple);
        this.add_params.multiple = [...new Set(this.add_params.multiple)];

        var newArr = this.add_params.multiple.filter(item => item)

        this.add_params.multiple = newArr;


        console.log(this.add_params.perator);

        this.handle.save = true;

        this.$axios.post('/yiiapi/asset/add-workorder',
          {
            id: this.add_params.id,
            name: this.add_params.name,
            priority: this.add_params.level,
            perator: this.add_params.perator,
            remind: this.add_params.remind,
            remarks: this.add_params.remarks,
            risk_asset: this.add_params.multiple,
            type: 'asset'
          })
          .then((resp) => {
            this.handle.save = false;
            let { status, msg, data } = resp.data;
            if (status == 0) {
              this.$message.success('添加成功');
              //清空状态
              this.add_closed_state();
              this.get_list_risk();
            } else if (status == 1) {
              this.$message.error(msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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
    },

  }
};
</script>

<style scoped lang="less">
@import '../../../assets/css/less/common-pattern.less';
@import '../../../assets/css/less/common-table-pattern.less';
.handle-assets {
  padding: 24px;
  .btn_tag_box {
    .btn_tag {
      margin: 2px;
      background: #5389e0;
      border-radius: 2px;
      min-height: 20px;
      font-size: 10px;
      color: #ffffff;
      padding: 2px 5px;
    }
  }
  .assets_all {
    height: auto;
    background: #fff;
    border-radius: 4px;
    margin-top: 30px;

    .assets_all_list {
      min-height: 60px;
      display: flex;
      position: relative;
      .title {
        width: 120px;
        color: #333333;
        font-size: 18px;
        margin-top: 16px;
        font-family: PingFangMedium;
      }

      .all_list {
        flex: 1;
        text-align: left;
        line-height: 36px;
        padding: 12px 0;
        /deep/ .el-tag {
          border-radius: 2px;
          margin-right: 5px;
          border-style: dashed;
        }
      }
      .tog {
        width: 124px;
        /deep/ .assets-toggle {
          position: absolute;
          bottom: 0;
          right: 0;
          height: 34px;
          width: 124px;
          line-height: 0;
          border-width: 0;
          background: #f8f8f8;
          text-align: center;

          .name {
            font-family: PingFang;
            font-size: 12px;
            color: #666666;
          }

          .icons {
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 0px -2px;
            background-image: url('../../../assets/images/handle/others/tog-top-down.png');

            &.top_down {
              background-position: 0px -4px;
              background-image: url('../../../assets/images/handle/others/tog-top.png');
            }
          }
        }
      }
    }

    .assets_all_detail {
      background: #ccc;
      font-family: PingFang;
      border-top: 1px solid #ececec;
      .all_detail {
        .all_detail_item {
          display: flex;
          height: 100%;
          .title {
            width: 120px;
            display: inline-block;
            background: #f8f8f8;
            font-size: 14px;
            color: #333;
            text-align: left;
            padding-top: 12px;
            padding-left: 24px;
          }
          .detail_list {
            flex: 1;
            text-align: left;
            padding: 5px;
            font-size: 0;
            background: #fff;
            min-height: 48px;
            display: inline-block;
            border-bottom: 1px solid #ececec;
            /deep/ .d_btn {
              width: 90px;
              height: 28px;
              border: 1px solid #ececec;
              margin: 3px;
              background-color: #fff;
              padding: 0 !important;
              color: #333;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              &.d_btn_active {
                border: 1px solid #0070ff;
                color: #0070ff;
              }

              &:hover {
                background-color: #fff;
              }
            }
          }

          .detail-toggle {
            width: 80px;
            background: #fff;
            position: relative;
            border-bottom: 1px solid #ececec;

            .tog-types {
              position: absolute;
              top: 11px;
              left: 9px;

              .name {
                font-family: PingFang;
                font-size: 12px;
                color: #0070ff;
                display: inline-block;
              }

              .icons {
                width: 16px;
                height: 16px;
                display: inline-block;
                vertical-align: middle;
                background-repeat: no-repeat;
                background-size: 16px;
                background-position: 0px -2px;
                background-image: url('../../../assets/images/handle/others/tog-types.png');
                &.checked {
                  background-image: url('../../../assets/images/handle/others/tog-types-down.png');
                }
              }
            }
          }

          &:last-child {
            .detail_list {
              border-top: 1px solid #fff;
              border-bottom: 1px solid #fff;
            }
            .detail-toggle {
              border-width: 0;
            }
          }
        }
      }
    }

    /deep/ .handle-pagination {
      margin: 20px 0;
    }
  }

  .assets_risk {
    border-radius: 4px;
    margin-top: 20px;
    padding: 20px 24px;
    height: auto;
    background: #fff;
    text-align: left;
  }

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
            background-image: url('../../../assets/images/emerge/step1.png');
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
            background-image: url('../../../assets/images/emerge/step2.png');
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
  /deep/ .pop_box {
    .el-dialog {
      background: #ffffff;
      border-radius: 4px;
      position: fixed;
      // top: 200px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
