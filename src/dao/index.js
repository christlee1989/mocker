/**
 * Created by liyunfeng on 2017/10/27.
 */
import Project from './project'
import Service from './service'
import Cache from '../utils/global'

const DB = {}

export default{
  getDB(name){
    return DB[name]
  },
  initDB(){
    DB.project = new Project('project',Cache.get('dataPath'))
    DB.service = new Service('service',Cache.get('dataPath'))
  }
}
