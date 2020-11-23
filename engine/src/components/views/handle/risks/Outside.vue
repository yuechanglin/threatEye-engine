<template>
  <div class="handle-outside"
       v-cloak>
    <vm-handle-risks :threats="threats">
      <slot slot="name">
        <span>外部</span>
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
              <dd class="osm-dd">外部威胁是指对暴露在网络上的资产或者能访问外网的资产发起探测和取得初始访问权的攻击。攻击手法包括扫描、漏洞利用、钓鱼邮件、供应链攻击以及泄露的合法账号登录等。</dd>
            </dl>
            <dl>
              <dt class="osm-dt">安全建议</dt>
              <dd class="osm-dd">
                <ul>
                  <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
                  <li>2、采用安全网关和端点安全等进行深度防御；</li>
                  <li>3、采用威胁情报发现当下流行的钓鱼地址、恶意证书的信息做及时的阻断；</li>
                  <li>4、在扎实的安全防御基础上提升威胁检测和响应的能力。</li>
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
  name: 'handle-outside',
  data () {
    return {
      threats: 'externalthreat'
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

