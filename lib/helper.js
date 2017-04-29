var {BrowserWindow,remote} = require('electron')
if(!BrowserWindow){
  BrowserWindow = remote.BrowserWindow
}

module.exports = {
  createWindow,
}

function createWindow (url) {
  // Create the browser window.
  var win = new BrowserWindow({
    width: 800, 
    height: 600,
    fullscreen: true,
  })
  win.maximize()

  // and load the index.html of the app.
  win.loadURL(url)

  // Open the DevTools.
   win.webContents.openDevTools()
   return win
}