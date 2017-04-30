var path = require('path')
var {BrowserWindow,remote} = require('electron')

if(!BrowserWindow){
  BrowserWindow = remote.BrowserWindow
}


module.exports = {
  createWindow,
  loadUrl,
  getPlayGround,
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

function loadUrl(url){
  var w = BrowserWindow.getAllWindows()[0]
  if(w){
    w.loadURL(url)
  }
}

function getPlayGround(packageName,chapterIndex){
  if(chapterIndex){
    return path.join(__dirname, '..', 'playground', packageName, chapterIndex)
  }else{
    return path.join(__dirname, '..', 'playground', packageName)
  }
  
}