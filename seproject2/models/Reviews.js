var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/seproject');
var db = mongoose.connection;

var company = require('../models/company.js');

var ReviewSchema = mongoose.Schema({
    reviewBody:{
     type: String,
    },
    author: { 
    	type: String,
    },
    company_id: {
    	type: String
    },
    upvotes: {
    	type: Number, default: 0}
    }
) ;

module.exports = mongoose.model('Review',ReviewSchema);

module.exports.createReview = function(newReview , callback){
      newReview.save(callback);
};

ReviewSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

ReviewSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};



//mongoose.model('Review', ReviewSchema);



