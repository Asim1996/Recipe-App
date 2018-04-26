
const express = require('express');
const app = express();
var path = require('path');
// var router = express.Router();
 
// serve angular front end files from root path
app.use('/', express.static('dist', { redirect: false }));
 
// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    res.sendFile(path.resolve('dist/index.html'));
});
 
 app.listen(process.env.PORT || 8090);