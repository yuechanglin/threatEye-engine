<template>
  <div class="handle-lateral"
       v-cloak>
    <vm-handle-risks :threats="threats">
      <slot slot="name">
        <span>横向</span>
      </slot>
      <slot>
        <div class="outside-middle">
          <div class="osm-top">
            <img class="osm-img"
                 src="../../../../assets/images/handle/risks/edit.png">
            <span class="osm-title">威胁及安全建议</span>
          </div>
          <div class="osm-middle">
            <dl>
              <dt class="osm-dt">威胁描述</dt>
              <dd class="osm-dd">横向威胁是指攻击者为了了解所处的网络环境或者找到网络内的目标而实施的内网的扫描、暴力破解、漏洞利用、远程账号登录、远程程序以及命令执行等动作。</dd>
            </dl>
            <dl>
              <dt class="osm-dt">安全建议</dt>
              <dd class="osm-dd">
                <ul>
                  <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
                  <li>2、部署带有静态分析、动态分析、漏洞防御、主机防火墙、主机IPS等多重防御功能的端点安全解决方案；</li>
                  <li>3、采用端点检测和响应解决方案（EDR）大力提升在端点上的威胁检测和响应的能力，包括合法账号的异常登录、系统自带或者管理员使用的工具的非法使用等；</li>
                  <li>4、部署东西向流量的网络威胁检测和响应解决方案。</li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </slot>
    </vm-handle-risks>
  </div>
</template>

<script type="text/ecmascript-6">
import VmHandleRisks from '../vm-handle/vm-handle-risks'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'handle-lateral',
  data () {
    return {
      threats: 'horizontalthreat'
    };
  },
  components: { VmHandleRisks },
  created () {
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
    }
  }
};
</script>

<style scoped lang="less">
</style>

