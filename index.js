const {app, BrowserWindow,Menu} = require('electron')
const path = require('path')
const url = require('url')
const helper = require('./lib/helper')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win




function initMenu(){
  const template = [
    {
      label: '首页',
      click () { 
        win.loadURL(url.format({
          pathname: path.join(__dirname, 'home', 'index.html'),
          protocol: 'file:',
          slashes: true
        }))
      }
    },    
    {
      label: '更多',
      click () { require('electron').shell.openExternal('https://github.com/postor/learn-in-action') }
    },
    {
      label: '最小化',
      role: 'minimize'
    },
    {
      label: '关闭',
      role: 'close'
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  win = helper.createWindow(url.format({
    pathname: path.join(__dirname, 'home', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  initMenu()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    win = helper.createWindow(url.format({
      pathname: path.join(__dirname, 'home', 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
    
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
