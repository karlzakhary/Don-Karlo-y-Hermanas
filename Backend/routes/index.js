var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var app = express();
var stripe = require('stripe')('sk_test_XC6Xvp8O0FLMZyUqF7CSIhDj');
var Company = require('../models/company');
//var Booking = mongoose.model('Booking');
var Category =require('../models/Category');
var Client = require('../models/client');
var Review =require('../models/Reviews');
var Service = require('../models/service');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



//var Bookings = require('./models/Bookings.js');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  console.log('home');
  
});


/*
router.get('/MyAccount',function(req,res,next){ 
 Client.find({username:req.payload.username}).exec(function(err,user){

    if (err) { return next(err); }
    if (!user) { return next(new Error("can't find client")); }

    // req.company = Company.findById(query);
    res.json(user);
  });
});
*/

router.get('/MyAccount',function(req,res,next){
  var user = Client.findOne({username:payload.username}) ;
  user.exec(function(err,client){
    if(err) {return next(err) ;}
    if(!client) { return next(new Error("can't find client")); }
  return(console.log(client)) ;  
  }) ;
  }) ;


router.get('/MyAccount/:id',function(req,res,next){ 
var userID = req.params.id ;
var query = Client.findById(userID);

  query.exec(function (err, client){
    if (err) { return next(err); }
    if (!client) { return next(new Error("can't find client")); }

    // req.company = Company.findById(query);
  (res.json(client));
  });
});
/*
 app.get('/client/:username', function (req, res) {
	if (req.session.user) {

		var username = req.params.username.toLowerCase();
		var query = {username: username};
		var currentUser = req.session.client;

		User.findOne(query, function (err, client) {

			if (err || !client) {
				res.send('No user found by id '+username);
			} else {
				Client.find(query).sort({time: -1}).execFind(function(err, statuses){
				/*	res.render('profile.ejs', {
						client: client, 
						email: email, 
						currentUser: currentUser,
            phoneNumber: phoneNumber
					});	
				});
			}
		});
	} else {

		res.redirect('/login');
	}
}); */
router.get('/companies/:id',function(req,res,next){ 
var userID = req.params.id ;
var query = Company.findById(userID);

  query.exec(function (err, client){
    if (err) { return next(err); }
    if (!client) { return next(new Error("can't find client")); }

    // req.company = Company.findById(query);
  (res.json(client));
  });
});

router.get('/paysuccess', function(req,res){
  res.render('paysuccess',{

  });
});

router.get('/',  function (req,res){
  res.render('test',{

  });
});

router.post('/charge',  function (req,res){
  console.log('payment');

  var token = req.body.stripeToken.id;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    card: token,
    amount: chargeAmount,
    currency: 'EGP'
  },function(err,charge){
    if(err & err.type == 'StripeCardError'){
      console.log('Your card was declined');
    }
    res.redirect('/paysuccess');
});
});


router.get('/categories/category/company/images/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
});


//SEARCH AND FILTER
router.get('/search/byAll', function(req,res) {
        var SearchItem=req.query.SearchItem;
 

        var Company = mongoose.model('Company');

        Company.find({$or:[{CompanyName: SearchItem},{businessAddress: SearchItem},{Category:SearchItem}]},function(err,result){
          if(err){
            res.json(err);
          }
          else{
            var companyName = result.map(function(SearchItem) { 
              res.json(SearchItem["CompanyName"]);
               });
          }
        });

});

//Filter by category
router.get('/search/byCategory', function(req,res){

             var SearchItem=req.query.SearchItem;
             var Company = mongoose.model('Company');

      Category.find({Categoryname:SearchItem},function(err,result){
         if(err){
          res.json(err);
         }else{
           var id = result.map(function(SearchItem) { 
              return SearchItem["_id"];
               });
        


        Company.find({Category: id} ,function(err,result){
          if(err){
            res.json(err);
          }
          else{
            var companyName = result.map(function(SearchItem) { 
              res.json(SearchItem["CompanyName"]);
               });

          }
        });
         }
      });

});



