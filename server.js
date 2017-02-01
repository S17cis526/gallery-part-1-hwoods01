"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 3000;

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];

function serveImage(filename, req, res)
{
  var body = fs.readFile(`images/${filename}`, function(err, body){
    if (err){
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = "whoops";
      res.end("Silly Me");
      return;
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(body);
  });
}

var server = http.createServer((req, res) => {
  switch(req.url) {
    case '/gallery':
      var gHtml = imageNames.map(function(fileName){
        return ' "<img src=" alt="a fishing ace at work">'
      }).join();
      var html = "<!doctype html>";
          html += "<head>";
          html +=   "<title>Gallery</title>";
          html +=   "<link href= 'gallery.css' rel='stylesheet' type='text/css'>"
          html += "</head>"
          html += '<body>';
          html += ' <h1>Gallery</h1>';
          html += ;
          html += ' <h1>Hello</h1> the time is ' + Date.now();
          html += '</body>';
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    break
    case "/chess":
      serveImage('chess.jpg', req, res);
    break;
    case "/images/ace.jpg":
      serveImage('ace.jpg', req, res);
    break;
    case "/fern":
    case "/fern/":
    case "/fern.jpg":
    case "/fern.jpeg":
      serveImage('fern.jpg', req, res);
      break;
    case "/bubble":
    break;
    case '/gallery.css':
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
      break;

    default:
      res.statusCode = 404;
      res.statusMessage = "Not found";
      res.end();
  }

});

server.listen(port, ()=> {

  console.log("Listening on Port " + port);
});
