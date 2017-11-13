/**
 * Created by liyunfeng on 2017/11/12.
 */
import {remote} from 'electron'
const {Menu,MenuItem} = remote

export default class ProjectMenu{
  constructor(vm){
    this.vm = vm
    this.menu = new Menu()
    this._init()
  }

  _init(){
    this.menu.append(new MenuItem({
      label:'添加服务',
      click:() => {

      }
    }))
  }
}
