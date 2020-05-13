var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('./models/user');

module.exports = function(passport){
     passport.use(new LocalStrategy((username, password, done)=>{
           var query  = {
               username: username
           };
           User.findOne(query, (err, user)=>{
               if(err){
                   throw err;
               }
               if(!user){
                   return done(null, false, {message: 'No User Found!!'});
               }

               bcrypt.compare(password, user.password, (err, isMatch)=>{
                   if(err){
                       throw err;
                   }
                   if(isMatch){
                       return done(null, user);
                   }
                   else{
                       return done(null, false, {message: 'Incorrect Passowrd!!'});
                   }
               });

           });
     }));

     passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}