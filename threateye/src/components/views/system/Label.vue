<template>
    <div id="system_setting_label" v-cloak
         v-loading.fullscreen.lock="loading">
      <div class="content_box">
        <div class="custom-name">
          <h3 class="name">标签管理</h3>
        </div>
        <div class="custom-top">
          <el-input class="search_key"
                    placeholder="搜索关键词"
                    v-model.trim="name"
                    @keyup.enter.native="search()"
                    clearable>
            <i slot="prefix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="c_search" @click="search()">搜索</el-button>
          <div class="c_btn_group">
            <el-button class="c_exp" @click="label_handle('','add')">新增标签</el-button>
          </div>
        </div>

        <div class="custom-bom">
          <vuedraggable class="label-lists" v-model="label_data" @end="endCategory()" handle=".tog_edit_seat">
            <transition-group>
              <li class="item undraggable" v-for="(item,$idx) in label_data"
                   :key="item.name+'_label'">
                <!-- 名称和操作 -->
                <div class="toggle_cate">
                  <div class="tog_cate">
                    <span class="name">{{item.name | labelNull}}</span>
                  </div>
                  <div class="tog_list">
                    <div class="tog_edit_seat">
                      <img v-if="item.name != '' && item.name != '未分类标签'" class="tog_img tog_img_edit tog_img_edit1" src="@/assets/images/system/set/label_remove.png"
                           title="删除标签类别" @click="category_remove(item);"/>
                    </div>
                    <div class="tog_edit_seat">
                      <img v-if="item.name != '' && item.name != '未分类标签'" class="tog_img tog_img_edit" src="@/assets/images/system/set/label_edit.png"
                           title="编辑标签类别" @click="category_edit(item);"/>
                    </div>
                    <div class="tog_edit_seat">
                      <img v-if="item.name != '' && item.name != '未分类标签'" class="tog_img tog_img_top"  src="@/assets/images/system/set/is_top.png"
                           title="置顶" @click="category_top($idx);"/>
                    </div>
                    <div class="tog_edit_seat" style="cursor: move;">
                      <img v-if="item.name != '' && item.name != '未分类标签'" class="tog_img tog_img_drag" src="@/assets/images/system/set/label_drag_h.png"
                           title="拖动"/>
                    </div>
                    <a class="tog_arrow" :class="{'active':item.status}" href="javascript:void(0);"
                       @click="item.status = !item.status">
                      <span class="name" v-show="item.status">收起</span>
                      <span class="name" v-show="!item.status">展开</span>
                    </a>
                  </div>
                </div>
                <!-- 标签列表 -->
                <div class="toggle_content" v-show="item.status">
                    <vuedraggable class="sortable" v-model="item.label" @end="endLabel(item)" handle=".b_img_drag">
                      <transition-group>
                        <li class="sortable_list" v-if="it.label_name != null" :value="it.id"
                            :key="it.id+'_only'" v-for="(it,$ix) in item.label">
                          <button class="btn_label">
                            <div class="b_label">
                              <span class="b_span" :title="it.label_name">{{it.label_name}}</span>
                            </div>
                          </button>
                          <div class="btn_img">
                            <img class="b_img b_img_drag" src="@/assets/images/system/set/label_drag_v.png"/>
                            <img class="b_img b_img_edit" title="编辑标签" @click="label_handle(it,'edit');"
                                 src="@/assets/images/system/set/label_edit.png"/>
                          </div>
                        </li>
                      </transition-group>
                    </vuedraggable>

                    <button class="btn_label_add" @click="label_handle(item.name,'add');">
                      <img class="ba_img" src="@/assets/images/system/set/label_add.png"/>
                      <span class="ba_span">新增标签</span>
                    </button>
                </div>
              </li>
            </transition-group>
          </vuedraggable>
        </div>
      </div>

      <!-- 新增/编辑标签 -->
      <el-dialog class="add_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="label_pop.lab">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_cancel_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name" v-show="label.types=='add'">新增标签</span>
          <span class="title_name" v-show="label.types=='edit'">编辑标签</span>
        </div>
        <div class="content">
          <div class="lab_top">
            <p class="lab_name">标签类别</p>
            <div class="lab_item">
              <img class="lab_item_icon" alt=""
                   src="@/assets/images/system/set/label_triangle_down.png">
              <el-autocomplete
                :value="label.category_name"
                @input="e => label.category_name = validSe(e)"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                :disabled="label.category_flag"
                placeholder="下拉选择或直接输入">
              </el-autocomplete>
            </div>
          </div>

          <div class="lab_mid">
            <p class="lab_name">标签名称<span class="lab_tab">*</span></p>
            <div class="lab_item">
             <!-- <input type="text" class="lab_mid_name" input-limit="25"
                     placeholder="请输入标签名称(长度限制为25个字),不允许输入特殊字符"
                     ng-model="label.label_name" required>-->
              <el-input  placeholder="请输入标签名称(长度限制为25个字),不允许输入特殊字符"
                         :value="label.name"
                         @input="e => label.name = validSe(e)"
                         maxlength="25" required></el-input>
            </div>
          </div>
          <div class="lab_bom">
            <p class="lab_name">标签描述</p>
            <textarea class="token_bom_content" placeholder="请输入标签描述内容"
                       v-model="label.detail"></textarea>
          </div>
        </div>
        <div class="btn_box">

          <el-button class="ok_btn"
                     @click="closed_submit_box">保存</el-button>

          <el-button @click="closed_cancel_box"
                     class="cancel_btn">取消</el-button>

          <el-button class="cancel_btn" v-if="label.types=='edit'"
                     @click="closed_remove_box">删除标签</el-button>
        </div>
      </el-dialog>

      <!-- 编辑标签类型 -->
      <el-dialog class="add_cat_box pop_box"
                 :close-on-click-modal="false"
                 :modal-append-to-body="false"
                 :visible.sync="label_pop.cat">
        <img src="@/assets/images/emerge/closed.png"
             @click="closed_cate_box"
             class="closed_img"
             alt="">
        <div class="title">
          <div class="mask"></div>
          <span class="title_name">编辑标签类别</span>
        </div>
        <div class="content">
          <div class="lab_mid">
            <p class="lab_name">标签类别名称<span class="lab_tab">*</span></p>
            <div class="lab_item">
              <el-input :value="label_category.name"
                        @input="e => label_category.name = validSe(e)"
                        placeholder="请输入标签类别" required></el-input>
            </div>
          </div>
        </div>
        <div class="btn_box">

          <el-button class="ok_btn"
                     @click="closed_sub_box">保存</el-button>

          <el-button @click="closed_cate_box"
                     class="cancel_btn">取消</el-button>

        </div>
      </el-dialog>
    </div>

