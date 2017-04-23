var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Client = mongoose.model('Client');

passport.use(new LocalStrategy(
  function(username, password, done) {
    Client.findOne({ username: username }, function (err, client) {
      if (err) { return done(err); }
      if (!client) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!client.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, client);
    });
  }
));