/**
 * Created by liyunfeng on 2017/10/27.
 */
const Hashids = require('hashids')
const Moment = require('moment')

const defaultProps = {
  salt:'Mocker',
  length:10,
  alphabet:'0123456789abcdefghijklmnopqrstuvwxyz'
}

class Hashid{
  constructor(length){
    this.props = Object.assign({},defaultProps,{length})
    this.id = new Hashids(this.props.salt,this.props.length,this.props.alphabet)
  }

  encode(id,extra1 = 0,extra2 = 0){
    id = id === undefined ? Moment().valueOf() : id
    return this.id.encode(id,extra1,extra2)
  }
}

export default {
  id(length,id,extra1,extra2){
    return new Hashid(length).encode(id,extra1,extra2)
  }
}
