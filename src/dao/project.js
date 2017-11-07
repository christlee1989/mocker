/**
 * Created by liyunfeng on 2017/10/27.
 */
import Nedb from 'nedb'
import path from 'path'
import Moment from 'moment'
import Hashid from '../utils/Hashids'

const formatTplDoc = function(data){
  const now = Moment().unix()

  return {
    _id:Hashid.id(16),
    name:data.name,
    desc:data.desc,
    port:data.port,
    services:data.services,
    createTime:now,
    updateTime:now,
  }
}

export default class ProjectDB{
  constructor(name,dbPath){
    const dbFile = path.join(dbPath, `${name}.db`)
    this.db = new Nedb({ filename: dbFile, autoload: true })
  }

  new(data,cb){
    const doc = formatTplDoc(data)

    this.db.insert(doc,(err,newDoc) => {
      if(!err){
        cb(newDoc)
      }else{
        cb(false)
      }
    })
  }

  getAll(cb){
    this.db.find({}).sort({updateTime:-1}).exec((err,docs) => {
      if(!err){
        cb(docs)
      }else{
        cb(false)
      }
    })
  }

  update(doc,cb){
    const now = Moment().unix()
    this.db.update({_id:doc._id},{$set: {
      name:doc.name,
      port:doc.port,
      desc:doc.desc,
      updateTime:now
    }},{returnUpdatedDocs:true},(err, numAffected, updatedDoc, upsert) => {
      if(!err){
        cb(updatedDoc)
      }else{
        cb(false)
      }
    })
  }
}
