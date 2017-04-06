var mongoose = require('mongoose');
var crypto = require('crypto');
var Category = mongoose.model('Category');
var categorytest = new Category({name:'TestFinal'});
var Review = mongoose.model('Review');
var reviewtest = new Review({author:'Seisa'},
{body:'El Makan Zalkhara'});
reviewtest.save(function (err) {
  if (err) return (err);
  // saved!
});
categorytest.save(function (err) {
  if (err) return (err);
  // saved!
});

//mongoose.createConnection('mongodb://localhost/seproject');
//	var db = mongoose.connection;
//var serviceSchema = require('/home/hinamy/Downloads/seproject/models/service.js');
//var CategorySchema = require('/home/hinamy/Downloads/seproject/models/Category.js');

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

var company = mongoose.model('Company', CompanySchema);
var testcompany = new company ({
    CompanyName: 
        'TestCompany'  
});
reviewtest.company = testcompany._id ;
testcompany.Categories.push(categorytest) ;
//testcompany.Reviews.push(reviewtest);
testcompany.save(function (err) {
  if (err) return err;
  // saved!
});

/*
CompanySchema.method.searchCompanies = function(req, res, next){

			//require
			require('search-index')(options, function(err, si) {
  		// si is now a new search index
	})
			

				si.availableFields().on('data', function (field) {
  		// "field" is the name of a field that is searchable
		}).on('end', function () {
  		// done
	})

		//search
			si.search({
		  query: [{
		    AND: {'Company.Name': ['*']},
		    AND: {'Company.Address': ['*']},
		    AND: {'Company.Activity': ['*']}

		  }]
		}).on('data', function (data) {
		  // do something cool with search results
		  //res.redirect(/esmElView)
		  var arr = [];
		  arr.length= data.length
		  	for(var i=0; i< data.length;i++){
		  		arr[i]=data[i];
		  	}

		})

  		//close
  		index.close(function(err) {
  			if (!err) console.log('success!')
	})

};
*/