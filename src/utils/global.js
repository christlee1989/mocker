/**
 * Created by liyunfeng on 2017/11/2.
 */
import Config from 'electron-config'
import {remote,app} from 'electron'
import isRenderer from 'is-electron-renderer'
import Const from './const'
import Path from 'path'

const globalObjName = 'mockerSharedObj'

export default {
  init(){
    if(!isRenderer){
      const config = new Config({name:Const.CONFIG_NAME})
      global[globalObjName] = {
        config,
        [Const.DATA_PATH_KEY]:config.get(Const.DATA_PATH_KEY,Path.join(app.getPath('appData'),'mocker')),
        serverPool:{}
      }
    }
  },
  get(key){
    if(isRenderer){
      return remote.getGlobal(globalObjName)[key]
    }else{
      return global[globalObjName][key]
    }
  },
  set(key,value){
    if(!isRenderer){
      global[key] = value
    }else{
      remote.getGlobal(globalObjName)[key] = value
    }
  }
}
