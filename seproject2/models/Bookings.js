var mongoose = require('mongoose');


var BookingSchema = new mongoose.Schema({
    facility: [{type: mongoose.Schema.Types.ObjectId, ref:'Service'}],
    bookDate: Number,
    slot: Number,
    free: {type:Boolean, default: true},
    bookedBy : {type: mongoose.Schema.Types.ObjectId, ref:'Client'}

}) ;

BookingSchema.methods.book = function(bookDate,slot){
        {this.bookDate = bookDate};
     {this.slot=slot};
    {this.free = false}
    ;

};
module.exports=mongoose.model('Booking',BookingSchema);
