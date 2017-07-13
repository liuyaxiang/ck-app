var express = require("express");
var app = express();
var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');

var Busboy = require('busboy');

app.use('/admin',express.static('admin'));
//跨域设置
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    //res.header("Content-Type", "application/json;charset=utf-8");  
    next();
});

app.post("/api/v1/app/", function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(os.tmpDir(), path.basename(filename));
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!"); 
    });
    return req.pipe(busboy);
});

app.get("/api/v1/app/:name", function(req, res) {
        res.json({
            latest_version:3.2,
            changelog:"fix bugs"
        });
});

var server = app.listen(8009, function() {
    console.log(`管理后台：http://localhost:8009/admin`);
});