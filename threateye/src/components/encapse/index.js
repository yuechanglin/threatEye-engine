/*
* ycl el-dropdown created by ycl(2019-12-20);
* */
import eDropdown from './e-dropdown';
import eCombobox from './e-combobox';
/*
eDropdown.install = function (Vue) {
  Vue.component(eDropdown.name, eDropdown);
};
export default eDropdown;
*/

function plugin(Vue) {
  if(plugin.installed){return;}
  Vue.component('e-dropdown',eDropdown);
  Vue.component('e-combobox',eCombobox);
}

export default plugin;


