const express = require('express')
var bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var desktop_app_URL = 'http://localhost:4000/update.asar' 


app.post('/update', function (req, res) {
  var desktop_app_version = fs.readFileSync('./update/version.txt').toString();
  if(req.body && req.body.current != desktop_app_version){ // check for server side
    res.write(JSON.stringify( {"last": desktop_app_version, "source": desktop_app_URL} ).replace(/[\/]/g, '\\/') );
  }else{
    res.write(JSON.stringify( {"last": desktop_app_version} ).replace(/[\/]/g, '\\/') );
  }
  res.end();
});


app.listen(3000,()=>console.log("Server is running!"));