<template>
  <div id="system_control_option" v-loading.fullscreen.lock="loading"
       class="container">
    <div class="content_box">
      <div class="top">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/common/date.png"
               alt="">
          <span>时间与日期</span>
        </p>
        <div class="item">
          <p class="item_title">配置方式</p>
          <el-select class="select_box"
                     v-model="option.method"
                     @change='change_method'
                     placeholder="请选择配置方式">
            <el-option v-for="item in option.method_list"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <p class="item_title">日期选择</p>
          <el-date-picker v-model="option.time"
                          type="datetime"
                          :disabled="disabled.time"
                          placeholder="选择日期时间">
          </el-date-picker>
          <!-- <el-button type="primary"
                     class="btn_o margin_left">获取本地时间</el-button>
          <el-button type="primary"
                     class="btn_o">获取系统时间</el-button> -->
        </div>
        <div class="item">
          <p class="item_title">时区选择</p>
          <el-select class="select_box"
                     v-model="option.zone"
                     filterable
                     :disabled="disabled.zone"
                     placeholder="请选择时区">
            <el-option v-for="item in option.zone_list"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </div>
        <!-- <p style="margin-bottom:12px;">
          <el-checkbox v-model="option.checked">自动与NTP服务器同步</el-checkbox>
        </p> -->
        <div class="item">
          <p class="item_title">NTP服务器</p>
          <el-input class="select_box"
                    placeholder="请输入NTP服务器"
                    v-model="option.ntp"
                    :disabled="disabled.ntp"
                    clearable>
          </el-input>
          <!-- <el-button type="primary"
                     class="btn_o margin_left">立即同步</el-button> -->
        </div>
        <el-button type="primary"
                   class="btn_i"
                   @click="save_time">保存</el-button>
      </div>
      <!--统一管理平台-->
      <div class="bottom">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/setting/sys.png"
               alt="">
          <span>统一管理平台地址</span>
        </p>
        <div class="item_addrs_item">
          <div class="item_addrs">
            <el-input class="select_box"
                      placeholder="请输入统一平台IP地址"
                      v-model="option.manage_ip"
                      clearable>
            </el-input>
          </div>
         <!-- <div class="item_addrs"
               v-for="(item,index) in option.login_ip">
            <el-input class="select_box"
                      placeholder="请输入统一平台IP地址"
                      v-model="item.ip"
                      clearable>
            </el-input>
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_addr">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_addr(item,index)"
                 v-if="!item.icon">
          </div>-->
        </div>
        <el-button type="primary"
                   class="btn_i"
                   @click="edit_manage_ip">保存</el-button>
      </div>
      <!--沙箱-->
      <div class="bottom">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/setting/sys.png"
               alt="">
          <span>沙箱</span>
        </p>
        <div class="item_addrs_item">
          <div class="item_addrs">
            <el-input class="select_box"
                      placeholder="请输入沙箱IP地址"
                      v-model="option.sandbox_ip"
                      clearable>
            </el-input>
          </div>
          <!--<div class="item_addrs"
               v-for="(item,index) in option.login_ip">
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_addr">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_addr(item,index)"
                 v-if="!item.icon">
          </div>-->
        </div>
        <el-button type="primary"
                   class="btn_i"
                   @click="edit_sandbox_ip">保存</el-button>
      </div>
      <!--IP地址设置 -->
      <div class="bottom">
        <p class="title">
          <img class="titile_icon"
               src="@/assets/images/setting/sys.png"
               alt="">
          <span>登录IP地址设置（最多5个单IP/IP网段）</span>
        </p>
        <div class="item_addrs_item">
          <div class="item_addrs"
               v-for="(item,index) in option.login_ip">
            <el-input class="select_box"
                      placeholder="IP地址或网段（CIDR格式如192.168.1.0/24）"
                      v-model="item.ip"
                      clearable>
            </el-input>
            <img src="@/assets/images/common/add.png"
                 alt=""
                 class="img_box"
                 v-if="item.icon"
                 @click="add_addr">
            <img src="@/assets/images/common/del.png"
                 alt=""
                 class="img_box"
                 @click="del_addr(item,index)"
                 v-if="!item.icon">
          </div>
        </div>
        <el-button type="primary"
                   class="btn_i"
                   @click="edit_login_ip">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: "system_control_option",
  data () {
    return {
      loading:false,
      option: {
        method: 2,
        method_list: [
          {
            name: '手动配置',
            value: 1
          },
          {
            name: '自动同步本地系统时间',
            value: 2
          },
          {
            name: 'NTP服务器时间同步',
            value: 3
          },
        ],
        zone: "",
        zone_list: [
          'Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa',
          'Africa/Asmara', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul',
          'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura',
          'Africa/Cairo', 'Africa/Casablanca', 'Africa/Maputo', 'Africa/Maseru',
          'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala',
          'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare',
          'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum',
          'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville',
          'Africa/Lome', 'Africa/Luanda', 'Africa/Algiers', 'Africa/Lusaka', 'Africa/Ceuta',
          'Africa/Malabo', 'Africa/Mbabane', 'Africa/Conakry', 'Africa/Lubumbashi',
          'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena',
          'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo',
          'Africa/Sao_Tome', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek',
          //美洲
          'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua',
          'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca',
          'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza',
          'America/Argentina/Salta', 'America/Belem', 'America/Bahia', 'America/Bahia_Banderas',
          'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan',
          'America/Argentina/San_Juan', 'America/Barbados', 'America/Argentina/San_Luis',
          'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota',
          'America/Boise', 'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun',
          'America/Caracas', 'America/Cayenne', 'America/Cayman', 'America/Chicago',
          'America/Chihuahua', 'America/Costa_Rica', 'America/Creston', 'America/Cuiaba',
          'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson_Creek',
          'America/Denver', 'America/Detroit', 'America/Dominica', 'America/Edmonton',
          'America/Eirunepe', 'America/El_Salvador', 'America/Fort_Nelson', 'America/Fortaleza',
          'America/Glace_Bay', 'America/Godthab', 'America/Goose_Bay', 'America/Grand_Turk',
          'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil',
          'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo',
          'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo',
          'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes',
          'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Argentina/Cordoba',
          'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Kralendijk',
          'America/Lima', 'America/Los_Angeles', 'America/Lower_Princes', 'America/Maceio',
          'America/Managua', 'America/Manaus', 'America/Marigot', 'America/Martinique',
          'America/Matamoros', 'America/Mazatlan', 'America/Menominee', 'America/Merida',
          'America/Metlakatla', 'America/Mexico_City', 'America/Miquelon', 'America/Moncton',
          'America/Monterrey', 'America/Montevideo', 'America/Montserrat', 'America/Nassau',
          'America/New_York', 'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/La_Paz',
          'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/Tegucigalpa',
          'America/North_Dakota/New_Salem	America/Ojinaga', 'America/Panama', 'America/Porto_Velho',
          'America/Pangnirtung', 'America/Paramaribo', 'America/Phoenix', 'America/Indiana/Winamac',
          'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Argentina/Tucuman',
          'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River', 'America/Juneau',
          'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute',
          'America/Rio_Branco', 'America/Santarem', 'America/Sitka', 'America/St_Barthelemy',
          'America/St_Johns', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas',
          'America/St_Vincent', 'America/Swift_Current', 'America/Indiana/Petersburg',
          'America/Thule', 'America/Thunder_Bay', 'America/Tijuana', 'America/Whitehorse',
          'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Yellowknife',
          'America/Winnipeg', 'America/Yakutat', 'America/Argentina/Rio_Gallegos',
          //南极洲
          'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'Antarctica/Macquarie',
          'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera',
          'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville',
          // 北极
          'Arctic/Longyearbyen',
          // 亚洲
          'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Dushanbe', 'Asia/Dili',
          'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Atyrau', 'Asia/Krasnoyarsk',
          'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Dhaka',
          'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Kuwait',
          'Asia/Chita', 'Asia/Choibalsan', 'Asia/Colombo', 'Asia/Damascus', 'Asia/Dubai',
          'Asia/Famagusta', 'Asia/Gaza', 'Asia/Hebron', 'Asia/Ho_Chi_Minh', 'Asia/Kuching',
          'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Jakarta', 'Asia/Kuala_Lumpur',
          'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Manila',
          'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Makassar',
          'Asia/Macau', 'Asia/Magadan', 'Asia/Novosibirsk', 'Asia/Novokuznetsk', 'Asia/Tokyo',
          'Asia/Muscat', 'Asia/Nicosia', 'Asia/Pontianak', 'Asia/Thimphu', 'Asia/Ust-Nera',
          'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Ulaanbaatar', 'Asia/Urumqi',
          'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qyzylorda', 'Asia/Riyadh', 'Asia/Tehran',
          'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Tbilisi',
          'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent',
          'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon',
          'Asia/Yekaterinburg', 'Asia/Yerevan', 'Asia/Tomsk',

          // 大西洋
          'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde',
          'Atlantic/Faroe', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia',
          'Atlantic/St_Helena', 'Atlantic/Stanley',
          // 澳洲
          'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Currie',
          'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/Lindeman',
          'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney',
          // 欧洲
          'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens',
          'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels',
          'Europe/Bucharest', 'Europe/Budapest', 'Europe/Busingen', 'Europe/Chisinau',
          'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey',
          'Europe/Helsinki', 'Europe/Isle_of_Man', 'Europe/Istanbul', 'Europe/Jersey',
          'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon',
          'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid',
          'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco',
          'Europe/Moscow', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica',
          'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara',
          'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol',
          'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn',
          'Europe/Tirane', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vaduz',
          'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd',
          'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich',
          // 印度
          'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos',
          'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe,Indian/Maldives',
          'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion',
          // 太平洋
          'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham',
          'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury',
          'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos',
          'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu',
          'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro',
          'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue',
          'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau',
          'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Port_Moresby', 'Pacific/Rarotonga',
          'Pacific/Saipan', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu',
          'Pacific/Wake', 'Pacific/Wallis',
          // 其他
          'Africa/Asmera', 'Africa/Timbuktu', 'America/Argentina/ComodRivadavia', 'America/Atka',
          'America/Buenos_Aires', 'America/Catamarca', 'America/Coral_Harbour', 'America/Cordoba',
          'America/Ensenada', 'America/Fort_Wayne', 'America/Indianapolis', 'America/Jujuy',
          'America/Knox_IN', 'America/Louisville', 'America/Mendoza', 'America/Montreal',
          'America/Porto_Acre', 'America/Rosario', 'America/Santa_Isabel', 'America/Shiprock',
          'America/Virgin', 'Antarctica/South_Pole', 'Asia/Ashkhabad', 'Asia/Calcutta',
          'Asia/Chongqing', 'Asia/Chungking', 'Asia/Dacca', 'Asia/Harbin', 'Canada/Mountain',
          'Asia/Istanbul', 'Asia/Kashgar', 'Asia/Katmandu', 'Asia/Macao', 'Canada/Newfoundland',
          'Asia/Rangoon', 'Asia/Saigon', 'Asia/Tel_Aviv', 'Asia/Thimbu', 'Canada/Yukon',
          'Asia/Ujung_Pandang', 'Asia/Ulan_Bator', 'Atlantic/Faeroe', 'Atlantic/Jan_Mayen',
          'Canada/Central', 'Canada/Eastern', 'Egypt', 'Canada/Pacific', 'Canada/Saskatchewan',
          'Chile/Continental', 'Chile/EasterIsland', 'CST6CDT', 'Cuba', 'EET', 'Eire', 'EST',
          'EST5EDT', 'Etc/GMT', 'Etc/GMT+0', 'Etc/GMT+1', 'Etc/GMT+10', 'Etc/GMT+11', 'CET',
          'Etc/GMT+12', 'Etc/GMT+2', 'Etc/GMT+3', 'Etc/GMT+4', 'Etc/GMT+5', 'Etc/GMT+6',
          'Etc/GMT+7', 'Etc/GMT+8', 'Etc/GMT+9', 'Etc/GMT-0', 'Etc/GMT-1', 'Etc/GMT-10',
          'Etc/GMT-11', 'Etc/GMT-12', 'Etc/GMT-13', 'Etc/GMT-14', 'Etc/GMT-2', 'Etc/GMT-3',
          'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6', 'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9',
          'Etc/GMT0', 'Etc/Greenwich', 'Etc/UCT', 'Etc/Universal', 'Etc/UTC', 'Etc/Zulu',
          'Europe/Belfast', 'Europe/Nicosia', 'Europe/Tiraspol', 'Factory', 'GB', 'GB-Eire',
          'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'Hongkong', 'HST', 'Iceland', 'Iran',
          'Israel', 'Jamaica', 'Japan', 'Kwajalein', 'Libya', 'MET', 'Mexico/BajaNorte',
          'Mexico/BajaSur', 'Mexico/General', 'MST', 'MST7MDT', 'Navajo', 'NZ', 'Singapore',
          'NZ-CHAT', 'Pacific/Johnston', 'Pacific/Ponape', 'Pacific/Samoa', 'ROC', 'ROK',
          'Pacific/Truk', 'Pacific/Yap', 'Poland', 'Portugal', 'Turkey', 'UCT', 'Universal',
          'US/Alaska', 'US/Aleutian', 'US/Arizona', 'US/Central', 'PRC', 'PST8PDT',
          'US/East-Indiana', 'US/Eastern', 'US/Hawaii', 'US/Indiana-Starke',
          'US/Michigan', 'US/Mountain', 'US/Pacific', 'US/Pacific-New',
          'US/Samoa', 'UTC	W-SU', 'WET', 'Zulu'
        ],
        checked: true,
        time: "",
        ntp: "",
        endpoint_ip: "",
        manage_ip:'',
        sandbox_ip:'',
        login_ip: [
          {
            ip: '',
            icon: true
          }
        ],
      },
      disabled: {
        time: false,
        zone: false,
        ntp: false,
      }
    }
  },
  mounted () {
    this.check_passwd()
    this.get_data()
    this.get_login_ip();

    this.get_manage_ip();
    this.get_sandbox_ip();
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
    // 获取数据
    get_data () {
      this.$axios.get('/yiiapi/seting/time-synchronization')
        .then(response => {
          let { status, data } = response.data;
          switch (data.data[0].type) {
            case 1:
              this.disabled.time = false
              this.disabled.zone = false
              this.disabled.ntp = true
              break;
            case 2:
              this.disabled.time = true
              this.disabled.zone = false
              this.disabled.ntp = true
              break;
            case 3:
              this.disabled.time = true
              this.disabled.zone = true
              this.disabled.ntp = false
              break;

            default:
              break;
          }
          this.option.method = data.data[0].type
          this.option.time = data.data[0].time
          this.option.zone = data.data[0].zone
          this.option.ntp = data.data[0].server
        })
        .catch(error => {
          console.log(error);
        })
    },
    change_method () {
      switch (this.option.method) {
        case 1:
          this.disabled.time = false
          this.disabled.zone = false
          this.disabled.ntp = true
          break;
        case 2:
          this.disabled.time = true
          this.disabled.zone = false
          this.disabled.ntp = true
          break;
        case 3:
          this.disabled.time = true
          this.disabled.zone = true
          this.disabled.ntp = false
          break;
        default:
          break;
      }
    },
    //保存时间与日期
    save_time () {
      var set_data = {}
      var url = ''
      switch (this.option.method) {
        case 1:
          set_data.time = this.option.time
          set_data.zone = this.option.zone
          url = 'manual-time-synchronization'
          break;
        case 2:
          set_data.zone = this.option.zone
          url = 'local-time-synchronization'
          break;
        case 3:
          set_data.server = this.option.ntp
          url = 'ntp-time-synchronization'
          break;
        default:
          break;
      }
      console.log(this.option);
      this.$axios.put('/yiiapi/seting/' + url, set_data)
        .then(response => {
          let { status, data } = response.data;
          console.log(status);
          if (status == 0) {
            this.get_data()
            this.$message(
              {
                message: '修改成功！',
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
    },
    // 获取登录ip
    get_login_ip () {
      this.$axios.get('/yiiapi/seting/get-allow-ip')
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.option.login_ip = []
            if (data.length == 0) {
              this.option.login_ip.push({
                ip: '',
                icon: true
              })
            } else {
              data.forEach(item => {
                this.option.login_ip.push({
                  ip: item,
                  icon: false
                })
              });
              this.option.login_ip[this.option.login_ip.length - 1].icon = true
            }
          } else if (status == 1) {
            this.$message.error(
              {
                message: response.data.msg,
                offset: 50
              })
          }

        })
        .catch(error => {
          console.log(error);
        })
    },
    // 修改登录ip
    edit_login_ip () {
      var ip_list = []
      this.option.login_ip.forEach(item => {
        if (item.ip != '') {
          ip_list.push(item.ip)
        }
      });
      this.$axios.put('/yiiapi/seting/set-allow-ip', {
        ip: ip_list
      })
        .then(response => {
          let { status, data } = response.data;
          if (status == 0) {
            this.get_login_ip();
            this.$message(
              {
                message: '修改成功',
                type: 'success',
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    // 登录ip增加删除
    add_addr () {
      if (this.option.login_ip.length < 5) {
        this.option.login_ip.forEach(item => {
          item.icon = false;
        });
        this.option.login_ip.push({ ip: '', icon: true })
      } else {
        this.$message.warning(
          {
            message: '最多可以设置5个单IP/IP网段。',
            offset: 50
          })
      }
    },
    del_addr (item, index) {
      this.option.login_ip.splice(index, 1);
    },
    /**
     * ycl增加
    * */
    //统一管理平台
    get_manage_ip(){
      this.$axios.get('/yiiapi/seting/get-center-addr')
        .then(resp => {
          let { status, msg, data } = resp.data;
          //console.log(resp.data);
          if(status == 0){
            this.option.manage_ip = data.ip;
          }else {
            this.$message({
              type:'error',
              message :msg
            })
          }

        })
        .catch(error => {
          console.log(error);
        })

    },
    edit_manage_ip(){

      var reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

      if(this.option.manage_ip == ''){
        this.$message({
          message: '统一平台ip地址不能为空!',
          type: 'warning',
        });
        return false;
      }
      if(!reg.test(this.option.manage_ip)){
        this.$message({
          message: 'ip地址格式不正确，请输入正确格式!',
          type: 'warning',
        });
        return false;
      }

      this.loading = true;
      this.$axios.put('/yiiapi/seting/set-center-addr', {
        ip: this.option.manage_ip
      })
        .then(resp => {
          this.loading = false;
          let { status, data } = resp.data;
          if (status == 0) {
            this.get_manage_ip();
            this.$message({
                message: '修改成功',
                type: 'success',
              });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    //沙箱
    get_sandbox_ip(){
      this.$axios.get('/yiiapi/seting/get-sandbox-addr')
        .then(resp => {
          let { status, msg, data } = resp.data;
          if(status == 0){
            this.option.sandbox_ip = data.ip;
          }else {
            this.$message({
              type:'error',
              message :msg
            })
          }

        })
        .catch(error => {
          console.log(error);
        })

    },
    edit_sandbox_ip(){

      var reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

      if(this.option.sandbox_ip == ''){
        this.$message({
          message: '沙箱ip地址不能为空!',
          type: 'warning',
        });
        return false;
      }
      if(!reg.test(this.option.sandbox_ip)){
        this.$message({
          message: 'ip地址格式不正确，请输入正确格式!',
          type: 'warning',
        });
        return false;
      }

      this.loading = true;
      this.$axios.put('/yiiapi/seting/set-sandbox-addr', {
        ip: this.option.sandbox_ip
      })
        .then(resp => {
          this.loading = false;
          let { status, data } = resp.data;
          if (status == 0) {
            this.get_sandbox_ip();
            this.$message({
              message: '修改成功',
              type: 'success',
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
  }
}
</script>

<style scoped lang='less'>
#system_control_option {
  padding: 24px;
  text-align: left;
  .content_box {
    min-height: 830px;
    .title {
      font-family: PingFangMedium;
      font-size: 18px;
      color: #333333;
      margin-bottom: 16px;
      .titile_icon {
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .select_box {
      width: 480px;
      border: 0;
    }
    .btn_i {
      padding: 0;
      background: #0070ff;
      color: #fff;
      width: 136px;
      height: 42px;
    }
    .top {
      padding: 24px 0 24px 24px;
      background: #fff;
      border-radius: 4px;
      .item_title {
        font-size: 12px;
        color: #999999;
        margin-bottom: 6px;
      }
      .item {
        margin-bottom: 24px;
        .el-date-editor {
          width: 480px;
        }
        .margin_left {
          margin-left: 24px;
        }
        .btn_o {
          padding: 0;
          width: 136px;
          height: 38px;
          border-color: #0070ff;
          color: #0070ff;
          background: #fff;
        }
      }
    }
    // .mid {
    //   margin: 12px 0;
    //   padding: 24px 0 24px 24px;
    //   background: #fff;
    //   border-radius: 4px;
    // }
    .bottom {
      margin: 12px 0;
      padding: 24px 0 24px 24px;
      background: #fff;
      border-radius: 4px;
      .item_addrs_item{
        margin-bottom: 24px;
        .item_addrs {
          margin-bottom: 12px;
        }
        .img_box {
          width: 16px;
          height: 16px;
          margin-left: 10px;
          margin-top: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang='less'>
#system_control_option {
  .el-input__inner {
    background: #f8f8f8;
    border: 0;
  }
}
</style>
