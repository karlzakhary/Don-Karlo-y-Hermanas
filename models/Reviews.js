var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    body: String,
    author: String,
    company: [{type: mongoose.Schema.Types.ObjectId, ref:'Company'}],
    upvotes: {type: Number, default: 0}
    }
) ;

ReviewSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

ReviewSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};

mongoose.model('Review', ReviewSchema);