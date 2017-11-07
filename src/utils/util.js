/**
 * Created by liyunfeng on 2017/11/3.
 */
import fs from 'fs'
import {remote} from 'electron'

export const dirExist = (dir) => {
  try {
    fs.accessSync(dir, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

export const mkdir = (dir) => {
  try{
    fs.mkdirSync(dir)
    return {
      success:true
    }
  }catch(e){
    if(e.code === 'EEXIST'){
      return {
        success:true,
        msg:'文件夹已存在'
      }
    }else if(e.code === 'ENOENT'){
      return {
        success:false,
        msg:'文件夹创建失败'
      }
    }else{
      return {
        success:false,
        msg:'文件夹创建失败'
      }
    }
  }
}

export const openDirectory = (title,defPath,cb) => {
  remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
    title:title,
    defaultPath:defPath,
    properties:['openDirectory']
  },filePaths => {
    cb(filePaths ? filePaths[0] : '')
  })
}
