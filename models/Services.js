var mongoose = require('mongoose');
var ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    photos: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    booking: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}]
});
mongoose.model('Service', ServiceSchema);