</template>

<script type="text/ecmascript-6">
    import vuedraggable from 'vuedraggable';
    import { eventBus } from '@/components/common/eventBus.js';
    export default {
      name: "system_setting_label",
      components:{vuedraggable},
      data () {
        return {
          loading: false,
          name: '',
          originalName:'',
          label_pop: {
            lab:false,
            cat:false
          },
          label:{
            name:'',
            category_name:'',
            detail:'',
            types:'add',
            lists:[],
            id:'',
            category_flag:false,
            intelligence:10
          },
          label_category:{
            name:'',
            id:''
          },
          label_data: []
        }
      },
      created(){
        this.check_passwd();
        this.get_data();
      },
      methods:{
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
        //获取数据
        get_data () {
          this.loading = true;
          this.$axios.get('/yiiapi/label/index',{
            params:{
              label_name:this.name
            }
          })
            .then(resp => {

              this.loading = false;
              let {status,data} = resp.data;

              if(status == 0){
                let category_id_attr = [];
                let labelAttr = [];
                for (let i in data) {
                  let value = i;
                  let key = data[i];

                  if (value != '') {
                    labelAttr.push({
                      name: value.substring(0, value.length - 10),
                      label: key,
                      status: true
                    });
                  } else {
                    labelAttr.push({
                      name: '未分类标签',
                      label: key,
                      status: true
                    });
                  }
                  if (key.length > 0) {
                    category_id_attr.push(key[0].category_id);
                  }
                }

                this.label_data = labelAttr;
                //console.log(labelAttr)
              }
            })
            .catch(error => {
              console.log(error);
            })
        },
        //搜索
        search() {
          this.get_data();
        },
        //新增、编辑标签
        label_handle(item,type){
          this.label_pop.lab = true;

          this.label.name  = '';
          this.label.category_name  = '';
          this.label.detail  = '';
          this.label.id  = '';

          this.label.types = type;


          //编辑时禁止去选择标签类型，不然会报错
          if(item == ''){
            this.label.category_flag = false;
          }else {
            this.label.category_flag = true;
          }
          if(type == 'add'){
            if(item){
              this.label.category_name = item;
            }
          }else {
            this.originalName = item.label_name;
            if(item){
              this.label.name =item.label_name;
              this.label.category_name = item.category_name;
              this.label.detail = item.detail;
              this.label.id = item.id;
            }
          }
        },
        //新增编辑确定
        closed_submit_box(){

          this.$axios.get('/yiiapi/site/get-labels',{
            params:{
              label_name:this.name
            }
          })
            .then(resp => {
              this.loading = false;
              let {status,data} = resp.data;

              if(status == 0){

                let attr = data.map(v => {
                  return v.label_name;
                });

                var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");

                if (pattern.test(this.label.category_name)) {
                  this.$message({
                    message: '标签类型名不能包含特殊字符！',
                    type: 'warning',
                  });
                  return false
                }

                if(this.label.name == ''){
                  this.$message({
                    message: '标签名不能为空！',
                    type: 'warning',
                  });
                  return false;
                }

                if (pattern.test(this.label.name)) {
                  this.$message({
                    message: '标签名称不能包含特殊字符！',
                    type: 'warning',
                  });
                  return false
                }

                //编辑
                if(this.label.types == 'edit'){

                  if(attr.indexOf(this.label.name) > -1 &&
                    this.label.name != this.originalName){

                    this.$confirm(`是否合并标签？`, '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.edit_label_ok();
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });
                    });
                  } else {
                    this.edit_label_ok();
                  }
                  //新增
                }else {
                  this.add_label_ok();
                }

              }
            })
            .catch(error => {
              console.log(error);
            })

        },

        //新增保存标签
        add_label_ok(){
          this.$axios.post('/yiiapi/label/create',{
            category_name: this.label.category_name,
            label_name: this.label.name,
            detail: this.label.detail
          }).then(resp => {
            let {status,msg,data} = resp.data;
            if(status == 0){
              this.label_pop.lab = false;
              this.get_data();
              this.$message({
                message: '标签添加成功！',
                type: 'success',
              });
            }else {
              this.$message({
                message: msg,
                type: 'error',
              });
            }
          }).catch(error => {
            console.log(error);
          })
        },
        //编辑保存标签
        edit_label_ok(){
          this.$axios.put('/yiiapi/label/update?id='+this.label.id,{
            category_name: this.label.category_name,
            label_name: this.label.name,
            detail: this.label.detail
          }).then(resp => {
            let {status,msg,data} = resp.data;

            if(status == 0){
              this.label_pop.lab = false;
              this.get_data();
              this.$message({
                message: '标签编辑成功！',
                type: 'success',
              });

            }else {
              this.$message({
                message: msg,
                type: 'error',
              });

            }
          }).catch(error => {
            console.log(error);
          })
        },

        //新增确定取消
        closed_cancel_box(){
          this.label_pop.lab = false;
        },
        //新增、编辑删除
        closed_remove_box(){
         // console.log(this.label.id)
          this.$confirm(`确认是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete('/yiiapi/label/delete?id='+this.label.id)
              .then(resp => {

             let {status,data} = resp.data;

              if (status == 0) {
                this.label_pop.lab = false;
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

          });
        },

        //类别
        category_edit(item){
          this.label_category.id = item.label[0].category_id;
          this.label_category.name = item.label[0].category_name;
          this.label_pop.cat = true;
        },
        //编辑类别确定
        closed_sub_box(){
          if(this.label_category.name == ''){
            this.$message({
              message: '标签类别名不能为空！',
              type: 'warning',
            });
            return false;
          }
          var pattern = new RegExp("[`~!#%$^&*()=|{}':;',\\[\\]<>《》/?~！#￥……&*（）|{}【】‘；：”“'。，、？]");
          if (pattern.test(this.label_category.name)) {
            this.$message({
              message: '标签类别名不能包含特殊字符！',
              type: 'warning',
            });
            return false
          }

          if(this.label_category.name == '未分类标签'){
            this.$message({
              message: '请重新输入标签类别，避免歧义！',
              type: 'warning',
            });
            return false;
          }

          this.$axios.put('/yiiapi/labelcate/update?id='+this.label_category.id,{
            category_name:this.label_category.name
          })
            .then(resp => {
              let {status,msg,data} = resp.data;
              if(status == 0){
                this.label_pop.cat = false;
                this.get_data();
                this.$message({
                  message: '标签类别修改成功！',
                  type: 'success',
                });
              }else {
                this.$message({
                  message: '标签类别修改失败！',
                  type: 'warning',
                });
              }
            })
            .catch(error => {
              console.log(error);
            })
        },
        //编辑类别删除
        closed_cate_box(){
          this.label_pop.cat = false;
        },
        //删除类别
        category_remove(item){
          this.label_category.id = item.label[0].category_id;
          this.$confirm(`确定删除标签类别？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete('/yiiapi/labelcate/delete?id='+this.label_category.id)
              .then(resp => {

              let {status,data} = resp.data;

              if (status == 0) {

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
        //标签拖拽
        endLabel(item){
          let label_id_attr = item.label.map(item => {return item.id});
          this.$axios.put('/yiiapi/label/change-label-sort',{
            label: label_id_attr.reverse()
          }).then(resp => {
              let {status,msg,data} = resp.data;
              if(status == 0){
                this.get_data();
              }else{
                this.$message({
                  message: '标签拖拽失败',
                  type: 'error',
                });
              }
            })
            .catch(error => {
              console.log(error);
            })
        },
        //列表拖拽
        endCategory(){
          let category_id_attr = [];
          this.label_data.map(item => {
            if(item.label.length > 0){
              category_id_attr.push(item.label[0].category_id);
            }
          });

          this.$axios.put('/yiiapi/labelcate/change-category-sort',{
            category: category_id_attr.reverse()
          }).then(resp => {
            let {status,msg,data} = resp.data;
            if(status == 0){
              this.get_data();
            }else{
              this.$message({
                message: '标签类别拖拽失败',
                type: 'error'
              });
            }
          })
            .catch(error => {
              console.log(error);
            })
        },
        //置顶
        category_top(index){
          let category_id_attr = [];
          this.label_data.map(item => {
            if(item.label.length > 0){
              category_id_attr.push(item.label[0].category_id);
            }
          });
          category_id_attr.unshift(category_id_attr.splice(index, 1)[0]);

          this.$axios.put('/yiiapi/labelcate/change-category-sort',{
            category: category_id_attr.reverse()
          }).then(resp => {
            let {status,msg,data} = resp.data;
            if(status == 0){
              this.get_data();
              this.$message({
                message: '置顶成功！',
                type: 'success',
              });
            }else{
              this.$message({
                message: '置顶失败！',
                type: 'error',
              });
            }
          })
            .catch(error => {
              console.log(error);
            })
        },

        querySearchAsync(queryString, callback) {
          this.$axios.get('/yiiapi/labelcate/index',{
            params:{
              category_name:this.label.category_name
            }
          })
            .then(resp => {
              let {status,data} = resp.data;
              if(status == 0){
                for(let i of data){
                  i.value = i.category_name;
                }
              }
              //data.push({category_name:'',id:'',value:''})
              callback(data);
            })
            .catch(error => {
              console.log(error);
            })
        },
        handleSelect(item){
          this.label.category_name = item.value;
        }
      },
      filters:{
        labelNull(val) {
          if (val == '' || val == null) {
            return '未分类标签';
          } else {
            return val;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  #system_setting_label{
    padding: 24px 56px 24px 24px;
    text-align: left;
    .content_box {
      border-radius: 4px;
      background: #fff;
      padding: 24px 0 24px 24px;
      min-height: 830px;
      .custom-name{
        margin-bottom: 24px;
        .name{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          font-weight: 500;
        }
      }
      .custom-top{
        width: 100%;
        display: block;
        font-size: 0;
        padding-right: 24px;
        /deep/
        .search_key {
          width: 240px;
          height: 38px;
        }
        /deep/
        .c_search{
          background: #0070FF;
          width: 102px;
          color: #fff;
          border: 1px solid #0070FF;
          outline: none;
          margin-left: 24px;
        }
        .c_btn_group{
          float: right;
          font-size: 0;
          /deep/
          .c_exp{
            background: #fff;
            width: 148px;
            color: #0070FF;
            border: 1px solid #0070FF;
            outline: none;
          }
        }
        &:after{
          clear: both;
        }
      }
      .custom-bom{
        margin: 24px 24px 0 0;
        .label-lists{
          .item{
            border-bottom: 1px solid #ECECEC;
            padding: 12px 0;
            min-height: 50px;
            .toggle_cate{
              font-size: 0;
              margin: 10px 0;
              display: flex;
              .tog_cate{
                flex: 1;
                .name{
                  font-family: PingFangSC-Medium;
                  font-size: 14px;
                  color: #333333;
                  line-height: 18px;
                  font-weight: bold;
                }
              }
              .tog_list{
                width: 200px;
                text-align: right;
                .tog_edit_seat{
                  width: 16px;
                  height: 16px;
                  margin-right: 15px;
                  z-index: 1500;
                  display: inline-block;
                  .tog_img{
                    width: 14px;
                    vertical-align: middle;
                    &.tog_img_edit1{
                      width: 18px;
                    }
                  }
                }
                .tog_arrow{
                  text-decoration: none;
                  background-size: 12px 12px;
                  vertical-align: middle;
                  display: inline-block;
                  width: 60px;
                  text-align: left;
                  background-repeat: no-repeat;
                  background-position: 40px 1px;
                  background-image: url("../../../assets/images/system/set/label_right.png");
                  &.active{
                    background-image: url("../../../assets/images/system/set/label_down.png");
                  }
                  .name{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #0070FF;
                    line-height: 14px;
                    margin-right: 10px;
                  }
                }
              }
            }
            .toggle_content{
              padding: 10px 0 15px;
              font-size:0;
              .sortable{
                display: contents;
                font-size: 0;
                .sortable_list{
                  display: inline-block;
                  position: relative;
                  .btn_label{
                    width: 150px;
                    height: 36px;
                    line-height: 32px;
                    background-color: #EEF6FF;
                    color: #333;
                    font-size: 14px;
                    text-align: center;
                    margin-right: 6px;
                    margin-top: 6px;
                    outline: none;
                    cursor: default;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    border: 1px solid #EEF6FF;
                    &:hover{
                      border: 1px solid #EEF6FF;
                    }
                    &:focus{
                      border: 1px solid #EEF6FF;
                    }
                    .b_label {
                      width: 100px;
                      overflow: hidden;
                      text-align: center;
                      text-overflow: ellipsis;
                      word-break: break-all;
                    }
                  }
                  .btn_img{
                    position: absolute;
                    width: 50px;
                    height: 18px;
                    left: 100px;
                    top: 16px;
                    border-left: 1px solid #fff;
                    .b_img{
                      z-index: 999;
                      width: 16px;
                      vertical-align: text-top;
                      &.b_img_drag{
                        margin-left: 7px;
                        cursor: move;
                      }
                      &.b_img_edit{
                        margin-left: 5px;
                        cursor: pointer;
                      }
                    }
                  }
                }
              }
              .btn_label_add{
                width: 150px;
                height: 36px;
                cursor: pointer;
                outline: none;
                margin-right: 6px;
                margin-top: 6px;
                background-color: #fff;
                border: 1px solid #EEF6FF;
                display: inline-block;
                vertical-align: bottom;
                &:hover{
                  border: 1px solid #EEF6FF;
                }
                &:focus{
                  border: 1px solid #EEF6FF;
                }
                .ba_img{
                  vertical-align: middle;
                  margin: -3px 4px;
                }
                .ba_span{
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #333333;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
    .add_box{
      /deep/
      .el-dialog{
        width: 552px;
        height: 483px;
        .lab_top{
          position: relative;
          .lab_name{
            font-size: 14px;
            color: #666;
          }
          .lab_item{
            width: 100%;
            margin: 10px 0;
            position: relative;
            .lab_item_icon{
              position: absolute;
              top: 10px;
              right: 10px;
              z-index: 999;
            }
            .el-autocomplete{
              width: 100%;
              .el-input{
                .el-input__inner{
                  height: 32px;
                  font-size: 14px;
                  color: #333;
                  background-color: #fff;
                  border-top-width:0;
                  border-left-width:0;
                  border-right-width:0;
                  border-bottom: 1px solid #ddd;
                  outline:none;
                }
              }
            }
          }
          .lab_top_list{
            position: absolute;
            max-height: 170px;
            background: #fff;
            width: 514px;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
            overflow-y: auto;
            z-index: 999;
            top: 62px;
            left: 2px;
            &::-webkit-scrollbar {
              width: 4px;
              height: 1px;
            }
            &::-webkit-scrollbar-thumb {
              background: #0070FF;
              border-radius: 2px;
            }

            &::-webkit-scrollbar-track {
              /*-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
              background: #fff;
              border-radius: 2px;
            }
            .item{
              height: 34px;
              line-height: 34px;
              padding: 0 16px;
              font-size: 14px;
              color: #666;
              background: #fff;
              cursor: pointer;
              border-bottom: 1px solid #f8f8f8;
              &:last-child{
                border-width: 0;
              }
              &.active{
                background: #E0EEFF;
              }
              &:hover{
                background-color: #E0EEFF;
              }
            }
          }
        }
        .lab_mid{
          margin-bottom: 15px;
          .lab_name{
            font-size: 14px;
            color: #666;
            .lab_tab{
              color: #FF5F5C;
              vertical-align: top;
            }
          }
          .lab_item{
            position: relative;
            margin: 10px 0;
            .el-input{
              .el-input__inner{
                height: 32px;
                width: 100%;
                font-size: 14px;
                color: #333;
                background-color: #fff;
                border-top-width:0;
                border-left-width:0;
                border-right-width:0;
                border-bottom: 1px solid #ddd;
                outline:none;
              }
            }
          }
        }
        .lab_bom{
          margin-bottom: 15px;
          .lab_name{
            font-size: 14px;
            color: #666;
          }
          .token_bom_content{
            width: 100%;
            height: 120px;
            margin: 10px 0;
            padding: 5px 10px;
            font-size: 14px;
            color: #333;
            border: 1px solid #ddd;
            outline: none;
            resize:none;
            &::placeholder{
              color: #bbb;
              font-size: 14px;
            }
          }
        }
        .btn_box{
          height: 40px;
          text-align: center;
          .lab_btn_ok{
            width: 124px;
            height: 40px;
            background: #0070ff;
            border-radius: 4px;
            color: #fff;
          }
          .lab_btn_delete{
            border: 1px solid #0070ff;
            color: #0070ff;
            border-radius: 4px;
            width: 124px;
            height: 40px;
            margin-left: 16px;
          }
          .lab_btn_cancel{
            border: 1px solid #0070ff;
            color: #0070ff;
            border-radius: 4px;
            width: 124px;
            height: 40px;
            margin-left: 16px;
          }
        }
      }
    }
    .add_cat_box{
      /deep/
      .el-dialog{
        width: 552px;
        height: 248px;
        .lab_mid{
          margin-bottom: 15px;
          .lab_name{
            font-size: 14px;
            color: #666;
            .lab_tab{
              color: #FF5F5C;
              vertical-align: top;
            }
          }
          .lab_item{
            position: relative;
            margin: 10px 0;
            .el-input{
              .el-input__inner{
                height: 32px;
                width: 100%;
                font-size: 14px;
                color: #333;
                background-color: #fff;
                border-top-width:0;
                border-left-width:0;
                border-right-width:0;
                border-bottom: 1px solid #ddd;
                outline:none;
              }
            }
          }
        }
        .btn_box{
          height: 40px;
          text-align: center;
          .lab_btn_ok{
            width: 124px;
            height: 40px;
            background: #0070ff;
            border-radius: 4px;
            color: #fff;
          }
          .lab_btn_delete{
            border: 1px solid #0070ff;
            color: #0070ff;
            border-radius: 4px;
            width: 124px;
            height: 40px;
            margin-left: 16px;
          }
          .lab_btn_cancel{
            border: 1px solid #0070ff;
            color: #0070ff;
            border-radius: 4px;
            width: 124px;
            height: 40px;
            margin-left: 16px;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  @import '../../../assets/css/less/reset_css/reset_pop.less';
</style>


