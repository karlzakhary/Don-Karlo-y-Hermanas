var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var app = express();
var Company = mongoose.model('Company');
var Booking = mongoose.model('Booking');
var Category = mongoose.model('Category');
var Client = mongoose.model('Client');
var Review = mongoose.model('Review');
var Service = mongoose.model('Service');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index');
  console.log('home');
  next();
});

router.get('/MyAccount/:userID',function(req,res,next){ 
var query = Client.findById(req.params.userID);

  query.exec(function (err, client){
    if (err) { return next(err); }
    if (!client) { return next(new Error("can't find client")); }

    // req.company = Company.findById(query);
    console.log(client);

    return next();
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



router.put('/MyAccount/:userID', function (req, res) { //done

		var newEmail = req.body.email;
		var newNumber = req.body.phone;
    var userId=req.params.userID;

		// var change = {email: newEmail, phoneNumber: newNumber};
    Client.findById(userId).exec(function(err,user){
      console.log("kaarrl22");
      if(err){
        res.json(err);
      }
      else if(!user){
        json({message:"no user found"});
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



router.post('/company/:companyID/service/:serviceID/booking',  function (req,res){
  var booking = new Booking() ;
  var serviceId = req.params.serviceID ;
  var companyID = req.params.companyID ;
  
  
      Service.findById(serviceId).exec(function (err, service){
        if (err) {
          res.json(err);
        }
        else if (!service){
          json({message:"No service found"});
        }
        else {
          booking.facility.push(service);
          var username1 = req.payload.username ;
          Client.findOne({username:username1},function(err,client){
            if(err) {
              res.json(err) ;
            }
            else if (!client){
              json({message: "NO USER FOUND"});
            }
            else {
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
      });
});


router.param('company', function(req, res, next, id) {
  var query = Company.findById(id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    req.company = company;
    return next();
  });
});

router.get('/companies/:companyID',function(req,res,next){ 
var query = Company.findById(req.params.companyID);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    console.log(company);

    return next();
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
  req.comment.downvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

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
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;