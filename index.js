var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

var Comapny = mongoose.model('Company');
var Category = mongoose.model('Category');
var Client = mongoose.model('Client');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/companies', function(req, res){
  res
})

router.get('/companies', function(req, res, next) {
  Company.find(function(err, companies){
    if(err){ 
      return next(err);
    }

    res.json(companies);
  });
});
/*
router.post('/companies', auth, function(req, res, next) {
  var Comapny = new Company(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});
*/

router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error("can't find category")); }

    req.category = category;
    return next();
  });
});


router.param('service', function(req, res, next, id) {
  var query = Service.findById(id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!service) { return next(new Error("can't find comment")); }

    req.service = service;
    return next();
  });
});

router.get('/companies/:company',function(req,res,next){
 req.company.populate('services').populate('reviews').exec(function(err,company) {
    res.json(company);
  });
  
});



router.post('/companies/:company/reviews', auth, function(req, res, next) {
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
});

router.put('/companies/:company/reviews/:review/upvote', auth, function(req, res, next) {
  req.review.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.put('/posts/:post/comments/:comment/downvote', auth, function(req, res, next) {
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