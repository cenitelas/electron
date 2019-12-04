const { BrowserWindow } = require('electron')

module.exports = ()=> {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./app.asar/index.html')
}