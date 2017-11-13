/**
 * Created by liyunfeng on 2017/11/10.
 */
import Express from 'express'

export default class Server{
  constructor(projectConfig,routerConfig){
    this.app = Express()
    this.project = projectConfig
    this.routers = routerConfig
    this._init()
  }

  _init(){
    this._initMiddleware()
    this._initRouters()
    this._initErrorHandler()
  }

  _initMiddleware(){
    this.app.use((req,res,next) => {
      console.log(req)
      next()
    })
  }

  _initRouters(){
    this.routers.map(router => {
      this.app[router.method.toLowerCase()](router.path,(req, res, next) => {
        res.send(router.data)
      })
    })
  }

  _initErrorHandler(){
    this.app.use(function(req, res, next) {
      res.status(404).send('访问不到所请求资源');
    });

    this.app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('服务器内部错误');
    });
  }

  start(callback){
    this.server = this.app.listen(this.project.port, () => {
      var host = this.server.address().address
      var port = this.server.address().port

      console.log('listening at http://%s:%s', host, port)
      callback()
    });
    this.server.setTimeout(1000)
  }

  stop(callback){
    this.server.close((val) => {
      console.log('停止服务：',val)
      callback()
    })
  }

}
