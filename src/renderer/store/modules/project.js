import DB from '../../../dao'

const state = {
  projects: [],
  activeProject:'',
  activeService:''
}

const mutations = {
  SET_ACTIVE_PROJECT (state,id) {
    state.activeProject = id
    state.activeService = ''
  },
  SET_PROJECTS (state,projects) {
    state.projects = projects
  },
  ADD_PROJECT(state,doc){
    state.projects.splice(0,0,doc)
  },
  UPDATE_PROJECT(state,doc){
    let idx = state.projects.findIndex((item) => {
      return item._id === doc._id
    })
    state.projects.splice(idx,1,doc)
  }
}

const actions = {
  GET_ALL_PROJECT ({ commit }) {
    return new Promise((resolve,reject) => {
      DB.getDB('project').getAll(docs => {
        if(docs){
          commit('SET_PROJECTS',docs)
          resolve(docs)
        }else{
          reject('获取项目列表出错')
        }
      })
    })
  },
  NEW_PROJECT({ commit },doc) {
    return new Promise((resolve,reject) => {
      DB.getDB('project').new(doc,newDoc => {
        if(newDoc){
          commit('ADD_PROJECT',newDoc)
          resolve(newDoc)
        }else{
          reject('创建项目出错')
        }
      })
    })
  },
  UPDATE_PROJECT({commit},doc){
    return new Promise((resolve,reject) => {
      DB.getDB('project').update(doc,updatedDoc => {
        if(updatedDoc){
          commit('UPDATE_PROJECT',updatedDoc)
          resolve(updatedDoc)
        }else{
          reject('修改项目信息出错')
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
