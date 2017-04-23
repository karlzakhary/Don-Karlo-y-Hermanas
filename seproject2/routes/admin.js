var mongoose = require('mongoose');
var express = require('express');
//var router = express.Router();
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

//mongoose.connect('mongodb://localhost/seproject');
//var db = mongoose.connection;

var Company = require('../models/company');
var Category = require('../models/Category');
var Service = require('../models/service');
var Image = require('../models/Image');
var Client = require('../models/client');
var Advertisment = require('../models/advertisment');

//var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



/* GET home page. */
router.get('/', function(req, res) {
  res.json("Shaghal");
});
//router.get('/categories', function(req, res) {
  //res.render('admin');
//});

//ImageUpload & View

router.post('/categories/category/company/images/upload/:id', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
});




router.get('/categories/category/company/images/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); 

//End of Image Upload & View

//rendering users
router.get('/users',function(req,res){
  Client.find(function(err,clients){
    if(err){
      res.json(err)
    }else{
   // var categoryName = categories.map(function(response) { 
       //       return response["Categoryname"];
     //          });
     res.json(clients);
   }
  })
})
//delete user or deactivate his account
//Delete user
router.delete('/users/:id/deleteUser',function(req,res){
  Client.remove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else 
      req.flash('success_msg', 'User deleted successfully');
  });
});
//end of rendering categories
//rendering Categories
router.get('/categories',function(req,res){
  Category.find(function(err,categories){
    if(err){
      res.json(err)
    }else{
   // var categoryName = categories.map(function(response) { 
       //       return response["Categoryname"];
     //          });
     res.json(categories);
   }
  })
})



//Create New Category that includes companies
router.post('/categories/addCategory', function(req, res, next) {
  
  var Categoryname = req.body.Categoryname;
  //var id = req.body.id;
     
    req.checkBody('Categoryname', 'Category name must be provided').notEmpty();
    var errors = req.validationErrors();

  if(errors){
       console.log(errors);
      errors:errors;
  } else {
    var newCategory = new Category({
      Categoryname: Categoryname
     });

    Category.createCategory(newCategory, function(err, category){
      if(err){ throw err;
      res.send(err.message);
      }

     else console.log(category);
    });

    req.flash('success_msg', 'Category added successfully');


  } 
});
//update category
router.post("/categories/category/:id/updateInfo", function (req, res) {
   var id = req.params.id;

 Category.findOne({ _id : id }, function(error, category) {
        if (error || !category) {
          res.send({ error: error });  
          console.log(error);        
        } else {
           // update the category       object found using findOne
          
           category.Categoryname = req.body.Categoryname;
           // now update it in MongoDB
           category.save(function (err, category) {
               if (err) res.json(err);
                 console.log(err);
              
               req.flash('success_msg', 'Category updated successfully');
           });
        }
    });
});

//Delete Category
router.delete('/categories/category/:id/deleteCategory',function(req,res){
  Category.remove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else 
      req.flash('success_msg', 'Category deleted successfully');
  });
});
//rendering companies
router.get('/categories/category/:id',function(req,res){
  Company.find({Category:req.params.id},function(err,companies){
    if(err){
      res.json(err)
    }else{
    //var companyName = companies.map(function(response) { 
      //        return response["CompanyName"];
        //       });
     res.json(companies);
   }
  })
})
//end of rendering companies
//Create New Company  
router.post('/categories/category/:id/addCompany', function(req, res, next) {
  var CompanyName = req.body.CompanyName;
  var businessEmail = req.body.businessEmail;
  var description = req.body.description;
  var businessAddress = req.body.businessAddress;
  var mobile = req.body.mobile;
  var Category = req.params.id;
  var bankAccountNumber = req.body.bankAccountNumber;
  var creditCardNumber = req.body.creditCardNumber;
  
  req.checkBody('CompanyName', 'CompanyName field must not be empty').notEmpty();
  req.checkBody('businessEmail', 'Email field must not be empty').notEmpty();
  req.checkBody('businessEmail', 'Email is not valid').isEmail();
  req.checkBody('description', 'description field must not be empty').notEmpty();
  req.checkBody('businessAddress', 'businessAddress field must not be empty').notEmpty();
  req.checkBody('mobile', 'mobile must not be empty').notEmpty();
  //req.checkBody('Category', 'category must not be empty').notEmpty();


  var errors = req.validationErrors();

  if(errors){
         console.log('error');
      errors:errors;
  } else {
    var newCompany = new Company({
      CompanyName: CompanyName,
      businessEmail: businessEmail,
      description: description,
      businessAddress: businessAddress,
      mobile: mobile,
      Category: Category,
      bankAccountNumber : bankAccountNumber,
      creditCardNumber : creditCardNumber



    });

    Company.createCompany(newCompany, function(err, company){
      if(err) throw err;
      console.log(company);
    });

    req.flash('success_msg', 'Company added successfully');

    //res.redirect('/users/login');
  }
});
//update company
router.post('/categories/category/:catid/company/:id/updateInfo', function (req, res) {
   var id = req.params.id;

 Company.findOne({ _id : id }, function(error, company) {
        if (error || !company) {
          res.send({ error: error }); 
          console.log(error);         
        } else {
           // update the company object found using findOne
          
           company.CompanyName = req.body.CompanyName;
           company.businessEmail = req.body.businessEmail;
           company.description = req.body.description;
           company.businessAddress = req.body.businessAddress;
           company.mobile = req.body.mobile;
           company.Category = req.params.catid;
           company.bankAccountNumber = req.body.bankAccountNumber;
           company.creditCardNumber = req.body.creditCardNumber,
           // now update it in MongoDB
           company.save(function (err, company) {
               if (err) res.json(err);
               console.log(err);
                 
             
               req.flash('success_msg', 'Company updated successfully');
           });
        }
    });
});
//Delete Company
router.delete('/categories/category/company/deleteCompany/:id',function(req,res){
  Company.remove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else 
      req.flash('success_msg', 'Company deleted successfully');
  });
});

