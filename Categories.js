var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
 name: String
})

var category = mongoose.model('Category', CategorySchema);
var test = new category ({name:'Test'});
test.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
var test2 = new category ({name:'TestFinal'});
test2.save(function (err) {
  if (err) return handleError(err);
  // saved!
});