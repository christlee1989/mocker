/**
 * Created by liyunfeng on 2017/11/3.
 */
import fs from 'fs'
import {remote} from 'electron'
import JsonFormat from 'format-json'

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

export const openReadFile = (title,defPath,cb) => {
  remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
    title:title,
    defaultPath:defPath,
    properties:['openFile','multiSelections'],
    filters:[{
      name:'JSON',
      extensions:['json']
    }]
  },filePaths => {
    cb(filePaths)
  })
}

export const openWriteFile = (title,defPath,cb) => {
  remote.dialog.showSaveDialog(remote.getCurrentWindow(),{
    title:title,
    defaultPath:defPath,
    filters:[{
      name:'JSON',
      extensions:['json']
    }]
  },filename => {
    cb(filename)
  })
}

export const writeJsonFile = (path,jsonObj,cb) => {
  fs.writeFile(path, JsonFormat.plain(jsonObj), 'utf8', (err) => {
    if (err){
      cb(false)
    }else{
      cb(true)
    }
  });
}

export const readJsonFile = (path,cb) => {
  fs.readFile(path, 'utf8', (err,data) => {
    if (err){
      cb(false)
    }else{
      cb(data)
    }
  });
}

