<template>
  <div class="detail-network"
       v-loading.fullscreen.lock="loading"
       v-cloak>
    <back-title :title-name="title_name"></back-title>
    <div class="detail_base">
      <div class="detail_base_top">
        <div class="top_left">
          <img src="@/assets/images/emerge/top1.png"
               alt="">
          <img src="@/assets/images/emerge/top2.png"
               alt="">
          <img src="@/assets/images/emerge/top3.png"
               alt="">
        </div>
        <div class="top_right">
          <el-row class="common_btn common_btn_124">
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
                                  class="dropdown_ul_box_124">
                  <el-dropdown-item command='2'
                                    class="select_item">处置中</el-dropdown-item>
                  <el-dropdown-item command="3"
                                    class="select_item">已处置</el-dropdown-item>
                  <el-dropdown-item command='4'
                                    class="select_item">已忽略</el-dropdown-item>
                  <el-dropdown-item command="5"
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
                                  class="dropdown_ul_box_124">
                  <el-dropdown-item command="1">新建工单</el-dropdown-item>
                  <el-dropdown-item command="2">添加到工单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button class="edit_btn"
                         @click="edit_tag_box">编辑标签</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail_base_bottom">
        <div class="detail_base_bottom_item">
          <ul>
            <li class="item_li">
              <span class="item_li_title">源地址:</span>
              <el-dropdown @command="change_state_src"
                           trigger="click"
                           class="src_dropdown_box"
                           placement='bottom-start'
                           size='148'>
                <el-button class="change_src_btn">
                  <span>{{network_detail.src_ip}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  style="width:200px;"
                                  class="dropdown_ul_box_detail">
                  <el-dropdown-item command='1'
                                    class="select_item">威胁追查</el-dropdown-item>
                  <el-dropdown-item command="2"
                                    class="select_item">添加到外部动态列表</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="item_li">
              <span class="item_li_title">目的地址:</span>
              <el-dropdown @command="change_state_dest"
                           trigger="click"
                           class="src_dropdown_box"
                           placement='bottom-start'
                           size='148'>
                <el-button class="change_src_btn">
                  <span>{{network_detail.dest_ip}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"
                                  style="width:200px;"
                                  class="dropdown_ul_box_detail">
                  <el-dropdown-item command='1'
                                    class="select_item">威胁追查</el-dropdown-item>
                  <el-dropdown-item command="2"
                                    class="select_item">添加到外部动态列表</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="item_li">
              <span class="item_li_title">源标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.src_label_obj.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.src_label_obj">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">目的标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.dest_label_obj.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.dest_label_obj">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">告警时间:</span>
              <span class="item_li_content">{{network_times_active.alert_time}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">威胁指标:</span>
              <span class="item_li_content">{{network_times_active.indicator}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">告警类型:</span>
              <span class="item_li_content">{{network_times_active.alert_description.category}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">状态:</span>
              <span class="item_li_content">{{network_detail.status | alert_status}}</span>
            </li>
          </ul>
        </div>
        <div class="detail_base_bottom_item">
          <ul>
            <li class="item_li">
              <span class="item_li_title">应用:</span>
              <span class="item_li_content">{{network_times_active.application}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">检测引擎:</span>
              <span class="item_li_content">{{network_times_active.detect_engine}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">失陷确定性:</span>
              <span :class="network_times_active.fall_certainty == '0'?'':'fall_certainty'">
                {{network_times_active.fall_certainty == '0'?'':'已失陷'}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">标签:</span>
              <div class="item_li_content">
                <ul v-if="network_detail.label.length !=0">
                  <li class="tag_btn_box"
                      v-for="item in network_detail.label">
                    <span class="tag_btn">{{item}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="item_li">
              <span class="item_li_title">攻击阶段:</span>
              <span class="item_li_content">{{network_times_active.attack_stage_cn }}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单名称:</span>
              <span class="item_li_content Goto_workorder"
                    @click="Goto_workorder"
                    v-if="network_work_order.work_name!=''">{{network_work_order.work_name}}</span>
            </li>
            <li class="item_li">
              <span class="item_li_title">工单状态:</span>
              <span class="item_li_content">{{network_work_order.work_order_status}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 检测时间轴 -->
    <div class="detail_time_box">
      <p class="time_title">检测时间轴</p>
      <div class="time_content">
        <div class="time_left">
          <ul class="time_left_list">
            <li class="time_item"
                v-for="(item,index) in network_times"
                @click="time_active(index)"
                :class="{active:time_choose==index}">
              <div class="triangle"
                   v-show="time_choose==index"></div>
              <div class="time_item_left">
                <img src="@/assets/images/emerge/time_false.png"
                     v-show="time_choose!=index">
                <img src="@/assets/images/emerge/time_true.png"
                     v-show="time_choose==index">
              </div>
              <div class="time_item_right">
                <p>{{item.alert_time}} </p>
                <p>{{item.detect_engine}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="time_right">
          <div v-for="(item,index) in network_times"
               v-show="time_choose==index">
            <p class="title">详细信息</p>
            <div class="time_right_info">
              <div class="time_right_info_top">
                <li class="info_top_item">
                  <span class="info_top_item_title">检测引擎</span>
                  <span class="info_top_item_content">{{item.detect_engine}}</span>
                </li>
                <!-- <li class="info_top_item">
                  <span class="info_top_item_title">情报类型</span>
                  <span class="info_top_item_content">{{item.description_type}}</span>
                </li> -->
                <li class="info_top_item"
                    v-for="value in item.info_list"
                    v-if="value.name !='文件行为'&&value.name !='taskID'">
                  <span class="info_top_item_title">{{value.name}}</span>
                  <span v-if="value.name=='文件大小'">
                    {{value.value | filterType }}
                  </span>
                  <span class="info_top_item_content"
                        v-if="value.name!='文件大小'"
                        :class="value.value=='点击下载'?'download_text':''">
                    <span @click="download(value,item)">{{value.value}}</span>
                  </span>
                </li>
                <!-- 沙箱检测下载 -->
                <li class="info_top_item"
                    v-for="value in item.info_list"
                    v-if="value.name =='文件行为'">
                  <span class="info_top_item_title">{{value.name}}</span>
                  <span class="info_top_item_content"
                        :class="value.value=='点击下载'?'download_text':''">
                    <span @click="download_sandbox(value,item)"> {{value.value}}</span>
                  </span>
                </li>
                <!-- 新添加 -->
                <div class="info_top_item"
                     v-for="value in item.sample_list"
                     v-if="item.sample_list.length!=0">
                  <span class="info_top_item_title">{{value.name}}</span>
                  <div class="info_top_item_content">
                    <p v-for="itemx in value.value"
                       style="padding-bottom: 5px;">{{itemx}}</p>
                  </div>
                </div>
                <!-- 新添加-->
              </div>
              <div class="time_right_info_bom"
                   v-if="item.whois_list.length !=0">
                <span class="info_bom_title">Whois信息</span>
                <div class="info_bom_item">
                  <div class="info_bom_item_li"
                       v-for="demo in item.whois_list">
                    <div class="left_li">{{demo.name | ip_whois}}</div>
                    <div class="right_li">{{demo.value}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p class="title">网络事件</p>
            <div class="time_right_net">
              <div class="time_right_net_item"
                   v-for="demo in item.event_list">
                <div class="title_net">{{demo.name | network_event}}</div>
                <div class="value_net">{{demo.value}}</div>
              </div>
              <div class="time_right_net_item">
                <div class="title_net">下载</div>
                <div class="value_net">
                  <img src="@/assets/images/common/download.png"
                   class="img_icon" alt="" @click.stop='download_network()'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 攻击阶段 -->
    <div class="attack_stage_box">
      <div class="detail_base_top">
        <img src="@/assets/images/emerge/detai_attack.png"
             alt=""
             class="icon_img">
        <span class="attack_stage_title">攻击阶段分布</span>
      </div>
      <div class="attack_stage_bom">
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='初始访问'?'count_color':''">初始访问</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='执行'?'count_color':''">执行</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='持久化'?'count_color':''">持久化</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='提权'?'count_color':''">提权</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='防御逃逸'?'count_color':''">防御逃逸</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='凭证访问'?'count_color':''">凭证访问</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='信息发现'?'count_color':''">信息发现</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='横向移动'?'count_color':''">横向移动</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='信息收集'?'count_color':''">信息收集</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='命令控制'?'count_color':''">命令控制</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='信息泄露'?'count_color':''">信息泄露</span>
        </div>
        <div class="stage_img_box">
          <img src="@/assets/images/emerge/detail_jiantou.png"
               alt="">
        </div>
        <div class="stage_item_box">
          <span :class="network_times_active.attack_stage_cn =='毁坏'?'count_color':''">毁坏</span>
        </div>
      </div>
    </div>
    <!-- 威胁及安全建议 -->
    <div class="suggest_box">
      <div class="suggest_top">
        <img src="@/assets/images/emerge/detal_jianyi.png"
             alt=""
             class="icon_img">
        <span class="suggest_title">威胁及安全建议</span>
      </div>
      <div class="suggest_bom">
        <p class="suggest_bom_title">威胁描述</p>
        <p class="suggest_bom_des">{{suggest_list[network_times_active.safety_suggestion].des}}</p>
        <p class="suggest_bom_title">安全建议</p>
        <p class="suggest_bom_list">
          <img src="@/assets/images/emerge/detail_suggest.png"
               class="suggest_icon"
               alt="">
          <span class="suggest_bom_title">处置建议</span>
        </p>
        <div>
          <p class="suggest_bom_li"
             v-for="item in suggest_list[network_times_active.safety_suggestion].handle">
            {{item}}
          </p>
        </div>
        <p class="suggest_bom_list">
          <img src="@/assets/images/emerge/detail_suggest.png"
               class="suggest_icon"
               alt="">
          <span class="suggest_bom_title">加固建议</span>
        </p>
        <div>
          <p class="suggest_bom_li"
             v-for="item in suggest_list[network_times_active.safety_suggestion].reinforce">
            {{item}}
          </p>
        </div>
      </div>
    </div>
    <!-- 告警列表 -->
    <div class="emerge_box">
      <el-tabs v-model="emerge_list.activeName"
               @tab-click="handleClick"
               class="reset_tab">
        <el-tab-pane label="当前受威胁资产"
                     class="tabs-item"
                     name="first">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    :data="emerge_list.now.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
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
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_now"
                         @current-change="handleCurrentChange_now"
                         :current-page="emerge_list.now.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.now.count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="历史受威胁资产"
                     class="tabs-item"
                     name="second">
          <el-table class="reset_table"
                    ref="multipleTable"
                    align="center"
                    border
                    :data="emerge_list.old.data"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
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
          <el-pagination class="pagination_box"
                         @size-change="handleSizeChange_old"
                         @current-change="handleCurrentChange_old"
                         :current-page="emerge_list.old.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="emerge_list.old.count">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑标签 -->
    <el-dialog class="add_tag pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="edit_tag.pop">
      <img src="@/assets/images/emerge/closed.png"
           @click="closed_edit_tag_box"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">编辑标签</span>
      </div>
      <div class="content">
        <div class="content_item">
          <div class="item_addrs"
               v-for="(item,index) in edit_tag.tag_list">
            <el-input class="select_box"
                      placeholder="请输入标签，最多可以设置5个标签"
                      v-model="item.name"
                      clearable>
            </el-input>
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
      </div>
      <div class="btn_box">
        <el-button @click="closed_edit_tag_box"
                   class="cancel_btn">取消</el-button>
        <el-button class="ok_btn"
                   @click="edit_tag_true">确定</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗 -->
    <!-- 添加到工单 -->
    <!--:visible.sync="worksheets_data.pop" class="pop_state_add pop_box"-->
    <el-dialog class="pop_state_add pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="add_state_change">
      <img src="@/assets/images/emerge/closed.png"
           @click="add_closed_state1"
           class="closed_img"
           alt="">
      <div class="title">
        <div class="mask"></div>
        <span class="title_name">添加到工单</span>
      </div>
      <div class="content">
        <div class="add_works">
          <el-table ref="multipleTable"
                    class="reset_table"
                    align="center"
                    border
                    :data="table_add_works.tableData"
                    tooltip-effect="dark"
                    @selection-change="handle_sel_table_add_works"
                    style="width: 100%">
            <!--<el-table-column label="选择"
                             width="55">
              <template slot-scope="scope">
                <el-radio v-model="worksheets_data.tableRadio"
                          :label="scope.row">
                  <i></i>
                </el-radio>
              </template>

            </el-table-column>-->
            <el-table-column label="选择"
                             align="center"
                             width="50"></el-table-column>
            <el-table-column type="selection"
                             align="center"
                             width="50"></el-table-column>
            <el-table-column prop="name"
                             label="工单名称"
                             align="center"
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
              <template slot-scope="scope">{{ scope.row.priority | priority}}</template>
            </el-table-column>
            <!--<el-table-column prop="perator_cn"
                             label="经办人"
                             show-overflow-tooltip>
            </el-table-column>-->
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
          <el-pagination class="pagination_box"
                         @size-change="sc_table_add_works"
                         @current-change="hcc_table_add_works"
                         :current-page="table_add_works.pageNow"
                         :page-sizes="[10,20,50,100]"
                         :page-size="table_add_works.eachPage"
                         layout="total, sizes, prev, pager, next"
                         :total="table_add_works.count">
          </el-pagination>
        </div>
      </div>
      <div class="btn_box">
        <el-button @click="add_closed_state1"
                   class="cancel_btn">取消</el-button>
        <el-button @click="add_ok_state"
                   class="ok_btn">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹窗 -->
    <!-- 新建工单任务 -->
    <el-dialog class="task_new_box pop_box"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :visible.sync="new_worksheets_data.pop">
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
                :class="new_worksheets_data.new_contet?'step_now':'step_past'">基本信息</span>
          <img src="@/assets/images/emerge/selected01.png"
               class="selected_img"
               alt="">
        </div>
        <div class="step_box2">
          <span class="step2_span"
                :class="!new_worksheets_data.new_contet?'step_now':'step_past'">处置内容</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="task_new_content"
           v-if="new_worksheets_data.new_contet">
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
                          v-model="new_worksheets_list.name"
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
                           v-model="new_worksheets_list.operator"
                           clearable
                           placeholder="请选择经办人">
                  <el-option v-for="item in new_worksheets_data.operator_list"
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
                           v-model="new_worksheets_list.level"
                           clearable
                           placeholder="请选择优先级">
                  <el-option v-for="item in new_worksheets_data.level_list"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li class="right_item">
                <el-checkbox-group v-model="new_worksheets_list.notice">
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
                      v-model="new_worksheets_list.textarea">
            </el-input>
          </div>
          <div class="content_table">
            <el-table :data="new_worksheets_data.table_operator.tableData"
                      class="reset_table"
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
          <el-button @click="next_task"
                     class="next_btn">下一步</el-button>
        </div>
      </div>

      <!-- 处置内容 -->
      <div class="task_handle_content"
           v-if="!new_worksheets_data.new_contet">
        <div class="task_content_box">
          <div class='table_box'>
            <div>
              <div>
                <el-table align="center"
                          class="reset_table"
                          border
                          :data="new_worksheets_data.network_detail"
                          @selection-change="select_alert_new"
                          tooltip-effect="dark"
                          style="width: 100%">
                  <el-table-column prop="category"
                                   align="center"
                                   label="告警类型"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="indicator"
                                   align="center"
                                   label="威胁指标"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="src_ip"
                                   align="center"
                                   label="源地址"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="dest_ip"
                                   align="center"
                                   label="目的地址"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="application"
                                   align="center"
                                   label="应用"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="威胁等级"
                                   align="center"
                                   width="100"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span class="btn_alert_background"
                            :class="{'high_background':scope.row.degree =='high','mid_background':scope.row.degree =='medium','low_background':scope.row.degree =='low'}">
                        {{ scope.row.degree | degree }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="失陷确定性"
                                   align="center"
                                   width="120"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span :class="{'fall_certainty':scope.row.fall_certainty == '1'}">
                        {{ scope.row.fall_certainty | certainty }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态"
                                   align="center"
                                   width="80">
                    <template slot-scope="scope">{{ scope.row.status | work_status }}</template>
                  </el-table-column>
                </el-table>
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
  </div>
</template>

<script type="text/ecmascript-6">
import backTitle from "@/components/common/back-title";
export default {
  name: "detail-network",
  data () {
    return {
      dropCol: [],
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
      loading: false,
      network_work_order: {
        work_name: '',
        workorder_id: '',
        work_order_status: '',
      },
      network_times_active: {
        alert_description: {}
      },
      attack_stage_list: [
        {
          name: "Initial Access",
          value: "初始访问",
          count: 0
        },
        {
          name: "Execution",
          value: "执行",
          count: 0
        },
        {
          name: "Persistence",
          value: "持久化",
          count: 0
        },
        {
          name: "Privilege Escalation",
          value: "提权",
          count: 0
        },
        {
          name: "Defense Evasion",
          value: "防御逃逸",
          count: 0
        },
        {
          name: "Credential Access",
          value: "凭证访问",
          count: 0
        },
        {
          name: "Discovery",
          value: "信息发现",
          count: 0
        },
        {
          name: "Lateral Movement",
          value: "横向移动",
          count: 0
        },
        {
          name: "Collection",
          value: "信息收集",
          count: 0
        },
        {
          name: "Command and Control",
          value: "命令控制",
          count: 0
        },
        {
          name: "Exfiltration",
          value: "信息泄露",
          count: 0
        },
        {
          name: "Impact",
          value: "毁坏",
          count: 0
        },
      ],
      suggest_list: [
        {
          name: '',
          des: '',
          handle: [],
          reinforce: [],
        },
        {
          name: '恶意文件通讯	',
          des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '广告软件	Adware',
          des: '广告软件是危险性相对较低的恶意软件，但可能会导致更大的威胁发生，所以也需要及时清除。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '危险工具	graytool',
          des: '危险工具有可能被管理员或者是内部的安全工具所使用，但大部分情况是网络失陷的标志。这些工具有可能用于扫描、信息收集或者是控制，需要看具体工具确定攻击目的。',
          handle: [
            '1、确认是否是管理员或者是安全工具的合法使用；',
            '2、如果不是，需要根据威胁指标的提示做相应的处置。',
          ],
          reinforce: [
            '根据实际使用的危险工具做具体的加固。'
          ],
        },
        {
          name: '漏洞利用	Exploit',
          des: '攻击者利用机器上所装应用或者服务的漏洞进行漏洞利用攻击。在网络流量中检测到这种漏洞利用行为并不一定代表被攻击机器中漏洞利用的成功。',
          handle: [
            '1、在被攻击机器上确认漏洞利用是否成功；',
            '2、如果漏洞利用成功， 隔离该机器并做安全分析',
          ],
          reinforce: [
            '1、对Web应用程序采用WAF减小攻击面；',
            '2、关闭机器上不必要的服务，采用Windows EMET等技术防止漏洞利用；',
            '3、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
            '4、做好网络划分，增加横向移动难度；',
            '5、利用威胁情报以及定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
          ],
        },
        {
          name: '其他	Others',
          des: '无',
          handle: ['无'],
          reinforce: ['无'],
        },
        {
          name: 'EICAR	eicar',
          des: 'EICAR是一个用于测试的不具有危害的但防病毒软件会告警的程序。',
          handle: ['不需要处置。'],
          reinforce: ['无'],
        },
        {
          name: 'SQL注入	sqlinjection',
          des: 'SQL注入是攻击者利用数据库设计、开发、缺乏校验等漏洞而导致应用做非设计本意的行为。',
          handle: [
            '1、根据SQL注入脚本确认注入是否成功；',
            '2、由于SQL注入漏洞的不同，注入可以导致不同的结果。根据具体注入脚本的行为做处置。',
          ],
          reinforce: [
            '1、采用WAF等安全设备减小攻击面；',
            '2、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
            '3、定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
          ],
        },
        {
          name: '暴力破解	BruteForce',
          des: '攻击者采用大量的猜测的账号和密码组合或者是少量的符合网络密码策略的常用密码(password spraying)尝试登录网络，一旦登录成功，就是合法账号登录，极难再被检测到。常见的被暴力破解攻击的服务包括：SSH (22/TCP)、Telnet (23/TCP)、FTP (21/TCP)、NetBIOS / SMB / Samba (139/TCP & 445/TCP)、LDAP (389/TCP)、Kerberos (88/TCP)、RDP / Terminal Services (3389/TCP)、HTTP/HTTP Management Services (80/TCP & 443/TCP)、MSSQL (1433/TCP)、Oracle (1521/TCP)、MySQL (3306/TCP)、VNC (5900/TCP)。',
          handle: [
            '1、查看被攻击机器的系统登录日志确认是否暴力破解登录成功。如果成功，修改该账号密码；',
            '2、如果是外部威胁，在安全网关上阻止该攻击地址。',
          ],
          reinforce: [
            '1、采用合适的账号锁定策略，在一定数量的失败登录后锁定账号。但这个策略不能制定太严格，避免在攻击的时候造成被攻击的大量账号全部被锁定。对于关键应用，在一定数量的失败登录后要求格外的验证可以有效解决这个问题；',
            '2、采用多因素认证；',
            '3、参考NIST密码策略制定网络密码策略。'
          ],
        },
        {
          name: 'WebShell	WebShell',
          des: 'Web Shell是利用失窃账号或者漏洞而放置在Web服务器上用来和攻击者交互的入口。',
          handle: [
            '1、确认是否成功，如果成功，隔离机器并做清除、扫描和安全分析；',
            '2、重点关注是否有横向移动的痕迹。',
          ],
          reinforce: [
            '1、根据根因分析结果打补丁或者修改账号密码；',
            '2、管理Web服务器的账号需要和内网的账号做区分。',
          ],
        },
        {
          name: "扫描	Scan",
          des: '攻击者通过扫描发现运行在机器上的服务，包括可能存在漏洞的服务。 ',
          handle: [
            '无',
          ],
          reinforce: [
            '1、及时打重大漏洞补丁；',
            '2、禁用不需要的服务；',
            '3、对关键服务，创建访问列表防止未知机器的访问甚至限制远程访问。',
          ],
        },
        {
          name: "恶意程序	malwarefile",
          des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
            '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
            '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
            '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
          ],
        },
        {
          name: "恶意地址	malware",
          des: '机器访问了带有恶意程序的地址。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个恶意地址；',
            '2、安装防病毒软件并且更新到最新做全盘查杀。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训提升安全意识。',
          ],
        },
        {
          name: "tor出口节点	tor_exit_node",
          des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用Tor；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止Tor节点地址。',
          ],
        },
        {
          name: "tor入口节点	tor_node",
          des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用Tor；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止Tor节点地址。',
          ],
        },
        {
          name: "垃圾邮件	spam ",
          des: '垃圾邮件本身不具有安全威胁，是不想在网络里出现的信息。',
          handle: [
            '无',
          ],
          reinforce: [
            '通过网络安全设备阻止垃圾邮件地址。',
          ],
        },
        {
          name: '僵尸网络C&C	botc&c ',
          des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: '移动恶意软件	mobilemalware',
          des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
          handle: [
            '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
            '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
            '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
            '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
          ],
        },
        {
          name: '网络诈骗	fraud',
          des: '通过社交工程等手段引诱用户上当。',
          handle: [
            '1、如果存在金钱损失等情况应及时做相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截网络诈骗地址；',
            '2、用户通过安全意识培训识别社交工程等手段。',
          ],
        },
        {
          name: '恶意重定向	maliciousredirect',
          des: '通过重定向把用户引入恶意地址。',
          handle: [
            '1、如果存在恶意感染、信息泄露等情况应及时做相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截恶意重定向地址；',
            '2、用户通过安全意识培训提升安全意识。',
          ],
        },
        {
          name: '网络代理	proxy',
          des: '攻击者用网络代理隐藏攻击来源和加密通讯通道，但也存在部分用户用网络代理保护隐私的情况。',
          handle: [
            '1、确认机器的使用者是否合法使用网络代理；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止网络代理地址。',
          ],
        },
        {
          name: '钓鱼网站	phishing',
          des: '通过社交工程等手段引诱用户点击某个链接、下载文档甚至可执行文件或者输入账号等信息达到窃取信息、利用浏览器漏洞或者植入恶意程序的目的。',
          handle: [
            '1、如果存在账号等信息失窃行为应及时更改账号密码和相应的应急处理；',
            '2、对机器做扫描和安全分析。',
          ],
          reinforce: [
            '1、考虑用网络安全设备拦截钓鱼地址；',
            '2、用户通过安全意识培训识别社交工程等手段。',
          ],
        },
        {
          name: '勒索软件通讯	ransomwareurl',
          des: '该地址用于下载勒索软件或者是跟勒索软件通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、如果是下载了勒索软件，及时清除该软件；',
            '3、如果被勒索软件加密，先搜索安全公司的网站看是否有解密工具。',
          ],
          reinforce: [
            '1、用网络安全设备阻止该地址；',
            '2、安装防病毒软件并且及时更新病毒库。',
          ],
        },
        {
          name: '已知APT攻击',
          des: '本威胁是检测到网络与曾经被APT组织使用过的地址通讯或者是相关工具出现在网络中。',
          handle: [
            '1、确认被检测的威胁指标是否还有效；',
            '2、如果确认有效，需要根据APT组织的相关情报信息做应急响应并做最高优先级处理。',
          ],
          reinforce: [
            '根据该APT组织的战术、技术和流程（TTP）做相应的安全加固。',
          ],
        },
        {
          name: '恶意证书',
          des: '机器里的程序采用恶意的ssl证书跟外界通讯。',
          handle: [
            '1、把机器从网络隔离；',
            '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
            '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
            '4、安装防病毒软件做全盘扫描。',
          ],
          reinforce: [
            '1、提升端点安全能力；',
            '2、用网络安全设备禁止不需要联网的设备联网；',
            '3、用网络威胁检测工具及早发现外联威胁。',
          ],
        },
        {
          name: 'VPN地址',
          des: 'VPN地址是公共VPN服务商的VPN服务器地址，攻击者利用VPN绕过企业的安全策略，但也存在少量的合法使用公共VPN的情形。',
          handle: [
            '1、确认机器的使用者是否合法使用VPN；',
            '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个地址，从而做相应的处置。',
          ],
          reinforce: [
            '1、安装防病毒软件并且及时更新病毒库；',
            '2、考虑用网络安全设备阻止该公共VPN地址。',
          ],
        },

      ],
      // attack_stage
      network_detail: {
        attack_stage_cn: '',
        label_obj: [],
        src_label_obj: [],
        dest_label_obj: [],
      },
      title_name: "告警详情",
      network_times: [],
      network_list: {
        new_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
        old_list: {
          handle: {
            page: 1,
            rows: 10
          }
        },
      },
      time_choose: 0,
      emerge_list: {
        title: ["当前告警资产", "历史告警资产"],
        activeName: "first",
        choose: 0,
        now_data: {
          page: 1,
          rows: 10
        },
        old_data: {
          page: 1,
          rows: 10
        },
        now: {},
        old: {}
      },
      src_active_ul: false,
      edit_tag: {
        tag_list: [
        ],
        pop: false
      },
      //添加到工单
      worksheets_data: {
        page: 1,
        rows: 10,
        pop: false,
        tableRadio: {},
        level_list: [
          {
            value: "highest",
            label: "极高"
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
        status_type: [
          '无', '待分配', '已分配', '处置中', '已取消', '已处置'
        ]
      },
      worksheets_list: {},
      // 新建工单
      new_worksheets_list: {
        name: "",
        level: "",
        operator: "",
        new_operator: [],
        notice: ['email'],
        textarea: "",
        multiple: [],
        select_list: []
      },
      new_worksheets_data: {
        pop: false,
        new_contet: true,
        operator_list: [],
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
        //经办人数组
        table_operator: {
          tableData: [],
          tableData_new: [],
          count: 0,
          pageNow: 1,
          maxPage: 1,
          eachPage: 5
        },
        // 告警数组
        network_detail: []
      },
      //
      table_alerts: {
        tableData: [],
        count: 0,
        pageNow: 1,
        maxPage: 1,
        eachPage: 10,
        loading: true,
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
      },
      network_event:{}
    };
  },
  components: {
    backTitle
  },
  mounted () {
    this.check_passwd()
    this.get_data();

    this.column_deploy();
    // detail: val.id, type: 'risks'
    // horizontalthreat  横向威胁告警  lateral
    // externalthreat  外部威胁告警  outside
    // outreachthreat  外联威胁告警  outreath
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
          if (status != 0) {
            for (let key in msg) {
              if (key == 600) {
                this.$message(
                  {
                    message: msg[key],
                    type: 'warning',
                  }
                );
              }
              if (key == 602) {
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

    //威胁资产
    column_deploy () {
      this.$axios.get('/yiiapi/site/field-list')
        .then((resp) => {
          this.dropCol = [];
          let { status, data } = resp.data;
          if (status == 0) {
            let config = data.config.fields;
            for (var key of config) {
              this.fieldList.forEach(item => {
                if (item.alias == key) {
                  this.dropCol.push({ label: item.name, prop: item.alias })
                }
              });
            }
          }
        });
    },
    /*************************************************/
    /***************新加到工单*****************/

    //添加到工单打开
    open_add_new () {
      this.add_open_state();
    },

    //新加到工单打开状态
    add_open_state () {

      let status = this.table_alerts.tableData[0].status;

      if (status == '3' || status == '4' || status == '5') {
        this.$message({ message: '告警状态为已处置、已忽略、误报的不能添加到工单。', type: 'warning' });
      } else {
        this.add_state_change = true;
        this.get_table_works_list();
      }
    },
    //新加到工单取消状态
    add_closed_state1 () {
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
    },
    //获取列表
    get_table_works_list () {
      let workorder_list = '';
      let workorder_type = '';
      switch (this.$route.query.type) {
        case 'alert':
          workorder_list = '/yiiapi/alert/workorder-list'
          workorder_type = 'alert'
          break;
        case 'asset':
          workorder_list = '/yiiapi/asset/workorder-list'
          workorder_type = 'asset'
          break;
        case 'lateral':
          workorder_list = '/yiiapi/horizontalthreat/workorder-list'
          workorder_type = 'alert'
          break;
        case 'outside':
          workorder_list = '/yiiapi/externalthreat/workorder-list'
          workorder_type = 'alert'
          break;
        case 'outreath':
          workorder_list = '/yiiapi/outreachthreat/workorder-list'
          workorder_type = 'alert'
          break;
        default:
          break;
      }

      this.$axios.get(workorder_list, {
        params: {
          page: this.table_add_works.pageNow,
          rows: this.table_add_works.eachPage,
          type: workorder_type
        }
      }).then((resp) => {
        console.log('*************8')
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
      this.table_add_works.multipleSelection = row;
    },

    //新加到工单确定
    add_ok_state () {
      let selected_attr = this.table_alerts.tableData
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

        console.log(this.add_params)
        console.log(this.add_params.perator);
        this.loading = true;


        var add_workorder = ''
        // horizontalthreat  横向威胁告警  lateral
        // externalthreat  外部威胁告警  outside
        // outreachthreat  外联威胁告警  outreath
        switch (this.$route.query.type) {
          case 'alert':
            add_workorder = '/yiiapi/alert/add-workorder'
            break;
          case 'asset':
            add_workorder = '/yiiapi/asset/add-workorder'
            break;
          case 'lateral':
            add_workorder = '/yiiapi/horizontalthreat/add-workorder'
            break;
          case 'outside':
            add_workorder = '/yiiapi/externalthreat/add-workorder'
            break;
          case 'outreath':
            add_workorder = '/yiiapi/outreachthreat/add-workorder'
            break;
          default:
            break;
        }

        this.$axios.post(add_workorder,
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
            this.loading = false;
            let { status, msg, data } = resp.data;
            if (status == 0) {
              this.$message.success('添加成功');
              //清空状态
              this.add_closed_state1();
              this.get_data();
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

    /*********************************************/
    // ^[0-9]*$
    // _-.@
    get_rex (str) {
      var pattern = (/[\u4e00-\u9fa5]| /)
      return pattern.test(str)
    },
    // 获取数据
    get_data () {
      this.loading = true
     // console.log(this.$route.query.detail);
      var url = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          url = '/yiiapi/alert/alert-details'
          break;
        case 'asset':
          url = '/yiiapi/asset/alert-details'
          break;
        case 'lateral':
          url = '/yiiapi/horizontalthreat/alert-details'
          break;
        case 'outside':
          url = '/yiiapi/externalthreat/alert-details'
          break;
        case 'outreath':
          url = '/yiiapi/outreachthreat/alert-details'
          break;
        default:
          break;
      }

      this.$axios.get(url, {
        params: {
          id: this.$route.query.detail
        }
      })
        .then(response => {

          this.network_event = response.data.data.network_event;
          //console.log(this.network_event);

          this.loading = false;
          let attr = [];
          attr.push(response.data.data);
          this.table_alerts.tableData = attr;
          this.network_detail = response.data.data
          this.network_detail.attack_stage_cn = ''
          if (JSON.parse(this.network_detail.src_label).length == 0) {
            this.network_detail.src_label_obj = []
          } else {
            this.network_detail.src_label_obj = JSON.parse(this.network_detail.src_label)
          }
          if (JSON.parse(this.network_detail.dest_label).length == 0) {
            this.network_detail.dest_label_obj = []
          } else {
            this.network_detail.dest_label_obj = JSON.parse(this.network_detail.dest_label)
          }
          var workorders = ''
          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          switch (this.$route.query.type) {
            case 'alert':
              workorders = '/yiiapi/alert/workorders'
              break;
            case 'asset':
              workorders = '/yiiapi/asset/workorders'
              break;
            case 'lateral':
              workorders = '/yiiapi/horizontalthreat/workorders'
              break;
            case 'outside':
              workorders = '/yiiapi/externalthreat/workorders'
              break;
            case 'outreath':
              workorders = '/yiiapi/outreachthreat/workorders'
              break;
            default:
              break;
          }
          // 获取当前告警的工单状态
          this.$axios.get(workorders, {
            params: {
              id: this.$route.query.detail
            }
          })
            .then(response => {
             // console.log(response.data);
              this.$nextTick(() => {
              //  console.log(response.data);
                this.network_work_order.workorder_id = response.data.data.workorder_id
                if (response.data.data.workorder_id == '0') {
                  this.network_work_order.work_order_status = '未关联工单'
                  this.network_work_order.work_name = ''
                } else {
                  if (response.data.data.workorder_status && response.data.data.workorder_name) {
                    switch (response.data.data.workorder_status += '') {
                      case '0':
                        this.network_work_order.work_order_status = '待分配'
                        break;
                      case '1':
                        this.network_work_order.work_order_status = '已分配';
                        break;
                      case '2':
                        this.network_work_order.work_order_status = '处置中';
                        break;
                      case '3':
                        this.network_work_order.work_order_status = '已处置';
                        break;
                      case '4':
                        this.network_work_order.work_order_status = '已取消';
                        break;
                      default:
                        break;
                    }
                    this.network_work_order.work_name = response.data.data.workorder_name
                  } else {
                    this.network_work_order.work_order_status = ''
                    this.network_work_order.work_name = ''
                  }
                }
              })
            })
            .catch(error => {
              console.log(error);
            })
          this.network_times = [];
          this.network_times.push(this.network_detail)
          if (this.network_detail.alarm_merger.length != 0) {
            this.network_detail.alarm_merger.forEach(item => {
              item.attack_stage_cn = ''
              this.network_times.push(item)
            });
          }
          // console.log(this.network_times);
          // 匹配告警类型
          this.network_times.forEach(item => {
         //   console.log(item);
            if (!item.label) {
              item.label_obj = []
            } else {
              item.label_obj = item.label
            }
            item.info_list = []
            item.whois_list = [];
            item.event_list = [];
            if (item.alert_description.whois) {
              for (let key in item.alert_description.whois) {
                item.whois_list.push({
                  name: key,
                  value: item.alert_description.whois[key],
                })
              }
            } else if (item.alert_description.ip_whois) {
              for (let key in item.alert_description.ip_whois) {
                item.whois_list.push({
                  name: key,
                  value: item.alert_description.ip_whois[key],
                })
              }
            }
            // 情报类型匹配
            switch (item.description_type) {
              case 'BotnetCAndCURL':
                item.sample_list = [];
                if (item.alert_description.files) {
                  item.files_md5_cn = [];
                  item.alert_description.files.forEach(element => {
                    item.files_md5_cn.push(element.MD5);
                  });
                  item.sample_list.push({
                    name: "僵尸样本信息",
                    value: item.files_md5_cn,
                  });
                }
                if (item.alert_description.urls) {
                  item.urls_list = [];
                  item.alert_description.urls.forEach(element => {
                    item.urls_list.push(element.url);
                  });
                  item.sample_list.push({
                    name: "僵尸样本下载URL",
                    value: item.urls_list,
                  });
                }
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                ];
              case 'RansomwareURL':
                item.sample_list = [];
                if (item.alert_description.files) {
                  item.files_md5_cn = [];
                  item.alert_description.files.forEach(element => {
                    item.files_md5_cn.push(element.MD5);
                  });
                  item.sample_list.push({
                    name: "僵尸样本信息",
                    value: item.files_md5_cn,
                  });
                }
                if (item.alert_description.urls) {
                  item.urls_list = [];
                  item.alert_description.urls.forEach(element => {
                    item.urls_list.push(element.url);
                  });
                  item.sample_list.push({
                    name: "僵尸样本下载URL",
                    value: item.urls_list,
                  });
                }
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: 'IP',
                    value: item.alert_description.IP
                  },
                ];
                break;
              case 'IPReputation':
                item.sample_list = [];
                if (item.alert_description.files) {
                  item.files_md5_cn = [];
                  item.alert_description.files.forEach(element => {
                    item.files_md5_cn.push(element.MD5);
                  });
                  item.sample_list.push({
                    name: "相关联恶意文件",
                    value: item.files_md5_cn,
                  });
                }
                item.info_list = [
                  {
                    name: 'IP',
                    value: item.alert_description.ip
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: '主要受影响地区',
                    value: item.alert_description.geo
                  },
                  {
                    name: '相关联域名',
                    value: item.alert_description.domains
                  },
                ];
                break;
              case 'MaliciousHash':
                item.sample_list = [];
                if (item.alert_description.urls) {
                  item.urls_cn = [];
                  item.alert_description.urls.forEach(element => {
                    item.urls_cn.push(element.url);
                  });
                  item.sample_list.push({
                    name: "样本下载URL",
                    value: item.urls_cn,
                  });
                }

                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.file_type
                  },
                  {
                    name: '常见文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "样本下载IP地址",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MaliciousURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "相关联恶意文件",
                    value: item.alert_description.file,
                  },
                ];
                break;
              case 'PhishingURL':
                item.info_list = [
                  {
                    name: 'URL',
                    value: item.alert_description.mask
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                  {
                    name: "被钓鱼IP",
                    value: item.alert_description.IP,
                  },
                ];
                break;
              case 'MobileMaliciousHash':
                item.info_list = [
                  {
                    name: 'MD5',
                    value: item.alert_description.MD5
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.SHA256
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '威胁细分',
                    value: item.alert_description.threat
                  },
                  {
                    name: '全球首次发现时间',
                    value: item.alert_description.first_seen
                  },
                  {
                    name: '流行度',
                    value: item.alert_description.popularity
                  },
                  {
                    name: "主要受影响地区",
                    value: item.alert_description.geo,
                  },
                ];
                break;
              case 'sdk':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.file_name
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.file_size
                  },
                  {
                    name: '文件哈希值',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SDK检测威胁',
                    value: item.alert_description.threat
                  },
                ];

                if (item.alert_description.category == '恶意程序') {
                  item.info_list.push({
                    name: "文件下载",
                    value: '点击下载',
                    md5: item.alert_description.md5
                  })
                }
                break;
              case 'sandbox':
                item.info_list = [
                  {
                    name: '威胁类型',
                    value: item.alert_description.category
                  },
                  {
                    name: '文件名',
                    value: item.alert_description.filename
                  },
                  {
                    name: '文件大小',
                    value: item.alert_description.size
                  },
                  {
                    name: '文件类型',
                    value: item.alert_description.type
                  },
                  {
                    name: 'MD5',
                    value: item.alert_description.md5
                  },
                  {
                    name: 'SHA1',
                    value: item.alert_description.sha1
                  },
                  {
                    name: 'SHA256',
                    value: item.alert_description.sha256
                  },
                  {
                    name: 'taskID',
                    value: item.alert_description.taskID
                  },
                ];
                item.info_list.forEach(element => {
                  if (element.name == 'taskID' && element.value) {
                    item.info_list.push({
                      name: '文件行为',
                      value: '点击下载',
                      taskID: element.value,
                      MD5: item.alert_description.md5
                    })
                  }
                });

                if (item.alert_description.category == '恶意程序') {
                  item.info_list.push({
                    name: "文件下载",
                    value: '点击下载',
                    md5: item.alert_description.md5
                  })
                }
                break;
              case 'yara':
                item.info_list = [
                  {
                    name: "文件名",
                    value: item.alert_description.file_name,
                  },
                  {
                    name: "文件大小",
                    value: item.alert_description.file_size,
                  },
                  {
                    name: "文件哈希值",
                    value: item.alert_description.md5,
                  },
                  {
                    name: "Yara规则名称",
                    value: item.alert_description.rule_name,
                  },
                ];
                if (item.alert_description.category == '恶意程序') {
                  item.info_list.push({
                    name: "文件下载",
                    value: '点击下载',
                    md5: item.alert_description.md5
                  })
                }
                break;
              case 'IDS':
                item.info_list = [
                  {
                    name: "告警类型",
                    value: item.alert_description.category,
                  },
                  {
                    name: "告警描述",
                    value: item.alert_description.threat,
                  },
                  {
                    name: "PayLoad信息",
                    value: "点击下载",
                  },
                ];
                break;
              default:
                break;
            }
            // 网络事件匹配
            switch (item.network_event.event_type) {
              case 'fileinfo':
                switch (item.network_event.app_proto) {
                  case 'smtp':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'smtp' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  case 'ftp-data':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'FTP' },
                    ]
                    break;
                  case 'imap':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'imap' },
                    ]
                    break;
                  case 'pop3':
                    if (item.network_event.email.to.length > 1) {
                      item.network_event.email_to = item.network_event.email.to.join(
                        ","
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Mail_from', value: item.network_event.email.from },
                      { name: 'Recpt_to', value: item.network_event.email_to },
                      { name: 'Traffic', value: 'pop3' },
                    ]
                    break;
                  case 'smb':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Domain', value: '-' },
                      { name: 'User', value: '-' },
                      { name: 'Traffic', value: 'smb' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break;
              case 'flow':
                switch (item.network_event.app_proto) {
                  case 'ftp':
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'User', value: item.network_event.user },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
                break
              case 'smb':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Domain', value: '-' },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'ssh':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Tool', value: item.network_event.ssh.client.software_version },
                  { name: 'User', value: '-' },
                  { name: 'Traffic', value: item.network_event.event_type },
                ]
                break
              case 'tls':
                if (item.network_event.tls.subject) {
                  item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                    item.network_event.tls.subject.indexOf("CN=") + 3
                  );
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.tls.sni },
                  { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                  { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                  { name: 'Notafter', value: item.network_event.tls.notafter },
                  { name: 'Traffic', value: 'https' },
                ]
                break
              case 'dns':
                if (item.network_event.dns.grouped) {
                  item.network_event.dns.HostAddr = item.network_event.dns.grouped.join(
                    ","
                  );
                }
                if (item.network_event.dns.answers) {
                  item.network_event.dns.answers.forEach(element => {
                    if (item.network_event.dns.rrname == element.rrname) {
                      item.network_event.dns.ttl = element.ttl;
                      item.network_event.dns.rrtype = element.rrtype;
                    }
                  });
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'SectianType', value: item.network_event.dns.rrtype },
                  { name: 'Domain', value: item.network_event.dns.rrname },
                  { name: 'TTL', value: item.network_event.dns.HostAddr },
                  { name: 'Traffic', value: 'dns' },
                ]
                break
              case 'krb5':
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Msg_type', value: item.network_event.krb5.msg_type },
                  { name: 'Cname', value: item.network_event.krb5.cname },
                  { name: 'Realm', value: item.network_event.krb5.realm },
                  { name: 'Sname', value: item.network_event.krb5.sname },
                  { name: 'Traffic', value: 'krb5' },
                ]
                break
              case 'http':
                item.event_list = [
                  { name: 'Method', value: item.network_event.http.http_method },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'URL', value: item.network_event.http.url },
                  { name: 'User Agent', value: item.network_event.http.http_user_agent },
                  { name: 'Referrer', value: item.network_event.http.http_refer },
                  { name: 'Traffic', value: 'http' },
                ]
                break
              case 'alert':
                switch (item.network_event.app_proto) {
                  case 'tls':
                    if (item.network_event.tls.subject) {
                      item.network_event.tls.Authorizing = item.network_event.tls.subject.substring(
                        item.network_event.tls.subject.indexOf("CN=") + 3
                      );
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.tls.sni },
                      { name: 'Issuerdn', value: item.network_event.tls.issuerdn },
                      { name: 'Authorizing', value: item.network_event.tls.Authorizing },
                      { name: 'Notafter', value: item.network_event.tls.notafter },
                      { name: 'Traffic', value: 'https' },
                    ]
                    break;
                  case 'http':
                    item.event_list = [
                      { name: 'Method', value: item.network_event.http.http_method },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'URL', value: item.network_event.http.url },
                      { name: 'User Agent', value: item.network_event.http.http_user_agent },
                      { name: 'Referrer', value: item.network_event.http.http_refer },
                      { name: 'Traffic', value: 'http' },
                    ]
                    break;
                  default:
                    if (!item.network_event.app_proto) {
                      item.network_event.app_proto = item.network_event.proto
                    } else if (item.network_event.app_proto == 'failed') {
                      item.network_event.app_proto = ''
                    }
                    item.event_list = [
                      { name: 'Time', value: item.network_event.timestamp },
                      { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                      { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                      { name: 'Traffic', value: item.network_event.app_proto },
                    ]
                    break;
                }
              default:
                if (!item.network_event.app_proto) {
                  item.network_event.app_proto = item.network_event.proto
                } else if (item.network_event.app_proto == 'failed') {
                  item.network_event.app_proto = ''
                }
                item.event_list = [
                  { name: 'Time', value: item.network_event.timestamp },
                  { name: 'Source IP', value: item.network_event.src_ip + ':' + item.network_event.src_port },
                  { name: 'Destination IP', value: item.network_event.dest_ip + ':' + item.network_event.dest_port },
                  { name: 'Traffic', value: item.network_event.app_proto },
                ]
                break;
                break;
            }

          });


          // 攻击阶段
          this.attack_stage_list.forEach(element => {
            element.count = 0;
            if (this.network_detail.attack_stage == element.name) {
              this.network_detail.attack_stage_cn = element.value
            }
          });
          this.network_times.forEach(item => {
            this.attack_stage_list.forEach(element => {
              if (item.attack_stage == element.name) {
                item.attack_stage_cn = element.value
                element.count = 0;
              }
            });
          });
          this.network_times_active = this.network_times[0]
         // console.log(this.network_times_active);
          this.new_list(this.network_times_active.indicator);
          this.old_list(this.network_times_active.indicator);
          // this.network_times.push(item_obj)
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 跳转到工单详情
    Goto_workorder () {
      switch (this.$route.query.type) {
        case 'alert':
          this.$router.push({ path: "/detail/works", query: { id: this.network_work_order.workorder_id, type: 'alert_detail' } });
          break;
        case 'asset':
          this.$router.push({ path: "/detail/works", query: { id: this.network_work_order.workorder_id, type: 'asset' } });
          break;
        case 'lateral':
          this.$router.push({ path: "/detail/works", query: { id: this.network_work_order.workorder_id, type: 'lateral' } });
          break;
        case 'outside':
          this.$router.push({ path: "/detail/works", query: { id: this.network_work_order.workorder_id, type: 'outside' } });
          break;
        case 'outreath':
          this.$router.push({ path: "/detail/works", query: { id: this.network_work_order.workorder_id, type: 'outreath' } });
          break;
        default:
          break;
      }

    },
    // 网络事件下载
    download_network(){

      console.log(this.network_event)
      var funDownload = function (content, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        // 字符内容转变成blob地址
        var blob = new Blob([JSON.stringify(content)]);
        //eleLink.href = URL.createObjectURL(blob);
        eleLink.href = window.URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      };
      funDownload(this.network_event, "网络事件.log");
    },
    // 下载payload
    download (value, item) {
      if (value.value == "点击下载" && value.name == "PayLoad信息") {
        this.$axios.get('/yiiapi/site/check-auth-exist', {
          params: {
            pathInfo: 'yararule/download',
          }
        })
          .then(response => {
            var funDownload = function (content, filename) {
              // 创建隐藏的可下载链接
              var eleLink = document.createElement("a");
              eleLink.download = filename;
              eleLink.style.display = "none";
              // 字符内容转变成blob地址
              var blob = new Blob([content]);
              eleLink.href = URL.createObjectURL(blob);
              // 触发点击
              document.body.appendChild(eleLink);
              eleLink.click();
              // 然后移除
              document.body.removeChild(eleLink);
            };
            funDownload(item.network_event.payload, "payload.dat");
          })
          .catch(error => {
            console.log(error);
          })

      }
      if (value.value == "点击下载" && value.name == '文件下载') {
        this.$axios.get('/yiiapi/site/check-auth-exist', {
          params: {
            pathInfo: 'yararule/download',
          }
        })
          .then(response => {
            var window_open = ''
            // horizontalthreat  横向威胁告警  lateral
            // externalthreat  外部威胁告警  outside
            // outreachthreat  外联威胁告警  outreath
            switch (this.$route.query.type) {
              case 'alert':
                window_open = '/yiiapi/alert/get-file?md5='
                break;
              case 'asset':
                window_open = '/yiiapi/asset/get-file?md5='
                break;
              case 'lateral':
                window_open = '/yiiapi/horizontalthreat/get-file?md5='
                break;
              case 'outside':
                window_open = '/yiiapi/externalthreat/get-file?md5='
                break;
              case 'outreath':
                window_open = '/yiiapi/outreachthreat/get-file?md5='
                break;
              default:
                break;
            }
            window.open(window_open + value.md5);
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    download_sandbox (value, item) {
      this.$axios.get('/yiiapi/site/check-auth-exist', {
        params: {
          pathInfo: 'yararule/download',
        }
      })
        .then(response => {
          var window_open = ''
          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          switch (this.$route.query.type) {
            case 'alert':
              window_open = '/yiiapi/alert/get-signature?md5='
              break;
            case 'asset':
              window_open = '/yiiapi/asset/get-signature?md5='
              break;
            case 'lateral':
              window_open = '/yiiapi/horizontalthreat/get-signature?md5='
              break;
            case 'outside':
              window_open = '/yiiapi/externalthreat/get-signature?md5='
              break;
            case 'outreath':
              window_open = '/yiiapi/outreachthreat/get-signature?md5='
              break;
            default:
              break;
          }
          window.open(window_open + value.MD5 + '&id=' + value.taskID);
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 当前受威胁资产
    new_list (indicator) {
      var new_list = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          new_list = '/yiiapi/alert/get-same-indicator-alert'
          break;
        case 'asset':
          new_list = '/yiiapi/asset/get-same-indicator-alert'
          break;
        case 'lateral':
          new_list = '/yiiapi/horizontalthreat/get-same-indicator-alert'
          break;
        case 'outside':
          new_list = '/yiiapi/externalthreat/get-same-indicator-alert'
          break;
        case 'outreath':
          new_list = '/yiiapi/outreachthreat/get-same-indicator-alert'
          break;
        default:
          break;
      }
     // console.log(indicator);

      this.$axios.get(new_list, {
        params: {
          indicator: indicator,
          is_deal: 0,
          page: this.emerge_list.now_data.page,
          rows: this.emerge_list.now_data.rows,
        }
      })
        .then(response => {

          let { status, data } = response.data;
          this.emerge_list.now = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_now (val) {
      this.emerge_list.now_data.rows = val;
      this.emerge_list.now_data.page = 1;
      this.new_list(this.network_times_active.indicator);

    },
    handleCurrentChange_now (val) {
      this.emerge_list.now_data.page = val;
      this.new_list(this.network_times_active.indicator);
    },
    // 历史受威胁资产
    old_list (indicator) {
      var new_list = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          new_list = '/yiiapi/alert/get-same-indicator-alert'
          break;
        case 'asset':
          new_list = '/yiiapi/asset/get-same-indicator-alert'
          break;
        case 'lateral':
          new_list = '/yiiapi/horizontalthreat/get-same-indicator-alert'
          break;
        case 'outside':
          new_list = '/yiiapi/externalthreat/get-same-indicator-alert'
          break;
        case 'outreath':
          new_list = '/yiiapi/outreachthreat/get-same-indicator-alert'
          break;
        default:
          break;
      }
      this.$axios.get(new_list, {
        params: {
          indicator: indicator,
          is_deal: 2,
          page: this.emerge_list.old_data.page,
          rows: this.emerge_list.old_data.rows
        }
      })
        .then(response => {
          let { status, data } = response.data;
          this.emerge_list.old = data
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleSizeChange_old (val) {
      this.emerge_list.old_data.rows = val;
      this.emerge_list.old_data.page = 1;
      this.old_list(this.network_times_active.indicator);
    },
    handleCurrentChange_old (val) {
      this.emerge_list.old_data.page = val;
      this.old_list(this.network_times_active.indicator);
    },
    // 状态变更
    change_state (item) {
      //console.log(item);
      var id_list = []
      id_list.push(this.$route.query.detail)

      var alarm = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          alarm = '/yiiapi/alert/do-alarm'
          break;
        case 'asset':
          alarm = '/yiiapi/asset/do-alarm'
          break;
        case 'lateral':
          alarm = '/yiiapi/horizontalthreat/do-alarm'
          break;
        case 'outside':
          alarm = '/yiiapi/externalthreat/do-alarm'
          break;
        case 'outreath':
          alarm = '/yiiapi/outreachthreat/do-alarm'
          break;
        default:
          break;
      }
      this.$axios.put(alarm, {
        id: id_list,
        status: item
      })
        .then(response => {
          let { status, data } = response.data;
          console.log(data);
          console.log(response);
          if (status == 0) {
            this.get_data();
            this.$message(
              {
                message: '修改状态成功!',
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
    // 编辑标签
    edit_tag_box () {
      this.edit_tag.tag_list = [];
      console.log(this.network_detail.label);
      if (this.network_detail.label.length == 0) {
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.network_detail.label.forEach(element => {
          var obj = {
            name: element,
            icon: false
          }
          this.edit_tag.tag_list.push(obj)
        });
        this.edit_tag.tag_list[this.edit_tag.tag_list.length - 1].icon = true
      }
      this.edit_tag.pop = true
    },
    edit_tag_true () {
      console.log(this.edit_tag.tag_list);
      // /alert/label-edit
      var label_list = [];
      this.edit_tag.tag_list.forEach(element => {
        if (element.name != '') {
          label_list.push(element.name)
        }
      });
        var label = ''
       // horizontalthreat  横向威胁告警  lateral
       // externalthreat  外部威胁告警  outside
       // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
         case 'alert':
           label = '/yiiapi/alert/label-edit'
           break;
         case 'asset':
           label = '/yiiapi/asset/label-edit'
           break;
         case 'lateral':
           label = '/yiiapi/horizontalthreat/label-edit'
           break;
         case 'outside':
           label = '/yiiapi/externalthreat/label-edit'
           break;
         case 'outreath':
           label = '/yiiapi/outreachthreat/label-edit'
           break;
         default:
           break;
       }

      /* this.$axios.put(label, {
         id: this.$route.query.detail,
         label: label_list
       })*/

      //ycl 2020/11/04
     // var label = '/yiiapi/site/label-edit';

      this.$axios.put(label, {
        id: this.$route.query.detail,
        label_name: label_list
      })
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.$message(
              {
                message: '修改标签成功!',
                type: 'success',
              }
            );
            this.edit_tag.pop = false;
            this.get_data()
          } else {
            this.$message(
              {
                message: data.msg,
                type: 'error',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })



    },
    closed_edit_tag_box () {
      this.edit_tag.pop = false
    },
    //  添加标签
    add_tag () {
      if (this.edit_tag.tag_list.length < 5) {
        this.edit_tag.tag_list.forEach(item => {
          item.icon = false;
        });
        this.edit_tag.tag_list.push({ name: '', icon: true })
      } else {
        this.$message.warning(
          {
            message: '最多可以设置5个标签。',
            offset: 50
          })
      }
    },
    del_tag (item, index) {
      this.edit_tag.tag_list.splice(index, 1);
    },

    // 加入外部链接
    change_state_src (item) {
      //console.log(item);
      // 只能是1和2；动态类型，1Ip，2url
      // 选择“威胁追查“后就直接跳到威胁调查页面的IP/URL通讯调查页面，把该IP地址作为搜索条件得出搜索结果。
      if (item == '1') {
        // var label = ''
        // if (this.$route.query.type == 'alert') {
        //   label = '/yiiapi/alert/label-edit'
        // } else if (this.$route.query.type == 'risks') {
        //   label = '/yiiapi/outreachthreat/label-edit'
        // }
        this.$router.push({ path: "/invest/url", query: { src_ip: this.network_detail.src_ip, dest_ip: '' } });

      }
      //加入外部链接
      if (item == '2') {
        this.$confirm('本地址会被加入外部动态列表，第三方设备读取后可以对本地址进行告警提示或者拦截。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var join = ''
          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          switch (this.$route.query.type) {
            case 'alert':
              join = '/yiiapi/alert/join-external-dynamics'
              break;
            case 'asset':
              join = '/yiiapi/asset/join-external-dynamics'
              break;
            case 'lateral':
              join = '/yiiapi/horizontalthreat/join-external-dynamics'
              break;
            case 'outside':
              join = '/yiiapi/externalthreat/join-external-dynamics'
              break;
            case 'outreath':
              join = '/yiiapi/outreachthreat/join-external-dynamics'
              break;
            default:
              break;
          }



          this.$axios.post(join, {
            addr: this.network_detail.src_ip,
            type: 1
          })
            .then(response => {
              let { status, data } = response.data;
              console.log(data);
              if (status == 0) {
                this.$message(
                  {
                    message: '加入外部动态列表成功!',
                    type: 'success',
                  }
                );
              } else {
                this.$message(
                  {
                    message: data.msg,
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
            message: '已取消操作'
          });
        });
      }
    },

    // 加入外部链接
    change_state_dest (item) {
      //console.log(item);
      if (item == '1') {



        this.$router.push({ path: "/invest/url", query: { dest_ip: this.network_detail.dest_ip, src_ip: '' } });
      }
      //加入外部链接
      if (item == '2') {
        this.$confirm('本地址会被加入外部动态列表，第三方设备读取后可以对本地址进行告警提示或者拦截。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var join = ''

          // horizontalthreat  横向威胁告警  lateral
          // externalthreat  外部威胁告警  outside
          // outreachthreat  外联威胁告警  outreath
          switch (this.$route.query.type) {
            case 'alert':
              join = '/yiiapi/alert/join-external-dynamics'
              break;
            case 'asset':
              join = '/yiiapi/asset/join-external-dynamics'
              break;
            case 'lateral':
              join = '/yiiapi/horizontalthreat/join-external-dynamics'
              break;
            case 'outside':
              join = '/yiiapi/externalthreat/join-external-dynamics'
              break;
            case 'outreath':
              join = '/yiiapi/outreachthreat/join-external-dynamics'
              break;
            default:
              break;
          }


          this.$axios.post(join, {
            addr: this.network_detail.dest_ip,
            type: 1
          })
            .then(response => {
              let { status, data } = response.data;
              console.log(data);
              if (status == 0) {
                this.$message(
                  {
                    message: '加入外部动态列表成功!',
                    type: 'success',
                  }
                );
              } else {
                this.$message(
                  {
                    message: data.msg,
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
            message: '已取消操作'
          });
        });
      }
    },

    time_active (index) {
      this.time_choose = index;
      this.network_times_active = this.network_times[index]
      console.log(this.network_times_active);

      //2020/11/11
      var alarm_merger = this.network_times_active.alarm_merger;
      if(alarm_merger){
        this.network_event = alarm_merger[0].network_event;
      }else{
        this.network_event = this.network_times_active.network_event;
      }

    //console.info(this.network_event)
      //2020/11/11
      this.new_list(this.network_times_active.indicator);
      this.old_list(this.network_times_active.indicator);
    },
    emerge_list_active (index) {
      this.emerge_list.choose = index;
    },
    src_active () {
      console.log("111");
      this.src_active_ul = !this.src_active_ul;
    },
    src_active_item (num) {
      this.src_active_ul = false;
      console.log(num);
    },
    handleSelectionChange () { },
    handleClick (tab, event) {
     // console.log(tab);
    },
    //工单任务选择
    change_task (command) {
      if (command == "1") {


        this.new_worksheets_list.name = ''
        this.new_worksheets_list.level = ''
        this.new_worksheets_list.operator = ''
        this.new_worksheets_list.new_operator = ''
        this.new_worksheets_list.notice = ['email']
        this.new_worksheets_list.textarea = ''
        this.new_worksheets_list.multiple = []
        this.new_worksheets_list.select_list = []

        this.new_worksheets_data.operator_list = []
        this.new_worksheets_data.operator_list = []
        this.new_worksheets_data.table_operator.tableData = []
        this.new_worksheets_data.table_operator.tableData = []
        this.new_worksheets_data.table_operator.count = 0
        this.new_worksheets_data.table_operator.pageNow = 1
        this.new_worksheets_data.table_operator.maxPage = 1
        this.new_worksheets_data.table_operator.eachPage = 5
        this.new_worksheets_data.network_detail = []
        // 存在被创建工单的告警
        console.log(this.network_detail.status);

        // this.table_alerts.tableData[0].status
        if (this.network_detail.status == '3' || this.network_detail.status == '4' || this.network_detail.status == '5') {
          this.$message({ message: '告警状态为已处置、已忽略、误报的不能新建工单。', type: 'warning' });
          return false
        }
        this.get_user_list();
      } else if (command == "2") {

        this.open_add_new();
        // 添加到工单，只有告警状态 0 1
        // 告警：0新告警，1待处置，2处置中，3已处置，4已忽略，5误报
      }
    },
    // 添加到工单
    //获取工单列表
    get_worksheets_list () {
      var workorder_list = ''
      var workorder_type = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          workorder_list = '/yiiapi/alert/workorder-list'
          workorder_type = 'alert'
          break;
        case 'asset':
          workorder_list = '/yiiapi/asset/workorder-list'
          workorder_type = 'asset'
          break;
        case 'lateral':
          workorder_list = '/yiiapi/horizontalthreat/workorder-list'
          workorder_type = 'alert'
          break;
        case 'outside':
          workorder_list = '/yiiapi/externalthreat/workorder-list'
          workorder_type = 'alert'
          break;
        case 'outreath':
          workorder_list = '/yiiapi/outreachthreat/workorder-list'
          workorder_type = 'alert'
          break;
        default:
          break;
      }
      this.$axios.get(workorder_list, {
        params: {
          page: this.worksheets_data.page,
          rows: this.worksheets_data.rows,
          type: workorder_type
        }
      }).then((resp) => {
        let { status, data } = resp.data;
        console.log(data);
        console.log(status);
        if (status == 0) {
          console.log(data);
          this.worksheets_list = data
          this.worksheets_list.pageNow = data.pageNow * 1
          this.worksheets_data.pop = true;
          this.worksheets_list.data.forEach(element => {
            element.perator_cn = JSON.parse(element.perator).join(',')
            this.worksheets_data.level_list.forEach(item => {
              if (element.priority == item.value) {
                element.priority_cn = item.label
              }
            });
            this.worksheets_data.status_type.forEach((ele, index) => {
              if (element.status == index) {
                element.status_cn = this.worksheets_data.status_type[index]
              }
            });
          });
        }
      })
    },
    handleSizeChange_add (val) {
      this.worksheets_data.rows = val;
      this.worksheets_data.page = 1;
      this.worksheets_data.tableRadio = {}
      this.get_worksheets_list();
    },
    handleCurrentChange_add (val) {
      this.worksheets_data.page = val;
      this.worksheets_data.tableRadio = {}
      this.get_worksheets_list();
    },

    // -新加到工单取消状态
    add_closed_state () {
      this.worksheets_data.pop = false;
    },

    //新加到工单确定
    add_ok_worksheets () {
      console.log(this.worksheets_data.tableRadio);
      if (Object.keys(this.worksheets_data.tableRadio).length == 0) {
        this.$message(
          {
            message: '请选择工单！',
            type: 'warning',
          }
        );
        return false
      }
      // this.worksheets_data.tableRadio
      var te_alert = []
      JSON.parse(this.worksheets_data.tableRadio.te_alert).forEach(element => {
        if (element != '') {
          te_alert.push(element * 1)
        }
      });
      te_alert.push(this.$route.query.detail * 1)
      console.log(te_alert);
      var add_workorder = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          add_workorder = '/yiiapi/alert/add-workorder'
          break;
        case 'asset':
          add_workorder = '/yiiapi/asset/add-workorder'
          break;
        case 'lateral':
          add_workorder = '/yiiapi/horizontalthreat/add-workorder'
          break;
        case 'outside':
          add_workorder = '/yiiapi/externalthreat/add-workorder'
          break;
        case 'outreath':
          add_workorder = '/yiiapi/outreachthreat/add-workorder'
          break;
        default:
          break;
      }
      this.$axios.post(add_workorder,
        {
          id: this.worksheets_data.tableRadio.id,
          type: "alert",
          name: this.worksheets_data.tableRadio.name,
          perator: JSON.parse(this.worksheets_data.tableRadio.perator),
          priority: this.worksheets_data.tableRadio.priority,
          remind: JSON.parse(this.worksheets_data.tableRadio.remind),
          remarks: this.worksheets_data.tableRadio.remarks,
          te_alert: te_alert,
        })
        .then((resp) => {
          let { status, msg, data } = resp.data;
          console.log(data);
          if (status == 0) {
            this.$message.success('添加成功');
            this.get_data()
          } else if (status == 1) {
            this.$message.error(msg);
          }
          this.add_closed_state();
        })
        .catch(err => {
          console.log(err);
        });
    },
    ///-------------------------新建工单

    closed_task_new () {
      this.new_worksheets_data.pop = false
    },
    //获取用户列表(经办人使用)
    get_user_list () {
      this.$axios.get('/yiiapi/site/user-list')
        .then(resp => {
          let { status, data } = resp.data;
          if (status == 0) {
            this.new_worksheets_data.operator_list = data;
          } else {
            this.new_worksheets_data.operator_list = [];
          }
          this.new_worksheets_data.pop = true
          this.new_worksheets_data.new_contet = true;
        })
        .catch(err => {
          console.log('用户列表错误');
          console.log(err);
        })
    },

    //经办人change处理
    select_changced (item) {
      //console.log(item);
      // this.new_worksheets_data.table_operator.tableData.push(item)
      let level_list = this.new_worksheets_data.table_operator.tableData;
      let selected_id_attr = level_list.map(x => { return x.id });
      if (selected_id_attr.includes(item.id)) {
        this.$message.error('已存在');
      } else {
        this.new_worksheets_data.table_operator.tableData.unshift(item);
      }
      let pageNow = this.new_worksheets_data.table_operator.pageNow;
      let handle_data_operator = this.new_worksheets_data.table_operator.tableData.slice((pageNow - 1) * 5, pageNow * 5);
      this.new_worksheets_data.table_operator.tableData_new = handle_data_operator;
      let selected_name_attr = this.new_worksheets_data.table_operator.tableData.map(x => { return x.username });
      console.log(selected_name_attr);
      console.log(this.new_worksheets_data.table_operator.tableData);
      // this.task_params.new_operator = selected_name_attr;
    },
    //经办人页数点击
    hcc_table_operator (val) {
      this.new_worksheets_data.table_operator.pageNow = val;
    },
    //下一步时候验证工单名称，优先级、经办人等参数
    next_task () {
      var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
      if (this.new_worksheets_list.name == '') {
        this.$message.error('工单名称不能为空');
        return false
      }
      if (pattern.test(this.new_worksheets_list.name)) {
        console.log(true);
        this.$message.error('工单名称不能包含特殊字符');
        return false
      }
      if (this.new_worksheets_list.level == '') {
        this.$message.error('优先级未选择');
        return false
      }
      if (this.new_worksheets_list.level == '') {
        this.$message.error('优先级未选择');
        return false
      }
      if (this.new_worksheets_list.operator == '') {
        this.$message.error('经办人未选择');
        return false
      }
      this.new_worksheets_data.new_contet = false;
      // this.handle.active = 0;
      this.new_worksheets_data.network_detail.push(this.network_detail)
      console.log(this.network_detail);
    },
    // 上一步
    prev_task_handle () {
      this.new_worksheets_data.network_detail = [];
      this.new_worksheets_data.new_contet = true;
    },
    // 添加工单 选择告警列表
    select_alert_new (val) {
      this.new_worksheets_list.select_list = val
      console.log(val);
    },
    // 分配
    prev_task_handle_assign () {
      var te_alert = []
      var perator_list = []
      te_alert.push(this.network_detail.id * 1)
      this.new_worksheets_data.table_operator.tableData.forEach(element => {
        perator_list.push(element.username)
      });
      console.log(te_alert);
      console.log(perator_list);
      console.log(this.new_worksheets_list);
      var distribution_workorder = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          distribution_workorder = '/yiiapi/alert/distribution-workorder'
          break;
        case 'asset':
          distribution_workorder = '/yiiapi/asset/distribution-workorder'
          break;
        case 'lateral':
          distribution_workorder = '/yiiapi/horizontalthreat/distribution-workorder'
          break;
        case 'outside':
          distribution_workorder = '/yiiapi/externalthreat/distribution-workorder'
          break;
        case 'outreath':
          distribution_workorder = '/yiiapi/outreachthreat/distribution-workorder'
          break;
        default:
          break;
      }


      this.$axios.put(distribution_workorder,
        {
          name: this.new_worksheets_list.name,
          priority: this.new_worksheets_list.level,
          perator: perator_list,
          remarks: this.new_worksheets_list.textarea,
          te_alert: te_alert,
          remind: this.new_worksheets_list.notice
        })
        .then((resp) => {
          let { status, msg, data } = resp.data;
          console.log(data);
          if (status == 0) {
            this.get_data();
            this.new_worksheets_data.pop = false
            this.$message.success('分配成功');
          } else if (status == 1) {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存
    prev_task_handle_save () {
      var te_alert = []
      var perator_list = []
      this.new_worksheets_data.table_operator.tableData.forEach(element => {
        perator_list.push(element.username)
      });
      te_alert.push(this.network_detail.id * 1)
      console.log(te_alert);
      console.log(this.new_worksheets_list);

      var add_workorder = ''
      // horizontalthreat  横向威胁告警  lateral
      // externalthreat  外部威胁告警  outside
      // outreachthreat  外联威胁告警  outreath
      switch (this.$route.query.type) {
        case 'alert':
          add_workorder = '/yiiapi/alert/add-workorder'
          break;
        case 'asset':
          add_workorder = '/yiiapi/asset/add-workorder'
          break;
        case 'lateral':
          add_workorder = '/yiiapi/horizontalthreat/add-workorder'
          break;
        case 'outside':
          add_workorder = '/yiiapi/externalthreat/add-workorder'
          break;
        case 'outreath':
          add_workorder = '/yiiapi/outreachthreat/add-workorder'
          break;
        default:
          break;
      }
      this.$axios.post(add_workorder,
        {
          type: "alert",
          name: this.new_worksheets_list.name,
          perator: perator_list,
          priority: this.new_worksheets_list.level,
          remind: this.new_worksheets_list.notice,
          remarks: this.new_worksheets_list.textarea,
          te_alert: te_alert,
        })
        .then((resp) => {
          let { status, msg, data } = resp.data;
          console.log(data);
          if (status == 0) {
            this.new_worksheets_data.pop = false
            this.$message.success('添加成功');
            this.get_data()
          } else if (status == 1) {
            this.$message.error(msg);
          }
          this.add_closed_state();
        })
        .catch(err => {
          console.log(err);
        });



    },
  },
  filters: {
    filterType: function (val) {
      if (val == '') return;
      if (val == undefined) return;
      if (val == 0) return '0B';
      var k = 1024;
      var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(val) / Math.log(k));
      return (val / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
    }
  }
};
</script>
<style lang="less">
@import '../../../../assets/css/less/reset_css/reset_tab.less';
@import '../../../../assets/css/less/reset_css/reset_pop.less';
@import '../../../../assets/css/less/common-table-pattern.less';
@import '../../../../assets/css/less/common-dropdown.less';
@import '../../../../assets/css/less/reset_css/reset_table.less';
.el-input__inner {
  background: #f8f8f8;
  border: 0;
}
.dropdown_ul_box_detail {
  // width: 124px;
  // top: 209px !important;
  .el-dropdown-menu__item:hover {
    color: #606266;
  }
}
.detail-network {
  .pagination_box {
    margin: 24px 0;
    text-align: center;
  }

  // 弹窗编辑标签
  .add_tag {
    .el-dialog {
      width: 440px;
      .el-dialog__body {
        width: 440px;
        .content {
          padding: 24px 5px;
          height: 120px;
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
          }
        }
      }
    }
  }
  //添加到工单
  .pop_state_add {
    .el-dialog {
      width: 960px;
      .el-dialog__body {
        width: 960px;
        .content {
          padding-top: 24px;
          // 修改radio 改成对号
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

          .el-radio__input.is-checked .el-radio__inner::after {
            transform: rotate(45deg) scaleY(1);
          }
          .el-radio__inner::after {
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            background-color: transparent;
            content: '';
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 0.4375rem;
            left: 0.25rem;
            position: absolute;
            top: 1px;
            -webkit-transform: rotate(45deg) scaleY(0);
            transform: rotate(45deg) scaleY(0);
            width: 0.1875rem;
            -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
            transition: -webkit-transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
            transition: transform 0.15s ease-in 0.05s,
              -webkit-transform 0.15s ease-in 0.05s;
            -webkit-transform-origin: center;
            transform-origin: center;
          }
          .el-radio__inner {
            border-radius: 2px;
          }
        }
      }
    }
  }
  //  新建工单
  .task_new_box {
    .el-dialog {
      width: 960px;
      .el-dialog__body {
        width: 960px;
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
            font-family: PingFangMedium;
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
            background-image: url('../../../../assets/images/emerge/step1.png');
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
            background-image: url('../../../../assets/images/emerge/step2.png');
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
}
</style>
<style scoped lang="less">
.detail-network {
  background: #f8f8f8;

  .red_color {
    color: #ff5f5c !important;
  }
  //   基础信息
  .detail_base {
    // height: 323px;
    background: #fff;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .top_left {
        float: left;
        line-height: 62px;
        img {
          vertical-align: middle;
        }
      }
      .top_right {
        float: right;
        /*margin-top: 14px;*/
        // line-height: 62px;
        .change_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #0070ff;
        }
        .edit_btn {
          height: 34px;
          width: 124px;
          padding: 0;
          background: #fff;
          border: 1px solid #0070ff;
          color: #0070ff;
        }
      }
    }
    .detail_base_bottom {
      // height: 260px;
      padding: 24px 56px;
      display: flex;
      .detail_base_bottom_item {
        text-align: left;
        flex: 1;
        .change_src_btn {
          background: none;
          border: none;
          padding: 0;
        }
        .item_li {
          display: flex;
          // height: 22px;
          margin-bottom: 16px;
          position: relative;
          .src_ul {
            width: 180px;
            padding: 10px 0;
            background: #fff;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
            position: absolute;
            left: 96px;
            top: 22px;
            z-index: 99;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0 12px;
              cursor: pointer;
            }
            li:hover {
              background: #eef6ff;
            }
          }
          .item_li_title {
            width: 96px;
            font-size: 16px;
            color: #333333;
            font-family: PingFangMedium;
          }
          .item_li_content {
            flex: 1;
            font-size: 16px;
            color: #666;
            .tag_btn_box {
              margin: 0 2px;
              display: inline-block;
              height: 20px;
              padding: 0 3px;
              border-radius: 2px;
              color: #ffffff;
              background: #5389e0;
              text-align: center;
            }
            .tag_btn {
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              font-family: PingFang;
              padding: 0 3px;
              // transform: scale(0.8);
              display: block;
            }
          }
          .Goto_workorder {
            color: #0070ff;
            cursor: pointer;
          }
          .btn_fall {
            display: inline-block;
            width: 76px;
            height: 30px;
            background: #ff5f5c;
            color: #fff;
          }
          .src_active {
            font-family: PingFang;
            font-size: 16px;
            color: #0070ff;
            cursor: pointer;
          }
        }
      }
    }
  }
  //   检测时间轴
  .detail_time_box {
    // min-height: 716px;
    padding: 24px 56px 36px 56px;
    .time_title {
      height: 22px;
      font-family: PingFangMedium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 12px;
      text-align: left;
    }
    .time_content {
      display: flex;
      .time_left {
        width: 180px;
        float: left;
        background: #fff;
        margin: 0;
        ul.time_left_list {
          width: 180px;
          // height: 610px;
          background: #fff;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 0;
          &.time_left_list::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
            z-index: 0;
          }
          &.time_left_list::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background: #fff;
          }
          &.time_left_list::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 10px;
            background: #ededed;
          }
        }
        .time_item {
          z-index: 999;
          height: 80px;
          width: 95%;
          display: flex;
          position: relative;
          cursor: pointer;
          .time_item_left {
            width: 52px;
            padding: 28px 0;
          }
          .time_item_right {
            flex: 1;
            padding: 10px 0;
            text-align: left;
          }
        }
        .time_item.active {
          background: #0070ff;
          color: #fff;
        }
        .time_item.active:after {
          content: '';
          display: block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid #0070ff;
          position: absolute;
          top: 32px;
          right: -8px;
          z-index: 999;
        }
      }
      .time_right {
        flex: 1;
        // overflow: hidden;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 18px;
        // height: 610px;
        background: #fff;
        .title {
          height: 42px;
          font-family: PingFangMedium;
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #ececec;
          line-height: 42px;
          text-align: left;
          padding: 0 24px;
        }
        .time_right_info {
          padding-left: 24px;
          .download_text {
            color: #0070ff !important;
            cursor: pointer;
            text-decoration: underline;
          }
          .time_right_info_top {
            overflow-y: auto;
            border-bottom: 1px solid #ececec;
            padding-top: 16px;
            .info_top_item {
              // height: 22px;
              margin-bottom: 16px;
              width: 50%;
              float: left;
              text-align: left;
              display: flex;
              .info_top_item_title {
                width: 150px;
                font-family: PingFang;
                font-size: 16px;
                color: #333333;
              }
              .info_top_item_content {
                word-break: break-all;
                flex: 1;
                font-family: PingFang;
                font-size: 16px;
                color: #666666;
              }
            }
          }
          .time_right_info_bom {
            padding: 16px 0;
            text-align: left;
            display: flex;
            .info_bom_title {
              width: 150px;
              font-family: PingFang;
              font-size: 16px;
              color: #333333;
            }
            .info_bom_item {
              flex: 1;
              display: flex;
              flex-direction: column;
              .info_bom_item_li {
                margin-bottom: 12px;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                .left_li {
                  width: 200px;
                  font-size: 16px;
                  color: #666;
                }
                .right_li {
                  font-size: 16px;
                  color: #666;
                  flex: 1;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  align-items: flex-start;
                }
              }
            }
          }
        }
        .time_right_net {
          margin: 16px 24px;
          border-bottom: 1px solid #ececec;
          display: flex;
          .time_right_net_item {
            flex: 1;
            width: 0;
            // display: flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            // justify-content: flex-start;
            .title_net {
              height: 42px;
              text-align: left;
              background: #f8f8f8;
              font-family: PingFangMedium;
              font-size: 14px;
              color: #333333;
              line-height: 42px;
              padding: 0 10px;
            }
            .value_net {
              min-height: 42px;
              word-wrap: break-word;
              word-break: break-all;
              overflow: hidden;
              font-size: 14px;
              color: #666;
              text-align: left;
              padding: 10px;
              .img_icon{
                margin: 0 8px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  // 攻击阶段
  .attack_stage_box {
    text-align: left;
    // height: 171px;
    background: #fff;
    margin-bottom: 24px;
    .detail_base_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .attack_stage_title {
        font-family: PingFangMedium;
        font-size: 16px;
        color: #333333;
        line-height: 62px;
      }
      .icon_img {
        width: 24px;
        vertical-align: middle;
      }
    }
    .attack_stage_bom {
      height: 108px;
      padding: 30px 56px;
      display: flex;
      justify-content: space-between;
      .stage_item_box {
        width: 104px;
        height: 48px;
        line-height: 48px;
        background: #eef6ff;
        border-radius: 2px;
        font-size: 16px;
        color: #aaaaaa;
        text-align: center;
        position: relative;
        .circle_box {
          display: block;
          font-size: 12px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.24);
          width: 18px;
          height: 18px;
          line-height: 18px;
          color: #fff;
          border-radius: 18px;
          background: #ff5f5c;
          position: absolute;
          top: -9px;
          right: -9px;
        }
      }
      .count_color {
        color: #0070ff;
      }
      .stage_img_box {
        flex: 1;
        margin: 0 5px;
        height: 48px;
        line-height: 48px;
        img {
          margin-top: 12px;
          width: 100%;
          height: 24px;
        }
      }
    }
  }
  // 威胁安全建议
  .suggest_box {
    text-align: left;
    background: #fff;
    margin-bottom: 24px;
    .suggest_top {
      padding: 0 56px;
      height: 62px;
      border-bottom: 1px solid #ececec;
      .suggest_title {
        font-family: PingFangMedium;
        font-size: 16px;
        color: #333333;
        line-height: 62px;
      }
      .icon_img {
        width: 24px;
        vertical-align: middle;
      }
    }
    .suggest_bom {
      padding: 16px 56px;
      .suggest_icon {
        width: 13px;
        height: 6px;
        vertical-align: middle;
      }
      .suggest_bom_title {
        font-family: PingFangMedium;
        font-size: 14px;
        color: #333333;
      }
      .suggest_bom_des {
        margin: 8px 0 24px 0;
        font-size: 14px;
        color: #666666;
      }
      .suggest_bom_li {
        font-size: 14px;
        color: #666666;
      }
      .suggest_bom_list {
        margin: 12px 0 8px 0;
      }
    }
  }

  //   告警列表
  .emerge_box {
    padding: 24px 56px;
    background: #fff;
    .pagination_box {
      margin-top: 24px;
    }
    .emerge_table {
      .el-table th.is-leaf {
        border-bottom: 1px solid #fff;
      }
      .el-table {
        th {
          .cell {
            font-family: PingFangMedium;
            font-size: 14px;
            color: #333333;
          }
        }
      }

      th > .cell {
        font-family: PingFangMedium;
        font-size: 14px;
        color: #333333;
      }
      .el-table__row {
        height: 42px;
      }
    }
  }
}
</style>

<style lang="less">
body {
  > ul.dropdown_ul_box_124 {
    width: 128px !important;
  }
}
</style>
