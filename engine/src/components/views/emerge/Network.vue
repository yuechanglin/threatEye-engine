<template>
  <div id="Network"
       v-loading.fullscreen.lock="handle.save"
       v-cloak>
    <div class="e_line"
         v-loading="e_line.loading">
      <p class="title">实时告警监测</p>
      <vm-emerge-line :data='echarts_data'
                      v-if="e_line.data_show"></vm-emerge-line>
    </div>
    <!--告警-->
    <div class="alert_risk">
      <el-form class="common-pattern">
        <h3 class="title">告警监测</h3>
        <el-row class="common_box" style="padding: 15px 0;">
          <!--<el-col :span="24"
                  class="common_box_list">
            &lt;!&ndash;搜索关键词&ndash;&gt;
            <el-input class="s_key"
                      placeholder="搜索关键词"
                      v-model="params.key"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>
            &lt;!&ndash;时间&ndash;&gt;
            <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>
            &lt;!&ndash;失陷确定性&ndash;&gt;
            <el-select class="s_key s_key_types"
                       v-model="params.threat"
                       clearable
                       placeholder="失陷确定性"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_threat"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            &lt;!&ndash;威胁等级&ndash;&gt;
            <el-select class="s_key"
                       v-model="params.degree"
                       clearable
                       placeholder="威胁等级"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_degrees"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            &lt;!&ndash;处理状态&ndash;&gt;
            <el-select class="s_key"
                       v-model="params.status"
                       clearable
                       placeholder="处理状态"
                       :popper-append-to-body="false">
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

            <el-button class="s_btn_edit"
                       @click="export_box">导出</el-button>
          </el-col>-->
          <!--1-->
          <el-col :span="24" class="common_box_list">

            <!--告警类型-->
            <el-input class="s_key1"
                      placeholder="告警类型"
                      v-model.trim="params.category"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--威胁指标-->
            <el-input class="s_key1"
                      placeholder="威胁指标"
                      v-model.trim="params.indicator"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--告警时间-->
            <vm-emerge-picker @changeTime='changeTime'></vm-emerge-picker>

            <!--失陷确定性-->
            <el-select class="s_key1 s_key1_ok"
                       v-model="params.fall_certainty"
                       clearable
                       placeholder="失陷确定性"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_certainty"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <!--处理状态-->
            <el-select class="s_key1"
                       v-model="params.status"
                       clearable
                       placeholder="处理状态"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_status"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <!--威胁等级-->
            <el-select class="s_key1"
                       v-model="params.degree"
                       clearable
                       placeholder="威胁等级"
                       :popper-append-to-body="false">
              <el-option v-for="item in options_degree"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <!--2-->
          <el-col :span="24" class="common_box_list common_box_list_network">

            <!--源地址-->
            <el-input class="s_key1"
                      placeholder="源地址"
                      v-model.trim="params.src_ip"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--目的地址-->
            <el-input class="s_key1"
                      placeholder="目的地址"
                      v-model.trim="params.dest_ip"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <!--更新时间-->
            <vm-emerge-picker1 @changeTime1='changeTime1'></vm-emerge-picker1>

            <!--标签-->
            <el-input class="s_key1 s_key1_ok"
                      placeholder="标签"
                      v-model.trim="params.label"
                      clearable>
              <i slot="prefix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-button class="s_btn s_btn1_ok"
                       @click="submitClick();">搜索</el-button>
            <el-link class="s_link"
                     @click="resetClick();">重置</el-link>
            <el-button class="s_btn_edit"
                       @click="export_box">导出</el-button>
          </el-col>
        </el-row>
        <!--按钮组-->
        <el-row class="common_btn" style="width: 100%;">
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


            <!--配置列-->
            <el-dropdown class="e_deplay"
                         trigger="click"
                         ref="messageDrop"
                         @visible-change="dropdown_hide">
              <span class="s_btn_train">
                <i class="t_img"></i>
                <span class="t_name">配置列</span>
              </span>
              <el-dropdown-menu class="s_btn_list"
                                slot="dropdown"
                                style="padding: 20px;">
                <span class="s_b_name">展示字段</span>
                <ul class="s_b_list">
                  <li class="item"
                      v-for="(item,$index) in fieldList"
                      :key="$index">
                    <el-checkbox v-model="item.checked"
                                 :disabled="item.disabled"
                                 @change="fieldChange(item.alias,item.name)">{{item.name}}
                    </el-checkbox>
                  </li>
                </ul>
                <div class="s_b_group">
                  <el-button type="primary"
                             class="s_bg s_bg_cancel"
                             @click.native="label_cancel_Click()">取消</el-button>
                  <el-button type="primary"
                             class="s_bg s_bg_submit"
                             @click.native="label_submit_click()">确认</el-button>
                </div>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
        </el-row>
      </el-form>
      <!--:render-header="col"         :key="randomKey"-->
      <el-row class="common-table-pattern table_wrap">
        <el-col :span="24">
          <el-table ref="multipleTable"
                    align="center"
                    border
                    id="table_wrap_alert"
                    class="common-table common-table_alert"
                    v-loading="table.loading"
                    :data="table.tableData"
                    :row-style="{cursor:'pointer'}"
                    tooltip-effect="dark"
                    @mousedown.native="mousedown"
                    @mouseup.native="mouseup"
                    @selection-change="handleSelChange"
                    @header-click="header_click"
                    @sort-change="header_cell"
                    @header-dragend="headerDragend"
                    row-key="id"
                    :key="randomKey"
                    @row-click="detail_click">
            <el-table-column label=" "
                             fixed="left"
                             align="center"
                             prop="type"
                             :resizable="false"
                             width="30">
              <template slot-scope="scope">
                <div class="new_dot"
                     v-show="scope.row.new_alert=='1'"></div>
              </template>
            </el-table-column>
            <el-table-column type="selection"
                             fixed="left"
                             align="center"
                             width="50"
                             :resizable="false">
            </el-table-column>
            <!--:key="`col_${index}`"-->
            <template v-for="(item, index) in dropCol">
              <!--告警时间-->
              <el-table-column align="center"
                               v-if="dropCol[index].prop == 'alert_time'"
                               show-overflow-tooltip
                               min-width="150"
                               :prop="dropCol[index].prop"
                               :label="item.label">
                <template slot-scope="scope">{{ scope.row.alert_time | time }}</template>
              </el-table-column>
              <!--威胁等级-->
              <el-table-column align="center"
                               v-else-if="dropCol[index].prop == 'degree'"
                               show-overflow-tooltip
                               sortable="custom"
                               min-width="100"
                               :prop="dropCol[index].prop"
                               :label="item.label">
                <template slot-scope="scope">
                  <span class="btn_alert_background"
                        :class="{'high_background':scope.row.degree =='高',
                        'mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
                    {{ scope.row.degree | degree_sino }}</span>
                </template>
              </el-table-column>
              <!--失陷确定性-->
              <el-table-column align="center"
                               v-else-if="dropCol[index].prop == 'fall_certainty'"
                               show-overflow-tooltip
                               :prop="dropCol[index].prop"
                               :label="item.label">
                <template slot-scope="scope">
                  <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                    {{ scope.row.fall_certainty | certainty }}</span>
                </template>
              </el-table-column>
              <!--状态-->
              <el-table-column align="center"
                               v-else-if="dropCol[index].prop == 'status'"
                               show-overflow-tooltip
                               :prop="dropCol[index].prop"
                               :label="item.label">
                <template slot-scope="scope">{{ scope.row.status | alert_status }}</template>
              </el-table-column>
              <!--更新时间-->
              <el-table-column align="center"
                               v-else-if="dropCol[index].prop == 'updated_at'"
                               show-overflow-tooltip
                               sortable="custom"
                               min-width="150"
                               :prop="dropCol[index].prop"
                               :label="item.label">
                <template slot-scope="scope">{{ scope.row.updated_at | time }}</template>
              </el-table-column>
              <!--其他-->
              <el-table-column align="center"
                               v-else
                               min-width="100"
                               show-overflow-tooltip
                               :prop="dropCol[index].prop"
                               :label="item.label">
              </el-table-column>
            </template>
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
           style="font-size:0;text-align: center">
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

        <!--出现滚动条-->
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
                      tooltip-effect="dark"
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
            <div>
              <div v-show="handle.active == 0">
                <el-table class="common-table"
                          align="center"
                          border
                          :data="table_alerts.tableData_new"
                          tooltip-effect="dark"
                          @selection-change="handle_sel_table_alerts">
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
                      <span class="btn_alert_background"
                            :class="{'high_background':scope.row.degree =='高','mid_background':scope.row.degree =='中','low_background':scope.row.degree =='低'}">
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
                <el-pagination class="pagination_box"
                               @size-change="sc_table_alerts"
                               @current-change="hcc_table_alerts"
                               :page-sizes="[10,20,50,100]"
                               :page-size="table_alerts.eachPage"
                               :current-page="table_alerts.pageNow"
                               :total="table_alerts.count"
                               layout="total, sizes, prev, pager, next">
                </el-pagination>
              </div>
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
                      tooltip-effect="dark"
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
import vmEmergeLine from "./vm-emerge/vm-emerge-line";
import vmEmergePicker from "@/components/common/vm-emerge-picker";
import vmEmergePicker1 from "@/components/common/vm-emerge-picker1";
import { eventBus } from '@/components/common/eventBus.js';
//拖拽
import Sortable from 'sortablejs';
export default {
  name: "Network",
  components: {
    vmEmergeLine,
    vmEmergePicker,
    vmEmergePicker1
  },
  data () {
    return {
      randomKey: 0,
      dropCol: [],
      fieldFlag: false,
      fieldList: [{ checked: true, disabled: true, name: "告警时间", alias: 'alert_time' },
        { checked: true, disabled: true, name: "告警类型", alias: 'category' },
        { checked: true, disabled: true, name: "源地址", alias: 'src_ip' },
        { checked: true, disabled: true, name: "目的地址", alias: 'dest_ip' },
        { checked: true, disabled: false, name: "威胁指标", alias: 'indicator' },
        { checked: true, disabled: false, name: "应用", alias: 'application' },
        { checked: true, disabled: false, name: "威胁等级", alias: 'degree' },
        { checked: true, disabled: false, name: "失陷确定性", alias: 'fall_certainty' },
        { checked: false, disabled: false, name: "更新时间", alias: 'updated_at' },
        { checked: false, disabled: false, name: "告警次数", alias: 'alert_count' },
        { checked: false, disabled: false, name: "标签", alias: 'labels' },
        { checked: true, disabled: false, name: "状态", alias: 'status' }],
      sortable:null,
      echarts_data: {},
      e_line: {
        loading: true,
        data_show: false,
      },
      old_params:{
        category:'',
        indicator: '',
        start_time: '',
        end_time: '',
        fall_certainty: '',
        status: '',
        degree: '',
        src_ip: '',
        dest_ip: '',
        update_stime: '',
        update_etime:'',
        label: ''
      },
      params: {
        fall_certainty: '',
        status: '',
        degree: '',
        start_time: '',
        end_time: '',
        category:'',
        indicator: '',
        src_ip: '',
        dest_ip: '',
        update_stime: '',
        update_etime:'',
        label: '',
        sort:'degree'
      },
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
      options_certainty: [
        {
          value: "1",
          label: "已失陷"
        }
      ],
      options_status: [
        {
          value: "all",
          label: "所有"
        },
        {
          value: "0",
          label: "新告警"
        },
        {
          value: "1",
          label: "待处置"
        },
        {
          value: "2",
          label: "处置中"
        },
        {
          value: "3",
          label: "已处置"
        },
        {
          value: "4",
          label: "已忽略"
        },
        {
          value: "5",
          label: "误报"
        }
      ],
      edit_tag: {
        tag_list: [],
        pop: false
      },
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
        multiple: [],
        remind: ['email']
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
        add: "",
        table_title: ["告警"],
        active: 0,
        save: false
      },
      table_alerts: {
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
      detail_click_val: {},
      detail_click_column: {},
      add_params: {
        name: "",
        level: "",
        operator: [],
        notice: ['email'],
        remarks: "",
        multiple: [],
        old_as: [],
      },
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
  mounted () {
    this.check_passwd();

    this.get_echarts();

    this.get_list_risk();

    this.column_deploy();
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

    // 获取折现图表
    get_echarts () {
      this.$axios.get('/yiiapi/alert/alert-trend')
        .then(response => {
          this.e_line.loading = false;
          this.e_line.data_show = true;

          if (response.data.data) {
            this.echarts_data = response.data.data;
          } else {
            this.echarts_data = [{ statistics_time: '', alert_count: 0 }]
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

    /**
    * 2020/10/28ycl新加功能
    * */
    //配置到
    column_deploy () {
      this.$axios.get('/yiiapi/site/field-list')
        .then((resp) => {
          // console.log(resp);
          this.dropCol = [];
          let { status, data } = resp.data;
          if (status == 0) {
            let config = data.config.fields;

           // console.log(config)
            for (var key of config) {

              this.fieldList.forEach(item => {
                if (item.alias == key) {
                  this.dropCol.push({ label: item.name, prop: item.alias })
                }
              });
            }

            this.fieldList.forEach(item => {
              if (config.includes(item.alias)) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
            this.columnDrop();
          }
        });
    },

    //下拉框勾选事件
    fieldChange (alias, name) {
      let colAttr = this.dropCol.map((item) => {
        return item.prop;
      });
      if (colAttr.includes(alias)) {
        var index = colAttr.findIndex((element) => (element == alias));
        this.dropCol.splice(index, 1);
      } else {
        this.dropCol.push({ label: name, prop: alias });
      }
    },

    //列拖拽
    columnDrop () {
      const wrapperTr = document.querySelector('.common-table_alert tr');
      this.sortable = Sortable.create(wrapperTr, {
        only: '.table_wrap',
        animation: 180,
        preventOnFilter:true,
        delay: 0,
        onEnd: evt => {
          let newIndex = evt.newIndex - 2;
          let oldIndex = evt.oldIndex - 2;
          const oldItem = this.dropCol[oldIndex];
          this.dropCol.splice(oldIndex, 1);
          this.dropCol.splice(newIndex, 0, oldItem);

          this.label_submit_click();

          this.randomKey += 1;

         // this.sortable.destroy();
        }
      });
    },

    //配置到取消
    label_cancel_Click () {
      this.$refs.messageDrop.hide();
      this.column_deploy();
      this.get_list_risk();
    },

    //配置到确定
    label_submit_click (args) {
      let fieldAttr = [];
      fieldAttr = this.dropCol.map(item => {
        return item.prop;
      });

      this.$axios.put('/yiiapi/site/field-edit', {
        fields: fieldAttr
      })
        .then((resp) => {

          let { status, msg, data } = resp.data;

          if (status == 0) {
            this.$refs.messageDrop.hide();
            //this.table.pageNow = 1;
            this.get_list_risk();

            this.randomKey += 1;
          } else {
            this.$message({
              message: '修改错误！',
              type: 'error',
            });
          }
        });
    },

    //配置列弹窗关闭事件
    dropdown_hide (val) {
      if (!val) {this.label_cancel_Click();}
    },
    /**
     * 2020/10/28ycl新加功能
     * */
    // 获取告警列表
    get_list_risk () {
      this.table.loading = true;

      let params_alert = {
        fall_certainty: ''
      };
      if (this.old_params.fall_certainty == 1) {
        params_alert.fall_certainty = 1;
      }

      this.$axios.get('/yiiapi/alert/list', {
        params: {
          category:this.old_params.category,
          indicator:this.old_params.indicator,
          start_time: this.old_params.start_time,
          end_time: this.old_params.end_time,
          fall_certainty: params_alert.fall_certainty,
          status: this.old_params.status,
          degree: this.old_params.degree,
          src_ip:this.old_params.src_ip,
          dest_ip:this.old_params.dest_ip,
          update_stime:this.old_params.update_stime,
          update_etime:this.old_params.update_etime,
          label:this.old_params.label,

          sort: this.params.sort,
          page: this.table.pageNow,
          rows: this.table.eachPage
        }
      }).then(resp => {

        this.table.loading = false;

        let { status, data } = resp.data;
        let datas = data;

        if (status == 0) {

          let { data, count, maxPage, pageNow } = datas;

          data.map(v => {
            v.labels = v.labels.join(',');
          });

          this.table.tableData = data;
          this.table.count = count;
          this.table.maxPage = maxPage;
          this.table.pageNow = pageNow;

          this.columnDrop();
        }
      })
        .catch(error => {
          console.log(error);
        })
    },
    //告警时间
    changeTime (data) {
      if (data) {
        this.params.start_time = (data[0].valueOf() / 1000).toFixed(0);
        this.params.end_time = (data[1].valueOf() / 1000).toFixed(0);
      } else {
        this.params.start_time = '';
        this.params.end_time = '';
      }
    },
    //更新时间
    changeTime1 (data) {
      if (data) {
        this.params.update_stime = (data[0].valueOf() / 1000).toFixed(0);
        this.params.update_etime = (data[1].valueOf() / 1000).toFixed(0);
      } else {
        this.params.update_stime = '';
        this.params.update_etime = '';
      }
    },

    //搜索按鈕點擊事件
    submitClick () {
      this.table.pageNow = 1;

      this.old_params.category = this.params.category;
      this.old_params.indicator = this.params.indicator;
      this.old_params.start_time = this.params.start_time;
      this.old_params.end_time = this.params.end_time;
      this.old_params.fall_certainty = this.params.fall_certainty;
      this.old_params.status = this.params.status;
      this.old_params.degree = this.params.degree;
      this.old_params.src_ip = this.params.src_ip;
      this.old_params.dest_ip = this.params.dest_ip;
      this.old_params.update_stime = this.params.update_stime;
      this.old_params.update_etime = this.params.update_etime;
      this.old_params.label = this.params.label;

      this.get_list_risk();
    },

    //重置按鈕點擊事件
    resetClick () {
      this.params.fall_certainty = '';
      this.params.status = '';
      this.params.degree = '';
      this.params.start_time = '';
      this.params.end_time = '';
      this.params.category = '';
      this.params.indicator = '';
      this.params.src_ip = '';
      this.params.dest_ip = '';
      this.params.update_stime = '';
      this.params.update_etime = '';
      this.params.label = '';
      //this.params.sort = 'degree';

      this.old_params.category = this.params.category;
      this.old_params.indicator = this.params.indicator;
      this.old_params.start_time = this.params.start_time;
      this.old_params.end_time = this.params.end_time;
      this.old_params.fall_certainty = this.params.fall_certainty;
      this.old_params.status = this.params.status;
      this.old_params.degree = this.params.degree;
      this.old_params.src_ip = this.params.src_ip;
      this.old_params.dest_ip = this.params.dest_ip;
      this.old_params.update_stime = this.params.update_stime;
      this.old_params.update_etime = this.params.update_etime;
      this.old_params.label = this.params.label;

      $(document.querySelectorAll('.el-button--text')).trigger('click');
      this.table.pageNow = 1;
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

    //进入详情页面
    detail_click (val, column, cell) {
      this.detail_click_val = val
      this.detail_click_column = column
    },
    header_click (val) {
      this.detail_click_val = {}
    },
    headerDragend(evt){
      console.log('headerDragend')
      //this.randomKey += 1;
      if(this.sortable){
        //this.sortable.destroy()

        //console.log(this.sortable)

       // this.sortable = null;
      }

      setTimeout(() => {
        console.log('444')
        this.columnDrop();

      },500)
    },
    //列排序
    header_cell (val) {

      if(val.prop == 'updated_at'){
        this.params.sort = 'updated_at';
      }else if(val.prop == 'degree'){
        this.params.sort = 'degree';
      }else {
        this.params.sort = 'degree';
      }
      this.get_list_risk();
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
              this.$router.push({ path: "/detail/network", query: { detail: this.detail_click_val.id, type: 'alert' } });
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
        this.$message({ message: '请选择需要变更的告警！', type: 'warning' });
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
      let id_group = selected.map(x => { return x.id; });

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

      this.$axios.put('/yiiapi/alert/do-alarm', {
        id: id_group,
        status: change_status
      })
        .then(resp => {
          let { status, msg, data } = resp.data;
          if (status == 0) {
            this.$message.success('告警状态变更成功！');
            //关闭弹窗
            this.closed_state();
            this.get_list_risk();
          } else {
            if (msg == '') {
              this.$message.error(msg);
            } else {
              this.$message.error('状态变更失败');
            }
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
        this.$message({ message: '请选择需要编辑的告警！', type: 'warning' });
        return false;
      } else {
        if (sel_table_attr.includes('3')
          || sel_table_attr.includes('4')
          || sel_table_attr.includes('5')) {
          this.$message({ message: '告警状态为已处置、已忽略、误报的不能新建。', type: 'warning' });
        } else {
          this.table_alerts.tableData = sel_table_data;
          this.table_alerts.count = sel_table_data.length;
          //let pageNow = this.table_alerts.pageNow;
          let eachPage = this.table_alerts.eachPage;
          let handle_data = this.table_alerts.tableData.slice(0, eachPage);
          this.table_alerts.tableData_new = handle_data;

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
        multiple: [],
        remind: ['email']
      };
      this.table_operator.tableData = [];
      this.table_alerts.tableData_new = [];
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
    sc_table_alerts (val) {
      this.table_alerts.eachPage = val;
      this.table_alerts.pageNow = 1;
      let handle_data = this.table_alerts.tableData.slice(0, val);
      this.table_alerts.tableData_new = handle_data;
    },

    //tabs下第一个table页数点击
    hcc_table_alerts (val) {
      this.table_alerts.pageNow = val;
      let eachPage = this.table_alerts.eachPage;
      let handle_data = this.table_alerts.tableData
        .slice((val - 1) * eachPage, val * eachPage);
      this.table_alerts.tableData_new = handle_data;
    },

    //tab下第一个table多选
    handle_sel_table_alerts (val) {
      this.table_alerts.multipleSelection = val;
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

      console.log(this.task_params.multiple);

      this.handle.save = true;
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
        let alerts = this.table.multipleSelection;
        let selected = this.table.multipleSelection
          .map(x => { return x.id * 1 });
        this.task_params.multiple = selected;
      }
      //console.log(this.task_params);
      this.handle.save = true;
      this.$axios.post('/yiiapi/alert/add-workorder',
        {
          name: this.task_params.name,
          priority: this.task_params.level,
          perator: this.task_params.new_operator,
          remarks: this.task_params.textarea,
          te_alert: this.task_params.multiple,
          remind: this.task_params.notice,
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
        this.$message({ message: '请选择需要添加到工单的告警！', type: 'warning' });
        return false;
      } else {
        if (sel_table_attr.includes('3')
          || sel_table_attr.includes('4')
          || sel_table_attr.includes('5')) {
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
      this.add_params = {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: [],
        old_as: []
      };
      this.$refs.multipleTable.clearSelection();
    },
    //获取列表
    get_table_works_list () {
      this.$axios.get('/yiiapi/alert/workorder-list', {
        params: {
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage
        }
      }).then((resp) => {

        console.log(resp)
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
      console.log(row)
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

        this.add_params.old_as = JSON.parse(multipe[0].te_alert);
        //console.log(this.add_params);
        this.add_params.multiple = [...this.add_params.multiple, ...this.add_params.old_as];

        console.log(this.add_params.multiple);
        this.add_params.multiple = [...new Set(this.add_params.multiple)];

        var newArr = this.add_params.multiple.filter(item => item)

        this.add_params.multiple = newArr;

        console.log(this.add_params.remind)
        console.log(this.add_params.perator);
        this.handle.save = true;
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
          }).then((resp) => {
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

    /***************************导出*****************************/
    //导出
    export_box () {
      this.$confirm('是否确定导出告警列表?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

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

                  var url1 = "/yiiapi/alert/export-alerts?start_time=" + this.old_params.start_time
                    + '&end_time=' + this.old_params.end_time
                    + '&fall_certainty=' + this.old_params.fall_certainty
                    + '&status=' + this.old_params.status
                    + '&degree=' + this.old_params.degree
                    + '&page=' + this.table.pageNow
                    + '&rows=' + this.table.eachPage
                    + '&category=' + this.old_params.category
                    + '&indicator=' + this.old_params.indicator
                    + '&src_ip=' + this.old_params.src_ip
                    + '&dest_ip=' + this.old_params.dest_ip
                    + '&update_stime=' + this.old_params.update_stime
                    + '&update_etime=' + this.old_params.update_etime
                    + '&label=' + this.old_params.label;
                  window.location.href = url1;
                })
                .catch(error => {
                  console.log(error);
                })
            }
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消导出' });

        this.$refs.multipleTable.clearSelection();
      });
    }
  }
};
</script>

<style scoped lang="less">
  @import '../../../assets/css/less/common-pattern.less';
  @import '../../../assets/css/less/common-table-pattern.less';
  #Network {
    text-align: left;
    padding: 24px;
    .e_line {
      height: 322px;
      background: #ffffff;
      border-radius: 4px;
      position: relative;
      .title {
        text-align: left;
        font-size: 18px;
        color: #333;
        position: absolute;
        top: 12px;
        left: 24px;
      }
    }
    .alert_risk {
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
            height: 112px;
            padding-top: 36px;
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
          /*max-height: 640px;*/
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
            padding-top: 16px;
          }
          .btn_box {
            height: 42px;
            text-align: center;
            margin-bottom: 10px;

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

          .el-table__header{
            .el-checkbox{
              display: none;
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
<style lang="less">
  .s_btn_list {
    position: absolute;
    top: 30px;
    right: 0;
    width: 308px !important;
    height: 408px !important;
    background: #ffffff;
    padding: 20px 20px !important;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.24);
    .s_b_name {
      height: 30px;
      line-height: 30px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }
    .s_b_list {
      height: 288px;
      overflow-y: auto;
      .item {
        line-height: 24px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        /deep/ .el-checkbox {
          .el-checkbox__label {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
          }
        }
      }
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        /*高宽分别对应横竖滚动条的尺寸*/
        /* border-radius: 6px;*/
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 6px;
        background: #0070ff;
        /*background: red;*/
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 6px;
        background: #f4f4f4;
      }
    }
    .s_b_group {
      margin-top: 10px;
      height: 40px;
      line-height: 50px;
      text-align: center;
      /deep/ .s_bg {
        font-size: 14px;
        height: 34px;
        width: 96px;
        outline: none;
        margin-right: 8px;
        line-height: 0;
        padding: 0;
        font-family: PingFangMedium;
        &.s_bg_submit {
          color: #fff;
          background: #0070ff;
          border: 1px solid #0070ff;
          &:hover {
            color: #fff;
            background: #0070ff;
            border: 1px solid #0070ff;
          }
        }
        &.s_bg_cancel {
          color: #0070ff;
          border: 1px solid #0070ff;
          background-color: #fff;
          &:hover {
            color: #0070ff;
            border: 1px solid #0070ff;
            background-color: #fff;
          }
        }
      }
    }
  }
   //.el-table th.gutter{display: table-cell!important;}
</style>
