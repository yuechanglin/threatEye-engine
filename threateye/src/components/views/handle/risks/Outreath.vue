<template>
  <div class="handle-outreach"
       v-cloak>
    <vm-handle-risks :threats="threats">
      <slot slot="name">
        <span>外连</span>
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
              <dd class="osm-dd">外连威胁是指攻击者通过失陷的资产和外网通讯从而达到控制内网资产或者窃取数据的目的，这个阶段的攻击通常伪装成常规的网络通讯和流量避免被检测。</dd>
            </dl>
            <dl>
              <dt class="osm-dt">安全建议</dt>
              <dd class="osm-dd">
                <ul>
                  <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
                  <li>2、采用安全网关和端点安全等进行深度防御；</li>
                  <li>3、采用威胁情报发现C&C服务器信息以及其它高危外连动作；</li>
                  <li>4、在扎实的安全防御基础上提升网络和端点的威胁检测和响应能力。</li>
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
  name: 'handle-outreach',
  data () {
    return {
      threats: 'outreachthreat'
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

