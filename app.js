var express        = require('express');
var app            = module.exports.app = exports.app = express();
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http           = require('http');
var fs             = require('fs');
var path           = require('path');

// /* RESOURCES */
// var resources      = ['tools', 'blogs', 'videos', 'companies'];
// var tools          = require('./resources/tools.js');
// var blogs          = require('./resources/blogs.js');
// var companies      = require('./resources/companies.js');
// var videos      = require('./resources/videos.js');
// var all            = [];

/*  CONFIGURATION  */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', (process.env.PORT || 3000));

/* ROUTES */
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, './image-recognition')))

// /* API */
// app.get('/imagear', function(req, res) {
//   res.json(all.concat(tools).concat(blogs).concat(companies));
// });

// app.get('/resources/:type', function(req, res) {
//   if (resources.indexOf(req.params.type) >= 0) res.json(eval(req.params.type));
//   res.status(404);
//   res.redirect('/404.html');
// });

/* HEADERS */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', __dirname);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* ROUTES */
app.get('/imagear', function(req, res) {
  res.sendfile('image-recognition/index.html')
})

app.get('/imagear/:imagename', function(req, res) {
  res.json({'imagename' : req.params.imagename})
})

app.post('/imagear/postimage', function(req, res) {
  res.json({'message' : 'received'})
})

/* HANDLE ERRORS */
app.get('*', function(req, res) {
  res.status(404);
  res.redirect('/404.html');
})
/* LISTEN */
app.listen(app.get('port'), function() {
  console.log("Node app is running at http://localhost:" + app.get('port'))
});