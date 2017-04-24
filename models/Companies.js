var mongoose = require('mongoose');
var crypto = require('crypto');
var Category = mongoose.model('Category');
var booking = mongoose.model('Booking');
var Review = mongoose.model('Review');
var CompanySchema = new mongoose.Schema({
	CompanyName: {
		type: String,
        unique: true
	},
    Categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
	,
	
	Reviews: [{type: mongoose.Schema.Types.ObjectId, ref:'Review'}]
	,
	
    Services : [{type: mongoose.Schema.Types.ObjectId, ref: 'Service'}]
    ,

	BusinessEmail: String
	,
	Description:  String
	,
	BusinessAddress:  String
	,
	Mobile: Number
	,
    BankAccountNumber: Number
	,
	CreditCardNumber: Number
	
	
});

mongoose.model('Company', CompanySchema);
