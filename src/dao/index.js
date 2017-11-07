/**
 * Created by liyunfeng on 2017/10/27.
 */
import Project from './project'
import Cache from '../utils/global'

const DB = {}

export default{
  getDB(name){
    console.log(DB)
    return DB[name]
  },
  initDB(){
    DB.project = new Project('project',Cache.get('dataPath'))
  }
}
