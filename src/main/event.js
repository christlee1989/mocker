/**
 * Created by liyunfeng on 2017/11/2.
 */
import electron from 'electron'
import {ipcMain} from 'electron'
import Server from '../server'
import Cache from '../utils/global'

export const initIpcMainEvent = (mainWindow) => {
  //mocker-settings初始化完成，数据目录配置正常后
  ipcMain.on('init-complete', (event, arg) => {
    let screenSize = electron.screen.getPrimaryDisplay().workAreaSize
    mainWindow.setSize(screenSize.width,screenSize.height)
    mainWindow.center()
  })

  //启动服务
  ipcMain.on('start-server', (event, {projectConfig,serviceConfig}) => {
    let server = new Server(projectConfig,serviceConfig)
    server.start(() => {
      Cache.get('serverPool')[projectConfig._id] = server
      event.sender.send('start-server-reply')
    })
  })

  //停止服务
  ipcMain.on('stop-server', (event, id) => {
    let server = Cache.get('serverPool')[id]
    if(server){
      server.stop(() => {
        Cache.get('serverPool')[id] = null
        event.sender.send('stop-server-reply',true)
      })
    }else{
      event.sender.send('stop-server-reply',false)
    }
  })


}
