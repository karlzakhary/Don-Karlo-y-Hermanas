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
  res.render('index');
  console.log('home');

});

router.get('/MyAccount/:id',function(req,res,next){
var userID = req.params.id ;
var query = Client.findById(userID);

  query.exec(function (err, client){
    if (err) { return next(err); }
    if (!client) { return next(new Error("can't find client")); }

    // req.company = Company.findById(query);
    res.json(client);
  });
});

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

router.get('/companies', function(req, res, next) {
  Company.find(function(err, companies){
    if(err){
      return next(err);
    }
console.log(companies);
    (res.json(companies));
  });
});

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

router.post('/company/:companyID/service/:serviceID/booking',  function (req,res){
  var booking = new Booking() ;
  var serviceId = req.params.serviceID ;x
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




router.get('/companies/:id',function(req,res,next){
var query = Company.findById(req.params.id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    return (res.json(company));


  });
});

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
    user.username = req.body.username;
    user.setPassword(req.body.password)
    user.save(function (err){
    if(err){ return next(err); }
    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.phone = req.body.phone;

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
