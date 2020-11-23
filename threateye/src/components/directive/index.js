export default (Vue) => {
  Vue.directive('more', {
      inserted: function (el, binding) {
        //console.log(binding);
        let more = document.createElement("a");
        more.style = "display:inline-table;color:#0070FF;font-size: 12px;font-family: PingFang;";
        more.innerHTML = `<span>更多</span><span class="el-icon-d-arrow-right"></span>`;
        /*more.onclick = function(){
        }*/
        el.appendChild(more);
      }
    }),
    Vue.directive("focus", {
      inserted: function (el) {
        el.focus();
      }
    }),
    Vue.directive("badge", {
      inserted: function (el, binding) {

        if (!binding.value ||
          binding.value == '' ||
          binding.value == 0) {
          return false;
        }

        let badge = document.createElement("sup");
        badge.className = 'e-badge';
        badge.innerText = binding.value;
        badge.style = `position: absolute;
        background-color: #F56C6C;
        border-radius: 16px;
        color: #FFF;
        display: inline-block;
        font-size: 12px;
        height: 16px;
        top: -8px;
        right: -8px;
        line-height: 14px;
        padding: 0 5px;
        text-align: center;
        white-space: nowrap;
        border-width: 0;`;
        el.appendChild(badge);
      }
    }),
    Vue.directive("status", {
      inserted: function (el, binding) {
        console.log(el);
        console.log(binding);

        let badge = document.createElement("sup");
        badge.className = 'e-badge';
        badge.innerText = '1111';
        let status = `<div>超小按钮</div>`
        el.appendChild(status);
      }
    })
}
