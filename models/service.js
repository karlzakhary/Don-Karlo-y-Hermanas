var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/seproject');
var db = mongoose.connection;
var company = require('../models/company.js');


var serviceSchema =  mongoose.Schema({
	//id:{ 
      // type : Number,
    //   unique : true
  //  },
	servicename:{
    type: String,
	},
	price:{
    type : Number
	},
	description : {
	type : String
	},
	company: {
		 type : String
	}
});
var service = module.exports = mongoose.model('service',serviceSchema);

module.exports.createService = function(newService , callback){
      newService.save(callback);
}
module.exports.getServiceByID = function(id,callback){
	 service.findById(id,callback);
}
