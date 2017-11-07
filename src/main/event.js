/**
 * Created by liyunfeng on 2017/11/2.
 */
import electron from 'electron'
import {ipcMain} from 'electron'

export const initIpcMainEvent = (mainWindow) => {
  //mocker-settings初始化完成，数据目录配置正常后
  ipcMain.on('init-complete', (event, arg) => {
    let screenSize = electron.screen.getPrimaryDisplay().workAreaSize
    mainWindow.setSize(screenSize.width,screenSize.height)
    mainWindow.center()
  })


}
