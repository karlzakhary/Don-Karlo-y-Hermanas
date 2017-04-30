var express = require('express');
//var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/seproject');
var db = mongoose.connection;

var adSchema =  mongoose.Schema({
	adLink:{
    type: String
	},
	imagePath:{
		type: String
		
	},
	originalname: {
        type: String
      
    },
    company:{
    	type: String
    }
});

module.exports = mongoose.model('advertisment',adSchema);

module.exports.createAd = function(newAd , callback){

      newAd.save(callback);
}