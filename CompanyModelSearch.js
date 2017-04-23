var mongoose = require('mongoose');
var crypto = require('crypto');
var CompanySchema = new mongoose.Schema({
	CompanyName: {
		type : String,
		unique : true
	}
	CompanyAddress:{
		type: String
	}

	Categories: {
		type: String
	}


});