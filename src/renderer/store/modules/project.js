import DB from '../../../dao'
import Vue from 'vue'
import {openWriteFile,writeJsonFile,openReadFile,readJsonFile} from '../../../utils/util'
import {remote} from 'electron'
import Path from 'path'

const state = {
  projects: [],
  activeProject:'',
  services: {},
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
  },
  SET_ACTIVE_SERVICE (state,id) {
    state.activeService = id
  },
  ADD_SERVICE(state,doc){
    if(state.services[state.activeProject]){
      state.services[state.activeProject].splice(0,0,doc)
    }else{
      Vue.set(state.services,state.activeProject,[doc])
    }
  },
  SET_SERVICES(state,docs){
    Vue.set(state.services,state.activeProject,docs)
  },
  ADD_ALL_SERVICE(state,{pid,docs}){
    Vue.set(state.services,pid,docs)
  },
  UPDATE_SERVICE(state,doc){
    let idx = state.services[state.activeProject].findIndex(item => {
      return item._id === doc._id
    })
    state.services[state.activeProject].splice(idx,1,doc)
  },
  REMOVE_SERVICE(state,id){
    let idx = state.services[state.activeProject].findIndex(item => {
      return item._id === id
    })
    state.services[state.activeProject].splice(idx,1)
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
  },
  NEW_SERVICE({commit},doc){
    return new Promise((resolve,reject) => {
      DB.getDB('service').new(doc,newDoc => {
        if(newDoc){
          commit('ADD_SERVICE',newDoc)
          commit('SET_ACTIVE_SERVICE',newDoc._id)
          resolve(newDoc)
        }else{
          reject('创建服务出错')
        }
      })
    })
  },
  NEW_SERVICES({commit},{pid,docs}){
    return new Promise((resolve,reject) => {
      DB.getDB('service').insertAll(docs,newDocs => {
        if(newDocs){
          commit('ADD_ALL_SERVICE',{pid,docs:newDocs})
          resolve(newDocs)
        }else{
          reject('创建服务出错')
        }
      })
    })
  },
  GET_SERVICES({commit,state}){
    return new Promise((resolve,reject) => {
      DB.getDB('service').get(state.activeProject,docs => {
        if(docs){
          commit('SET_SERVICES',docs)
          resolve(docs)
        }else{
          reject('获取服务出错')
        }
      })
    })
  },
  UPDATE_SERVICE({commit},doc){
    return new Promise((resolve,reject) => {
      DB.getDB('service').update(doc,updatedDoc => {
        if(updatedDoc){
          commit('UPDATE_SERVICE',updatedDoc)
          resolve(updatedDoc)
        }else{
          reject('修改服务信息出错')
        }
      })
    })
  },
  REMOVE_SERVICE({commit},id){
    return new Promise((resolve,reject) => {
      DB.getDB('service').remove(id,flag => {
        if(flag){
          commit('REMOVE_SERVICE',id)
          commit('SET_ACTIVE_SERVICE','')
          resolve(true)
        }else{
          reject('删除服务出错')
        }
      })
    })
  },
  GET_WRITE_FILE_PATH({commit}){
    return new Promise((resolve,reject) => {
      openWriteFile('导出配置文件',Path.join(remote.app.getPath('appData'),'mocker.json'),filename => {
        if(filename){
          resolve(filename)
        }else{
          reject()
        }
      })
    })
  },
  WRITE_JSON_FILE({commit,state},filename){
    return new Promise((resolve,reject) => {
      let project = state.projects.find(item => {
        return item._id === state.activeProject
      })
      project = JSON.parse(JSON.stringify(project))
      project.services = state.services[state.activeProject]
      writeJsonFile(filename,project,result => {
        if(result){
          resolve()
        }else{
          reject('写入JSON文件出错')
        }
      })
    })
  },
  IMPORT_JSON({dispatch,commit,state}){
    return new Promise((resolve,reject) => {
      openReadFile('导入配置文件',null,files => {
        if(files && files.length){

          const promises = files.map(path => {
            return new Promise((resolve,reject) => {
              readJsonFile(path,data => {
                if(data){
                  let jsonObj
                  try{
                    jsonObj = JSON.parse(data)
                  }catch(err){
                    reject('文件内容不是合法JSON')
                    return
                  }
                  //判断当前是否已存在该应用
                  let project = state.projects.find(item => {
                    return item._id === jsonObj._id
                  })
                  if(project){
                    reject(`项目：${jsonObj.name} 已存在`)
                    return
                  }
                  //保存到本地
                  dispatch('NEW_PROJECT',jsonObj).then(newDoc => {
                    dispatch('NEW_SERVICES',{pid:newDoc._id,docs:jsonObj.services}).then(newDocs => {
                      resolve()
                    }).catch(err => {
                      reject(err)
                    })
                  }).catch(err => {
                    reject(err)
                  })
                }else{
                  reject('读取JSON文件失败')
                }
              })
            })
          })

          Promise.all(promises).then(docs => {
            console.log(docs)
            resolve(docs)
          }).catch(err => {
            reject(err)
          })
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
