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
	totalRating: {
		type: Number,
		default: 0
	},
	numberRaters: {
		type: Number, 
		default: 0 
	}

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
CompanySchema.methods.incrementRaters = function(callback) {
  this.numberRaters += 1;
  this.save(cb);
};
CompanySchema.methods.incTotalRating = function(rate,callback){
   this.totalRating+=rate;
   this.save(callback);
}
	
	



/*module.exports.getCompanyID = function(id,callback){
    
    Company.findById(id,callback);
}
module.exports.comparePassword = function(enteredPassword,hash,callback){
     bcrypt.compare(enteredPassword, hash, function(err, isMatch) {
     if(err) throw err;
     callback(null,isMatch);
});
}*/