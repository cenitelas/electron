const { app, dialog } = require('electron');
const EAU = require('electron-asar-hot-updater');
const fs = require('fs');

app.on('ready', function () {
  var version = JSON.parse(fs.readFileSync('./resources/app.asar/package.json').toString()).version;
  console.log(version);
  EAU.init({
    'api':'http://localhost:3000/update',
    'body': {
      current: version
    },
    'formatRes': function(res) { return res }
  });

  EAU.check(function (error, last, body) {
    if (error) {
      if (error === 'no_update_available') {return false; }
      if (error === 'version_not_specified' && process.env.NODE_ENV === 'development') { return false } // Don't worry about this error when developing
      dialog.showErrorBox('info', error)
      return false
    }

    EAU.progress(function (state) {
      // The state is an object that looks like this:
      // {
      //     percent: 0.5,               
      //     speed: 554732,              
      //     size: {
      //         total: 90044871,        
      //         transferred: 27610959   
      //     },
      //     time: {
      //         elapsed: 36.235,        
      //         remaining: 81.403       
      //     }
      // }
      console.log(state.size);
    })

    EAU.download(function (error) {
      if (error) {
        dialog.showErrorBox('info', error)
        return false
      }
       dialog.showErrorBox('info', 'App updated successfully! Restart it please.')
      if (process.platform === 'darwin') {
        app.relaunch()
        app.quit()
      } else {
        app.quit()
      }
    })

  })
  require('./resources/app.asar/app.js')(); 

})