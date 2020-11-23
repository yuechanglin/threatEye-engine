import Vue from 'vue'

import moment from "moment"

Vue.filter('time', function (value) {
  if (value) {
    value = value.toString();
    if (value.length == 10) {
      value = value * 1000;
    }
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

});

Vue.filter('degree_sino', function (args) {
  let str = '';
  if (args == '高') {
    str = '高危';
  } else if (args == '中') {
    str = '中危';
  } else if (args == '低') {
    str = '低危';
  }
  return str;
});

//威胁等级
Vue.filter('degree', function (args) {
  let str = '';
  if (args == 'high') {
    str = '高危';
  } else if (args == 'medium') {
    str = '中危';
  } else if (args == 'low') {
    str = '低危';
  }
  return str;
});

//失陷确定性
Vue.filter('certainty', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '';
  } else if (args == '1') {
    str = '已失陷';
  }
  return str;
});

//处理状态(处置-资产维度)
Vue.filter('risk_status', function (args) {
  args += ''
  let str = '';
  if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置'
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});

//处理状态(告警)
Vue.filter('alert_status', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '新告警';
  } else if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置';
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});


//处理状态(处置-工单中心)
Vue.filter('work_status', function (args) {
  //console.log(args);
  args += ''
  let str = '';
  switch (args) {
    case '':
      str = '未关联工单';
      break;
    case '0':
      str = '待分配';
      break;
    case '1':
      str = '已分配';
      break;
    case '2':
      str = '处置中';
      break;
    case '3':
      str = '已处置';
      break;
    case '4':
      str = '已取消';
      break;
    default:
      break;
  }
  return str;
});

//优先级
Vue.filter('priority', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '最高';
  } else if (args == 'high') {
    str = '高';
  } else if (args == 'medium') {
    str = '中';
  } else if (args == 'low') {
    str = '低';
  }
  return str;
});
//优先级
Vue.filter('priorityColor', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '#dc5f5f';
  } else if (args == 'high') {
    str = '#e0c840';
  } else if (args == 'medium') {
    str = '#5389e0';
  } else if (args == 'low') {
    str = '#47cad9';
  }
  return str;
});

Vue.filter('filterType', function (args) {
  if (args == '') return;
  if (args == undefined) return;
  if (args == 0) return '0B';
  var k = 1024;
  var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(args) / Math.log(k));
  return (args / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
});

///////////大屏设置
//状态
Vue.filter('sys', function (args) {
  let str = '';
  if (args == 'cpu') {
    str = 'CPU';
  } else if (args == 'disk') {
    str = '硬盘';
  } else if (args == 'mem') {
    str = '内存';
  }
  return str;
});

//大屏攻击阶段
Vue.filter('stage', function (args) {
  let str = '';
  if (args == 'Initial Access') {
    str = '初始访问';
  } else if (args == 'Execution') {
    str = '执行';
  } else if (args == 'Persistence') {
    str = '持久化';
  }else if (args == 'Privilege Escalation') {
    str = '提权';
  }else if (args == 'Defense Evasion') {
    str = '防御逃逸';
  }else if (args == 'Credential Access') {
    str = '凭证访问';
  }else if (args == 'Discovery') {
    str = '信息发现';
  }else if (args == 'Lateral Movement') {
    str = '横向移动';
  }else if (args == 'Collection') {
    str = '信息收集';
  }else if (args == 'Command and Control') {
    str = '命令控制';
  }else if (args == 'Exfiltration') {
    str = '信息泄露';
  }else if (args == 'Impact') {
    str = '毁坏';
  }
  return str;
});

//大屏关注告警
Vue.filter('alarm', function (args) {
  let str = '';
  if (args == 'cnc') {
    str = '僵尸网络C&C';
  } else if (args == 'exploit') {
    str = '漏洞利用';
  } else if (args == 'malware') {
    str = '恶意程序';
  }
  return str;
});

Vue.filter('network_event', function (value) {
  switch (value) {
    case 'Time':
      return '时间'
      break;
    case 'Source IP':
      return '源地址'
      break;
    case 'Destination IP':
      return '目的地址'
      break;
    case 'Traffic':
      return '应用'
      break;
    case 'Method':
      return '方式'
      break;
    case 'URL':
      return 'URL'
      break;
    case 'User Agent':
      return '用户代理'
      break;
    case 'Referrer':
      return '来源参考'
      break;
    case 'TTL':
      return 'TTL'
      break;
    case 'Domain':
      return '域名'
      break;
    case 'SectianType':
      return '类型'
      break;
    case 'Mail_from':
      return '邮件_来自'
      break;
    case 'Recpt_to':
      return '接收_到达'
      break;
    case 'User':
      return '用户'
      break;
    case 'Tool':
      return '工具'
      break;
    case 'Issuerdn':
      return '签发者域名'
      break;
    case 'Authorizing':
      return '授权'
      break;
    case 'Notafter':
      return '有效期'
      break;
    case 'Msg_type':
      return '消息_类型'
      break;
    case 'Cname':
      return 'Cname'
      break;
    case 'Realm':
      return '领域'
      break;
    case 'Sname':
      return 'Sname'
      break;
    default:
      return value
      break;
  }
});

Vue.filter('ip_whois', function (value) {
  switch (value) {
    case 'MX':
      return '邮件服务器'
      break;
    case 'MX_ips':
      return '邮件服务器IP'
      break;
    case 'NS':
      return '域名服务器'
      break;
    case 'NS_ips':
      return '域名服务器IP'
      break;
    case 'created':
      return '域名注册时间'
      break;
    case 'domain':
      return '域名'
      break;
    case 'expires':
      return '域名过期时间'
      break;
    case 'org':
      return '注册人组织'
      break;
    case 'registrar_name':
      return '注册机构名称'
      break;
    case 'city':
      return '注册人城市'
      break;
    case 'country':
      return '注册人国家'
      break;
    case 'email':
      return '注册人邮箱'
      break;
    case 'name':
      return '注册人名称'
      break;
    case 'registrar_email':
      return '注册机构邮箱'
      break;
    case 'contact_abuse_email':
      return '滥用报告邮箱'
      break;
    case 'contact_abuse_name':
      return '滥用报告接口人'
      break;
    case 'contact_owner_city':
      return '网络所有者城市'
      break;
    case 'contact_owner_code':
      return '网络所有者编码'
      break;
    case 'contact_owner_country':
      return '网络所有者国家'
      break;
    case 'contact_owner_email':
      return '网络所有者邮箱'
      break;
    case 'contact_owner_name':
      return '网络所有者名称'
      break;
    case 'created':
      return '网络注册时间'
      break;
    case 'net_name':
      return '网络名称'
      break;
    case 'net_range':
      return '网络地址范围'
      break;
    case 'updated':
      return '网络更新时间'
      break;
    case 'asn':
      return '自主系统号（ ASN）'
      break;
    case 'contact_abuse_name':
      return '滥用报告接口人'
      break;
    case 'contact_abuse_email':
      return '滥用报告邮箱'
      break;
    case 'descr':
      return '网络描述'
      break;
  }
});


