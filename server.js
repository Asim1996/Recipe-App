'use strict';
// for change detection
require('zone.js/dist/zone-node');
require('reflect-metadata');
const express = require('express');
const ngUniversal=require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const {AppServerModuleNgFactory,LAZY_MODULE_MAP}=require('./dist-server/main.bundle');

function angularRouter(req,res){
	res.render('index',{req,res});
}
const app = express();
app.engine('html',ngUniversal.ngExpressEngine({
	bootstrap:AppServerModuleNgFactory,
	providers:[
	provideModuleMap(LAZY_MODULE_MAP)
	]
}));
app.set('view engine','html');
app.set('views','dist');
app.get('/',angularRouter);
app.use(express.static(`${__dirname}/dist`));
app.get('*',angularRouter);
app.listen(process.env.PORT || 8090);
// app.listen(3000,() => {
// 	console.log('Server started');
// })
// var path = require('path');
// // var router = express.Router();
 
// // serve angular front end files from root path
// app.use('/', express.static('dist', { redirect: false }));
 
// // rewrite virtual urls to angular app to enable refreshing of internal pages
// app.get('*', function (req, res, next) {
//     res.sendFile(path.resolve('dist/index.html'));
// });
 
//  app.listen(process.env.PORT || 8090);