var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
    description: String,
    price: Number,
    photos: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});
mongoose.model('Service', ServiceSchema);
