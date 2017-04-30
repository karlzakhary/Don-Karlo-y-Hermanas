var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/seproject');
var db = mongoose.connection;

var CategorySchema =  mongoose.Schema({
	Categoryname:{
    type: String,
	},
	/*id :{
		type:Number,
		 unique: true,
	}*/
});

var Category = module.exports = mongoose.model('Category',CategorySchema);

module.exports.createCategory = function(newCategory , callback){

      newCategory.save(callback);
}