//Filter by Address
router.get('/search/byAddress', function(req,res){

     var SearchItem=req.query.SearchItem;
 

        var Company = mongoose.model('Company');

        Company.find({businessAddress: SearchItem},function(err,result){
          if(err){
            res.json(err);
          }
          else{
            var companyName = result.map(function(SearchItem) { 
              res.json(SearchItem["CompanyName"]);
               });
          }
        });

});
/* Reviews For company */
router.post('/categories/category/company/review/:id', function(req, res, next) {

    var newReview = new Review({

    reviewBody :req.body.reviewbody,
    author : req.body.author,
    company_id : req.params.id,
    upvotes : req.body.upvotes
  });

    Review.createReview(newReview,function(err, review) {

        if(err){ return next(err); }
        res.json(review);
        console.log(review);
     
    });
    req.flash('success_msg', 'Review added successfully');
});

router.get('/categories/category/company/:id/review',function(req, res, next) {
  //search id begeeb result we ygeeb object wab3ato lel review tani
   // ab3at haga lel view
   var comp = req.params.id;
   
   Review.find({company_id:comp},function(err, reviews){
     if(err)
     {
       res.json(err);
     }else if (!reviews) {
        res.json("No Reviews!");
     }else {
      res.json("Reviews");
     }
   })});


router.put('/MyAccount/:userID/edit', function (req, res) { //done

		var newEmail = req.body.email;
		var newNumber = req.body.phone;
    var userId=req.params.userID;

		// var change = {email: newEmail, phoneNumber: newNumber};
    Client.findById(userId).exec(function(err,user){
      
      if(err){
        res.json(err);
      }
      else if(!user){
        res.json({message:"no user found"});
      }
      else{
        user.email=newEmail;
        user.phone=newNumber;
        user.save(function(err,updatedUser){
          if(err){
            res.json(err);
          }
          else{
          res.json(updatedUser);
          }
        });
      }
    });
	
});
// Return a json entry



router.post('/service/:serviceID/booking',  function (req,res){
  var booking = new Booking() ;
  var serviceId = req.params.serviceID ;
  //var companyID = req.params.companyID ;
  
  
      Service.findById(serviceId).exec(function (err, service){
        if (err) {
          res.json(err);
        }
        else if (!service){
          json({message:"No service found"});
        }
        else {
          booking.facility.push(service);
          
          booking.bookingDate = req.body.date ;
          booking.slot = req.body.slot ;
        
         // booking.free = False ;
          //service.booking.push;
        booking.save(function(err,updatedBooking){
          if(err){
            res.json(err);
          }
          else{
          res.json(updatedBooking);
          }
        });
      }

    }) ;
        }
      );


router.param('company', function(req, res, next, id) {
  var query = Company.findById(id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    req.company = company;
    return next();
  });
});


/*
router.get('/services/:id',function(req,res,next){ 
var query = Service.findById(req.params.id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find service")); }

    // req.company = Company.findById(query);
    return (res.json(service));

   
  });
});
*/


router.get('/companies/:id/services',function(req,res,next){ 
var query = Company.findById(req.params.id);
  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    return (res.json(company.Services));

   
  });
});

router.get('/services/:id',function(req,res,next){ 
var query = Service.findById(req.params.id);
  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    (res.json(company));

   
  });
});



router.get('/companies/:id',function(req,res,next){ 
var query = Company.findById(req.params.id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    return (res.json(company));

   
  });
});


/*
router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error("can't find category")); }

    req.category = category;
    return next();
  });
});
*/
/*

router.param('service', function(req, res, next, id) {
  var query = Service.findById(id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!service) { return next(new Error("can't find comment")); }

    req.service = service;
    return next();
  });
});
*/

/*router.post('/companies/:company/reviews', auth, function(req, res, next) {
  var review = new Review(req.body);
  review.author = req.payload.username;
  
  review.save(function(err, review){
    if(err){ return next(err); }

    req.company.reviews.push(review);
    req.review.save(function(err, review) {
      if(err){ return next(err); }

      res.json(review);
    });
  });
});*/



router.put('/companies/:company/reviews/:review/upvote', auth, function(req, res, next) {
  req.review.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.put('/companies/:company/reviews/:review/downvote', auth, function(req, res, next) {
  req.review.downvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new Client();
  
  user.email = req.body.email;

  user.username = req.body.username;

  user.setPassword(req.body.password)
console.log('done');
  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }


console.log('calling passport)');
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
  //    console.log('here');
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
router.get('/companies', function(req, res, next) {
  Company.find(function(err, companies){
    if(err){ 
      return next(err);
    }
console.log(companies);
    (res.json(companies));
  });
});


module.exports = router;