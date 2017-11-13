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
    pid:data.pid,
    method:data.method,
    path:data.path,
    description:data.description,
    data:data.data,
    createTime:now,
    updateTime:now,
  }
}

export default class ServiceDB{
  constructor(name,dbPath){
    const dbFile = path.join(dbPath, `${name}.db`)
    this.db = new Nedb({ filename: dbFile, autoload: true })
  }

  new(data,cb){
    let doc = data._id ? data : formatTplDoc(data)

    this.db.insert(doc,(err,newDoc) => {
      if(!err){
        cb(newDoc)
      }else{
        cb(false)
      }
    })
  }

  insertAll(docs,cb){
    this.db.insert(docs,(err,newDocs) => {
      if(!err){
        cb(newDocs)
      }else{
        cb(false)
      }
    })
  }

  get(pid,cb){
    this.db.find({pid}).sort({updateTime:-1}).exec((err,docs) => {
      if(!err){
        cb(docs)
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
      method:doc.method,
      path:doc.path,
      description:doc.description,
      data:doc.data,
      updateTime:now
    }},{returnUpdatedDocs:true},(err, numAffected, updatedDoc, upsert) => {
      if(!err){
        cb(updatedDoc)
      }else{
        cb(false)
      }
    })
  }

  remove(id,cb){
    this.db.remove({_id:id},{},(err,numRemoved) => {
      if(!err){
        cb(true)
      }else{
        cb(false)
      }
    })
  }

  removeByPid(pid,cb){
    this.db.remove({pid:pid},{},(err,numRemoved) => {
      if(!err){
        cb(true)
      }else{
        cb(false)
      }
    })
  }
}