// Middleware for a service with that specific id with admin router

router.param('service', function(req, res, next, id) {
  var query = Service.findById(id);

  query.exec(function (err, service){
    if (err) { return next(err); }
    if (!service) { return next(new Error("can't find service")); }

    req.service = service;
    return next();
  });
});
// rendering services of the company
router.get('/categories/category/company/:cid',function(req,res){
  Service.find({company:req.params.cid},function(err,services){
    if(err){
      res.json(err)
    }else{
   // var services = services.map(function(response) { 
     //         return response["servicename"];
       //        });
     res.json(services);
   }
  })
})

// end of rendering services

//Create New Service For The Company
router.post('/categories/category/company/:id/addService', function(req, res, next) {
   var servicename = req.body.servicename;
   var price = req.body.price;
   var description = req.body.description;
   var company = req.params.id;

  req.checkBody('servicename', 'service name field must not be empty').notEmpty();
  req.checkBody('price', 'price field must not be empty').notEmpty();
  req.checkBody('description', 'description is not valid').notEmpty();
  req.checkBody('company', 'company Name field must not be empty').notEmpty();

  var errors = req.validationErrors();

  if(errors){
       console.log('errorhere');
      errors:errors;
  } else {
    var newService = new Service({
      servicename: servicename,
      price: price,
      description: description,
      company: company
      });

    Service.createService(newService, function(err, service){
      if(err) throw err;
      console.log(service);
    });

    req.flash('success_msg', 'Service added successfully');

 }
});


 //Update Service
router.post("/categories/category/company/:id/service/updateInfo/:sid", function (req, res) {
   var sid = req.params.sid;


 Service.findOne({ _id : sid }, function(error, service) {
        if (error || !service) {
          res.send({ error: error });          
        } else {
           // update the company object found using findOne
          
           service.servicename = req.body.servicename;
           service.price = req.body.price;
           service.description = req.body.description;
           service.company = req.params.id;
           // now update it in MongoDB
           service.save(function (err, service) {
               if (err) res.json(err);
                 
               
               req.flash('success_msg', 'Service updated successfully');
           });
        }
    });
});

//Delete Service
router.delete('/categories/category/company/service/:id/deleteService',function(req,res){
  Service.remove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else 
      req.flash('success_msg', 'Service deleted successfully');
  });
});

//create advertisment
router.post('/categories/category/company/:id/createAdvertisment', function(req, res, next) {
  var adLink = req.body.adLink;
  var imagePath = req.body.imagePath;
  var originalname = req.body.originalname;
  var company = req.params.id;

    var errors = req.validationErrors();

  if(errors){
       console.log('errorheree');
      errors:errors;
  } else {
    var newAd = new Advertisment({
      
      adLink: adLink,
      imagePath:imagePath,
      originalname:originalname,
      company:company

     });

    Advertisment.createAd(newAd, function(err, ad){
      if(err){ throw err;
      res.send(err.message);
      }

     else console.log(ad);
    });

    req.flash('success_msg', 'advertisment added successfully');


  }
});
//Delete Service
router.delete('/ads/deleteAd/:id',function(req,res){
  Advertisment.remove({_id: req.params.id}, function(err){
    if(err) res.json(err);
    else 
      req.flash('success_msg', 'advertisment deleted successfully');
  });
});


router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error("can't find category")); }

    req.category = category;
    return next();
  });
});
// Middleware for a company with that specific id with admin router
router.param('company', function(req, res, next, id) {
  var query = Company.findById(id);

  query.exec(function (err, company){
    if (err) { return next(err); }
    if (!company) { return next(new Error("can't find company")); }

    req.company = company;
    return next();
  });
});




module.exports = router;