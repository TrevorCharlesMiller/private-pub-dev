const express = require('express');
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const contentType = 'application/vnd.pub.v2+json';

app.get('/', function (req, res) {
    console.log(`hello world`);
    res.send('Hello World');
 })

 app.get('/api/packages/:package', function (req, res) {
    var packageName = req.params.package;
    console.log(`list package = ${packageName}`);
    res.set('Content-Type',contentType);
    res.send(JSON.stringify( {name:packageName, latest: {}, versions: []} ));
 }) 

 app.get('/api/packages/versions/new', function (req, res) {
    var url = `http://127.0.0.1:8080/api/packages/versions/${uuidv4()}`;
    console.log(`upload url = ${url}`);
    res.set('Content-Type',contentType);
    res.send(JSON.stringify( {url:url, fields:{}} ));
 })

 app.get('/api/packages/versions/finalize', function (req, res) {
    console.log(`finalize`);
    res.set('Content-Type',contentType);
    res.send(JSON.stringify( {success:{message:'package published successfully'}} ));
 })

 app.post('/api/packages/versions', upload.single('file'), function (req, res, next) {
    console.log('file upload');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.set('Content-Type',contentType);
    res.set('Location', 'http://127.0.0.1:8080/api/packages/versions/finalize');
    res.status(204).end();    
  })

  app.get('*', function(req, res) {
    console.log(req.path);
    res.set('Content-Type',contentType);
    res.status(400).send();
  });

 var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("App listening at http://%s:%s", host, port)
 })