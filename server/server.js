var http = require('http');
var fs = require('fs');
var path = require('path');
var server = http.createServer();
var imagesCount = 0;

var fileExtentions = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.json':'application/json',
    '.jpg': 'image'
};

server.on('request', function(req, res) { 
  var extention = path.extname(req.url),
      type = fileExtentions[extention], 
      filePath =  '../' + req.url;

  if (req.url.indexOf('.') > -1) {
    fs.exists(filePath, function (exists) {
        if (exists && req.url !== '/') {
            fs.readFile(filePath, function (err, data){
                res.writeHead(200, {'Content-Type': type});
                console.log('Got request: ' + req.url);
                res.write(data, function (err) {
                   res.end();
                });
            });
        } else {
           res.writeHead(404);
           res.write('Oops.. Page is not found!');
           res.end();
        }
    });
  }

  if (req.url === '/images') {
    getImages(__dirname + '/images', function (err, files) {
       var names = {src: files.slice(12, files.length - 1)};
           res.writeHead(200);
           res.write(JSON.stringify(names));
           res.end();
    });
  }

  if (req.url === '/firstImages') {
    getImages(__dirname + '/images', function (err, files) {
       var names = {src: files.slice(0,12)};
           res.writeHead(200);
           res.write(JSON.stringify(names));
           res.end();
    });
  }

});
  
console.log('server started on localhost:3000');
server.listen(3000);

function getImages(p, callback) {
    fs.readdir(p, function (err, files) {
          if (err) {
              throw err;
          }
          files = files.filter(function (file) {
              return path.extname(file) === '.jpeg' || path.extname(file) === '.jpg';
          });
          console.log(files);
          callback(err, files);
    });
}