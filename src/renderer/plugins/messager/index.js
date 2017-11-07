/**
 * Created by liyunfeng on 2017/9/20.
 */
import MessagerComponent from './Messager.vue'

let $vm

const messagerPlugin = {
  install(Vue, options = {}){
    const Messager = Vue.extend(MessagerComponent)

    if(!$vm){
      $vm = new Messager({
        el:document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    if(!Vue.messager){
      Vue.prototype.$messager = Vue.messager = {
        show:$vm.show
      }
    }
  }
}

export default messagerPlugin
