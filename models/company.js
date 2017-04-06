var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/seproject');
var db = mongoose.connection;
var Category= require('../models/Category.js');

var CompanySchema =  mongoose.Schema({
	//id:{ 
      // type : Number,
       //unique : true
    //},
	CompanyName: {
		type: String,
		index:true
	},
	businessEmail: {
		type: String
	},
	
	description: {
		type: String
	},
	businessAddress: {
		type: String
	},
	mobile:{
		type : Number
	},
    Category: {
		type : String
	},
	bankAccountNumber: {
		type : Number
	},
	creditCardNumber: {
		type : Number
	},
});

module.exports = mongoose.model('Company',CompanySchema);

module.exports.createCompany = function(newCompany , callback){

      newCompany.save(callback);
}


module.exports.getCompanyname = function(Companyname,callback){
    var query = {CompanyName: CompanyName}; 
    Company.findOne(query,callback);
}

module.exports.removeCompany = function(id, callback){
   Company.findByIdAndRemove(id,callback);
}
