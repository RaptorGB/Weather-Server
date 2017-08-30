import * as passport from "passport";
import {Strategy} from "passport-google";

export class Login {

  //Passport setup - for persistant login sessions
  //user.identifier
  //user.displayName
  //user.emails[0].value
  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });
  //
  // passport.deserializeUser(function(obj, done) {
  //   done(null, obj);
  // }); <du

  constructor() {
    passport.initialize();
    this.GoogleStrategy = Strategy;
  }

  /** Process the login request based on it's type i.e. facebook/google*/
  function processLogin(req) {
    passport.initialize();
    // passport.session(); //For persistant login sessions

    //If(GoogleSomething check) googleLogin();
    //else facebookLogin();
  }

  /**Tells passport to use google strategy and login using their cloud API*/
  function googleLogin(){ //

    //Set passport up for google
    passport.use(new GoogleStrategy({
        returnURL: "http://localhost:3000/login",
        realm: "http://localhost:3000/"
        passReqToCallback   : true
      },

      //Callback, once initialised try login
      passport.authenticate('google'. {
        failureRedirect: '/login',
        successRedirect: '/'
      })

    ));

  }

}
