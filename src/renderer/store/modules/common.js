import Cache from '../../../utils/global'
import Const from '../../../utils/const'
import {ipcRenderer} from 'electron'
import DB from '../../../dao'

const state = {
  isSetting: false,
  dataPath:Cache.get('dataPath'),
  title:'Mocker'
}

const mutations = {
  SET_IS_SETTING (state,flag) {
    state.isSetting = flag
  },
  SET_DATA_PATH (state,dir) {
    state.dataPath = dir
  }
}

const actions = {
  initEnv({ commit }) {
    return new Promise((resolve,reject) => {
      const dataPath = Cache.get('config').get(Const.DATA_PATH_KEY)
      if(dataPath){
        commit('SET_IS_SETTING',true)
        commit('SET_DATA_PATH',dataPath)
        DB.initDB()
        setTimeout(() => {
          ipcRenderer.send('init-complete')
          resolve(dataPath)
        },1500)
      }else{
        setTimeout(() => {
          resolve(false)
        },1500)
      }
    })
  },
  setDataPath({ commit,dispatch },dataPath){
    return new Promise((resolve,reject) => {
      Cache.get('config').set('dataPath',dataPath)
      Cache.set('dataPath',dataPath)
      dispatch('initEnv').then(res => {
        resolve()
      })
    })
  }

}

export default {
  state,
  mutations,
  actions
}
