/* 自定义指令处理 */
import copy from './v-copy'
import longpress from './v-longpress'
import debounce from './v-debounce'
import lazyLoad from './v-lazyLoad'
import draggable from './v-draggable'
import permission from './v-permission'
import waterMarker from './v-waterMarker'
import bubbleButton from './v-bubbleButton'




const directives = {
  copy,
  longpress,
  debounce,
  lazyLoad,
  draggable,
  permission,
  waterMarker,
  bubbleButton,
}
/* 
install 方法是必需的。它是用来安装插件的方法，当通过 Vue.use() 方法使用插件时，Vue 会自动调用插件的 install 方法。
install 方法接受一个 Vue 实例作为参数，通过这个参数可以在插件中使用 Vue 的功能。在 install 方法中，可以进行一些全局的配置、注册全局组件、添加全局指令、混入全局的方法等。
*/
/* 全局一键注册指令 */
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}