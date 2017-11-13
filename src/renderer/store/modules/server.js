
import {ipcRenderer} from 'electron'

const state = {
  startedServer:[]
}

const mutations = {
  ADD_TO_STARTED(state,id){
    state.startedServer.push(id)
  },
  REMOVE_SERVER(state,id){
    let idx = state.startedServer.findIndex(_id => {
      return _id === id
    })
    state.startedServer.splice(idx,1)
  }
}

const actions = {
  startServer({commit,rootState}){
    return new Promise((resolve,reject) => {
      let {projects,activeProject,services} = rootState.project,projectConfig,serviceConfig

      ipcRenderer.once('start-server-reply', (event, arg) => {
        commit('ADD_TO_STARTED',activeProject)
        resolve()
      })

      projectConfig = projects.find(item => {
        return item._id === activeProject
      })
      serviceConfig = services[activeProject]
      ipcRenderer.send('start-server', {
        projectConfig,
        serviceConfig
      })
    })
  },
  stopServer({commit,rootState,state}){
    return new Promise((resolve,reject) => {
      let {activeProject} = rootState.project

      ipcRenderer.once('stop-server-reply', (event, flag) => {
        if(flag){
          commit('REMOVE_SERVER',activeProject)
          resolve()
        }else{
          reject('没有可关闭的服务')
        }
      })

      ipcRenderer.send('stop-server', activeProject)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
