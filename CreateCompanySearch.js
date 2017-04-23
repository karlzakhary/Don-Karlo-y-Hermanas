var mongoose = require('mongoose');
var express = require('express');
//var router = express.Router();
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
//mongoose.connect('mongodb://localhost/seproject');
//var db = mongoose.connection;

var Company = require('/CompanyModelSearch');
Company.createCompany(newCompany, function(err, company){
      if(err) throw err;
      console.log(company);
    });