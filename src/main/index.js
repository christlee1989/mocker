import { app, BrowserWindow } from 'electron'
import {initIpcMainEvent} from './event'
import Const from '../utils/const'
import Cache from '../utils/global'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

//初始化全局缓存
Cache.init()

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    show:false,
    resizable:true,
    center:true,
    useContentSize: true,
    width: Const.WELCOME_PAGE_WIDTH,
    height: Const.WELCOME_PAGE_HEIGHT,
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load',() => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.loadURL(winURL)
}

app.on('ready', () => {
  createWindow()
  initIpcMainEvent(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
