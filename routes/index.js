var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//var router2 = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
//mongoose.connect('mongodb://localhost/seproject');
//var db = mongoose.connection;

var Company = require('../models/company');
var Category = require('../models/Category');
var Service = require('../models/service');
var Image = require('../models/Image');
var Client = require('../models/client');
var Review = require('../models/Reviews');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


/* GET home page. */
router.get('/', function(req, res) {
  res.json("Shaghal");
  // res.render('index');
});
router.get('/categories', function(req, res) {
  res.json("Shaghal");
});
//router2.get('/admin', function(req, res) {
  //res.render('index');
//});
//router2.get('/admin/categories', function(req, res) {
 // res.render('index');
//});
  
//ImageUpload & View




router.get('/categories/category/company/images/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
});

//user update profile 
router.put('/MyAccount/:userID', function (req, res) { //done

console.log("kaarrl");
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
//Book Service
router.post('/categories/category/company/:companyID/service/:serviceID/booking',  function (req,res){
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
          //booking.bookedBy = req.payload.username ;
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
});
//Get Company
 router.get('/categories/category/companies/:companyID',function(req,res,next){ 
var query = Company.findById(req.params.companyID);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    // req.company = Company.findById(query);
    console.log(company);

    return next();
  });
});

//End of Image Upload & View

// Middleware for a category with that specific id with users router
router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error("can't find category")); }

    req.category = category;
    return next();
  });
});

// Middleware for a company with that specific id with users router
router.param('company', function(req, res, next, id) {
  var query = Company.findById(id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    req.company = company;
    return next();
  });
}); 


// Middleware for a service with that specific id with users router
router.param('service', function(req, res, next, id) {
  var query = Service.findById(id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!service) { return next(new Error("can't find service")); }

    req.service = service;
    return next();
  });
});

// Middleware for a category with that specific id with admin router
/*router2.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error("can't find category")); }

    req.category = category;
    return next();
  });
});*/

// Middleware for a company with that specific id with admin router
/*router2.param('company', function(req, res, next, id) {
  var query = Company.findById(id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    req.company = company;
    return next();
  });
});

// Middleware for a service with that specific id with admin router
router2.param('service', function(req, res, next, id) {
  var query = Service.findById(id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!service) { return next(new Error("can't find service")); }

    req.service = service;
    return next();
  });
});*/




router.put('/user/Reviews/:review/upvote', auth, function(req, res, next) {
  req.review.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(review);
  });
});

router.put('/user/Reviews/:review/downvote', auth, function(req, res, next) {
  req.review.downvote(function(err, review){
    if (err) { return next(err); }

    res.json(review);
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
/* END Reviews For company */

/* Show Reviews For Companies */
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
   });

   


});
/* END Show Reviews For Companies */


router.put('/categories/category/:cid/company/:id/rate' , function(req, res, next){
    var rate = req.body.rate;
    var comp = req.params.id;
     var company = Company.findById(comp);
     company.incrementRaters(function(err,company){
      if(err){
        res.json(err);

      }else{
        res.json(company);
           var raters = company.map(function(SearchItem) { 
              return SearchItem["numberRaters"];
               });
      }

     });
     company.incTotalRating(rate,function(err,company){
      if(err){
        res.json(err);
      }else{
         res.json(company);
           var total = company.map(function(SearchItem) { 
              return SearchItem["totalRating"];
               });

      }

     });
      
           
      return total/raters;

     });


   //})




module.exports = router;